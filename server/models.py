from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-created_at', '-updated_at', '-posts', '-friends', '-comments', '-likes')
    
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    friends = db.relationship('Friendship', foreign_keys='Friendship.user_id', back_populates='user', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')

    @validates('username')
    def validates_username(self, key, username):
        if not username:
            raise ValueError('Username must be provided.')
        return username
    
    validates('email')
    def validates_email(self, key, email):
        if not email:
            raise ValueError('Email must be provided.')
        return email

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

@validates('title')
def validates_title(self, key, title):
    if not title:
        raise ValueError('Title must be provided.')
    return title

@validates('category')
def validates_category(self, key, category):
    if not category:
        raise ValueError('Category must be provided.')

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

    @validates('content')
    def validates_content(self, key, content):
        if not content:
            raise ValueError('Comment cannot be empty.')
        elif len(content) <= 1 and len(content) >= 120:
            raise ValueError('Comment must be between 1 and 120 characters.')
        return content
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
    
