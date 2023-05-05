from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-created_at', '-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    serialize_rules = ('-created_at', '-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', backref='posts')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    serialize_rules = ('-created_at', '-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', backref='comments')
    post = db.relationship('Post', backref='comments')
    
class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'
    serialize_rules = ('-created_at', '-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', backref='likes')
    post = db.relationship('Post', backref='likes')
    

class Friend(db.Model, SerializerMixin):
    __tablename__ = 'friends'
    serialize_rules = ('-created_at', '-updated_at')
    
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user = db.relationship('User', backref='friends')