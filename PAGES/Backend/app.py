from flask import Flask, session
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import werkzeug
from werkzeug.utils import secure_filename
from flask import send_file
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, get_jwt, jwt_required, jwt_manager
import datetime
from AI_model import AI
import base64
from flask import Flask, jsonify

app = Flask(__name__)
CORS(app)
api = Api(app)
# postgres sql uri
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://flaskuser:12344321@localhost:5432/flaskdb'
db = SQLAlchemy(app)

jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = '12345679'
# secret key for session
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SECRET_KEY'] = 'my_secret_key'  # <-- Set your secret key here

UPLOAD_FOLDER = os.path.basename('uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
blacklisted_tokens = set()

class Frames(db.Model):
    __tablename__ = 'frames'  # Define a common base table name

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    image_information = db.Column(db.String)
    date_created = db.Column(db.String)

    @staticmethod
    def create_table(username):
        # Define a method to create a new table for a specific user
        table_name = f'{username}_frames'
        if not db.engine.dialect.has_table(db.engine, table_name):
            # Create the table only if it doesn't exist
            dynamic_table = type(
                table_name, (Frames,),
                {'__tablename__': table_name}
            )
            dynamic_table.__table__.create(db.engine)

        return table_name



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
    date_created = db.Column(db.String)
    


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

        # create frame table each time a user register
        Frames.create_table(args['username'])  
        
        

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
            access_token = create_access_token(identity=args['username'])
            return {'access_token': access_token}, 200
        else:
            return {'message': 'Invalid credentials'}, 401

# upload


class Upload(Resource):

    
    @jwt_required()
    def post(self):
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        parser = reqparse.RequestParser()
        parser.add_argument(
            'file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()
        file = args['file']
        current_user = get_jwt_identity()

        if file:
            # upload file to the server
            
            filename = secure_filename(file.filename)
            session['uploaded_filename'] = filename
            Upload.filename = filename
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], filename))

            # store file in database
            user = User.query.filter_by(username=current_user).first()
            video = Video(user_id=user.id, video_url=filename,
                        video_information='test', date_created=datetime.datetime.now().strftime("%Y-%m-%d"))
            db.session.add(video)
            db.session.commit()
            
            # delete frames folder if exists

            return {'message': f'uploads/{filename}'}, 201
        else:
            return {'message': 'File not found'}, 400


    @jwt_required()
    def get(self):
        
        current_user = get_jwt_identity()
        # from database videos table get the last entry row enterd by the user
        user = User.query.filter_by(username= current_user).first()
        video_url = Video.query.filter_by(user_id = user.id).order_by(Video.id.desc()).first().video_url

                
        
        video_path = f'uploads/{video_url}'
        print(video_path)
        return send_file(video_path, mimetype='video/mp4')


class VideoResource(Resource):
    def get(self):
        # Assuming you have a video file named video.mp4 in a folder named 'videos'
        video_path = f'uploads/{Upload.filename}'
        return send_file(video_path, mimetype='video/mp4')

class Result(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        
        # from database videos table get the last entry row enterd by the user
        user = User.query.filter_by(username= current_user).first()
        video_url = Video.query.filter_by(user_id = user.id).order_by(Video.id.desc()).first().video_url

                
        
        video_path = f'uploads/{video_url}'
        ai_instance = AI()
        frame_path = ai_instance.frame(video_path)#frame path is a folder
        
        if frame_path is None:
            return {'message': 'Failed to load frame'}, 400
        
        # create a list of frames path
        frame_list = []
        for i in os.listdir(frame_path):
            frame_list.append(f"{frame_path}/{i}")
        
        print (frame_list)

        images = []
        frame_data = []

        for path in frame_list:
            with open(path, 'rb') as image_file:
                discription = "test"
                image_with_discription = {}
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                image_with_discription[encoded_image] = discription
                frame_data.append(image_with_discription)
                images.append(encoded_image)
                
        user = User.query.filter_by(username=current_user).first()
        # table_name = f'{username}_frames'
        # upload to database table named username_frames
        table_name = f"{user.username}_frames"
        frame =  Frame(table_name, user.id, images, frame_data, datetime.datetime.now().strftime("%Y-%m-%d"))
        db.session.add(frame)
        db.session.commit()


        return jsonify(images)

 
        
class logout(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti']
        blacklisted_tokens.add(jti)
        return {'message': 'Successfully logged out'}, 200
        


# Add the VideoResource to the API
api.add_resource(VideoResource, '/video')
api.add_resource(Login, '/login')
api.add_resource(Registration, '/register')
api.add_resource(Upload, '/upload')
api.add_resource(logout, '/logout')
api.add_resource(Result, '/result')

if __name__ == '__main__':
    app.run(debug=True)
