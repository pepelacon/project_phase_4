from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-created_at', '-updated_at', '-posts', '-friends', '-comments', '-likes')
    
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    friends = db.relationship('Friendship', foreign_keys='Friendship.user_id', back_populates='user', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')



class Friendship(db.Model, SerializerMixin):
    __tablename__ = 'friendships'
        
    serialize_rules = ('-created_at', '-updated_at', '-user', '-friend')

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', foreign_keys='Friendship.user_id', back_populates='friends')
    friend = db.relationship('User', foreign_keys='Friendship.friend_id')


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    serialize_rules = ('-created_at', '-updated_at', '-user', '-likes', '-comments')
    
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='post', cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='posts')


class Comment(db.Model, SerializerMixin):

    __tablename__ = 'comments'

    serialize_rules = ('-created_at', '-updated_at', '-user', '-post')
    
    id = db.Column(db.Integer, primary_key=True)

    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    
class Like(db.Model, SerializerMixin):

    __tablename__ = 'likes'

    serialize_rules = ('-created_at', '-updated_at', '-user', '-post')
    
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')
    
