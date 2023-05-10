from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource


from models import db, User, Friendship, Post


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://dbproject_vbgz_user:O5SqAoFGVLqmjagflvowWdtMaqzwAqIe@dpg-chdrl867avj22bgpac30-a.ohio-postgres.render.com/dbproject_vbgz"
# "postgresql://projectdb_la3v_user:jYGks0cLsUxfuZx0nhlTHB9ZOShNp9ug@dpg-chdr4le7avj0djk6c840-a.ohio-postgres.render.com/projectdb_la3v"
# 'postgresql://user:9865458@localhost/DB'
#  *  sqlite:///app.db
# ! postgresql://postgres:password@localhost/project_db
# postgresql://user:9865458@localhost/DB

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
    
    def post(self):
        data = request.get_json()
        try:
            new_Post = Post(
                title=data['title'],
                image=data['image'],
                description=data['description'],
                category=data['category'],
                user_id=data['user_id']
            )
        except Exception as ex:
            return make_response({"errors": [ex.__str__()]}, 422)

        db.session.add(new_Post)
        db.session.commit()

        response_dict = new_Post.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response
    
class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"message" : "User not found"})
        return make_response(user.to_dict(), 200)

class PostById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            return make_response({"message" : "Post not found"})
        return make_response(post.to_dict(), 200)
    
class Users(Resource):
    def post(self):
        data = request.get_json()
        print(data['email'])
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            
            try:
                new_user = User(
                    username = data['username'],
                    email = data['email']
                )
            except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 422)
            
            db.session.add(new_user)
            db.session.commit()

            response_dict = new_user.to_dict()

            response = make_response(
                response_dict,
                201,
            )
            return response
        else:
            return make_response(user.to_dict(), 200)
        
class FriendshipById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        print(user.username)
        all_friendships = [friend.to_dict() for friend in user.friends]
        return make_response(all_friendships, 200)
    
class YourPosts(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        print(user.username)
        all_post = [post.to_dict() for post in user.posts]
        return make_response(all_post, 200)
    
class Friendships(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_frienship = Friendship(
                user_id = data['user_id'],
                friend_id = data['friend_id']
            )
        except Exception as ex:
            return make_response({"errors": [ex.__str__()]}, 422)
        
        db.session.add(new_frienship)
        db.session.commit()

        response_dict = new_frienship.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response

# class Likes(Resource):
#     def get(self):
#         all_likes


api.add_resource(YourPosts, '/users/<int:id>/posts')

api.add_resource(Friendships, '/friendships')
api.add_resource(FriendshipById, '/users/<int:id>/friends')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(PostById, '/posts/<int:id>')

api.add_resource(Posts, '/posts')

if __name__ == '__main__':
   
    app.run(port=5555, debug=True)
