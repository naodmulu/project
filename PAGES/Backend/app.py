from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://flaskuser:12344321@localhost:5432/flaskdb'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(80), nullable=False)

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

        user = User.query.filter_by(username=args['username'], password=args['password']).first()

        if user:
            return {'message': 'Login successful'}, 200
        else:
            return {'message': 'Invalid credentials'}, 401
        
api.add_resource(Login, '/login')
api.add_resource(Registration, '/register')

if __name__ == '__main__':
    app.run(debug=True)
