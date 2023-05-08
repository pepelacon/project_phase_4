from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Friendship, Post


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
#  *  sqlite:///app.db
# ! postgresql://postgres:9865458@localhost/project_db

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


# db.create_all()
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)
api = Api(app)

class Posts(Resource):
    def get(self):
        all_posts = [post.to_dict() for post in Post.query.all()]
        return make_response(all_posts, 200)


api.add_resource(Posts, '/posts')

if __name__ == '__main__':
   
    app.run(port=5555, debug=True)
