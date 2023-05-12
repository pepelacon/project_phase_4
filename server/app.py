from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from dotenv import load_dotenv
load_dotenv()

from models import db, User, Friendship, Post


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
    )

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dbproject_vbgz_user:O5SqAoFGVLqmjagflvowWdtMaqzwAqIe@dpg-chdrl867avj22bgpac30-a.ohio-postgres.render.com/dbproject_vbgz'

# "postgresql://dbproject_vbgz_user:O5SqAoFGVLqmjagflvowWdtMaqzwAqIe@dpg-chdrl867avj22bgpac30-a.ohio-postgres.render.com/dbproject_vbgz"
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
    
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            return make_response({"message" : "Post not found"})
        db.session.delete(post)
        db.session.commit()
        return make_response({"mesage" : "Post was deleted"})
    
    def patch(self, id):
        upd_pt = Post.query.filter_by(id=id).first()
        if not upd_pt:
            return make_response({
                "error": "Post not found"
            }, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(upd_pt, attr, data[attr])
            db.session.add(upd_pt)
            db.session.commit()
        except Exception as e:
            return make_response({"errors" : [e.__str__()]}, 422)
        return make_response(upd_pt.to_dict(), 200)


    
class Users(Resource):
    def post(self):
        data = request.get_json()
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
        
class Friendships(Resource):
    def post(self, id):
        data = request.get_json()
        
        friend_id = data['friend_id']
        user_id = data['user_id']
        # print(friend_id, user_id)

        if user_id == friend_id:
            return make_response({"errors": ["You cannot add yourself as a friend"]}, 422)

        existing_friendship = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()

        if existing_friendship:
            return make_response({"errors": ["Users are already friends"]}, 422)

        try:
            new_frienship = Friendship(
                user_id=user_id,
                friend_id=friend_id
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
    
    def delete(self, id):
        friendship = Friendship.query.filter_by(id=id).first()
        if not friendship:
            return make_response({"message" : "Post not found"})
        db.session.delete(friendship)
        db.session.commit()
        return make_response({"mesage" : "POst was deleted"})

class GetFriendships(Resource):
    def get(self, user_id, friend_id):
        friendship = Friendship.query.filter_by(friend_id=friend_id, user_id=user_id).first()

        if not friendship:
            response = make_response({"friendshipExists": False}, 404)
            return response

        response = make_response({"friendshipExists": True, "friendship": friendship.to_dict()}, 200)
        return response
        
class FriendshipById(Resource):
    def get(self, user_id, friend_id):
        user = User.query.filter_by(id=user_id).first()
        # print(user.username)
        fr = [friend.to_dict() for friend in user.friends if friend.friend_id == friend_id]
        if not fr:
            make_response("", 404)
        print(fr)
        return make_response(fr, 200)
    
class AllFriendships(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        # print(user.username)
        all_friends = [friend.friend_id for friend in user.friends]
        all = [User.query.filter_by(id =num).first().to_dict() for num in all_friends]
        if not user:
            make_response("", 404)
        print( all)
        return make_response(all, 200)

class AllFriendshipsPost(Resource):
    def get(self, id):
        posts_list = []
        user = User.query.filter_by(id=id).first()
        
        f_id = [f.id for f in user.friends]
        for friendship_id in f_id:
            friend = Friendship.query.filter_by(id=friendship_id).first()
            user = User.query.filter_by(id=friend.friend_id).first()
            print(user.posts)
            for post in user.posts:
                print(post)
                posts_list.append(post)
        posts_dict = [pos.to_dict() for pos in posts_list]
        return make_response(posts_dict, 200)

class YourPosts(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        print(user.username)
        all_post = [post.to_dict() for post in user.posts]
        return make_response(all_post, 200)


class Author(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            return make_response({"message" : "Post not found"}, 404)
        author = post.user
        
        return make_response(author.to_dict(), 200)
    
class FriendsPosts(Resource):
    def get(self, id):
        friend = User.query.filter_by(id=id).first()
        all_posts = [post.to_dict() for post in friend.posts]
        return make_response(all_posts, 200)
    


#  *   all friends posts
api.add_resource(FriendsPosts, '/friend/<int:id>/posts')


api.add_resource(AllFriendships, '/users/<int:id>/friends')
api.add_resource(GetFriendships, '/users/<int:user_id>/<int:friend_id>')
api.add_resource(YourPosts, '/users/<int:id>/posts')
api.add_resource(Author, '/posts/<int:id>/user')
api.add_resource(AllFriendshipsPost, '/user/<int:id>/friends/posts')
api.add_resource(Friendships, '/friendships/<int:id>')
api.add_resource(FriendshipById, '/users/<int:user_id>/friends/<int:friend_id>')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(PostById, '/posts/<int:id>')

api.add_resource(Posts, '/posts')

if __name__ == '__main__':
   
    app.run(port=5555, debug=True)
