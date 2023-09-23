from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import werkzeug
from werkzeug.utils import secure_filename
from flask import send_file


app = Flask(__name__)
CORS(app)
api = Api(app)
# postgres sql uri
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://flaskuser:12344321@localhost:5432/flaskdb'
db = SQLAlchemy(app)

UPLOAD_FOLDER = os.path.basename('uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(80), nullable=False)

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    video_url = db.Column(db.String, nullable=False)
    video_information = db.Column(db.String)
    date_created = db.Column(db.Integer)


class Registration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('firstName', type=str)
        parser.add_argument('lastName', type=str)
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('phone', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        if User.find_by_username(args['username']):
            return {'message': 'Username already exists'}, 400

        if User.find_by_email(args['email']):
            return {'message': 'Email already exists'}, 400

        user = User(**args)
        db.session.add(user)
        db.session.commit()

        return {'message': 'User registered successfully'}, 201


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        user = User.query.filter_by(
            username=args['username'], password=args['password']).first()
        email = User.query.filter_by(
            email=args['username'], password=args['password']).first()

        if user or email:
            return {'message': 'Login successful'}, 200
        else:
            return {'message': 'Invalid credentials'}, 401
# upload


class Upload(Resource):

    file = None
    filename = ""

    def post(self):

        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        parser = reqparse.RequestParser()
        parser.add_argument(
            'file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()
        Upload.file = args['file']

        if Upload.file:
            # upload file
            Upload.filename = secure_filename(Upload.file.filename)
            Upload.file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], Upload.filename))

            # store file in database
            video = Video(user_id=1, video_url=Upload.filename,
                          video_information='test', date_created=123456789)
            db.session.add(video)
            db.session.commit()

            return {'message': f'uploads/{Upload.filename}'}, 201
        else:
            return {'message': 'File not found'}, 400

    def get(self):
        # Assuming you have a video file named video.mp4 in a folder named 'videos'
        # if file is in avi format, change mimetype='video/avi'
        video_path = f'uploads/{Upload.filename}'
        if Upload.filename.split('.')[1] == 'avi':
            return send_file(video_path, mimetype='video/avi')
        else:
            return send_file(video_path, mimetype='video/mp4')


class VideoResource(Resource):
    def get(self):
        # Assuming you have a video file named video.mp4 in a folder named 'videos'
        video_path = 'uploads/004_Introduction_to_this_section.mp4'
        return send_file(video_path, mimetype='video/mp4')


# Add the VideoResource to the API
api.add_resource(VideoResource, '/video')
api.add_resource(Login, '/login')
api.add_resource(Registration, '/register')
api.add_resource(Upload, '/upload')

if __name__ == '__main__':
    app.run(debug=True)
