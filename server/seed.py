from random import choice as rc, randint
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from faker import Faker

from app import app
from models import db, User, Friendship, Post, Comment, Like

fake = Faker()


with app.app_context():

# This will delete any existing rows
# so you can run the seed file multiple times without having duplicate entries in your database
    print("Deleting data...")
    User.query.delete()
    Friendship.query.delete()
    Post.query.delete()
    Comment.query.delete()
    Like.query.delete()
    

    print("Creating users...")
    joe = User(username = "joe", email = "joe@example.com")
    buddy = User(username = "buddy", email = "buddy@example.com")
    aubry = User(username = "aubry", email = "aubry@example.com")
    mads = User(username = "mads", email = "mads@example.com")

    users = [joe, buddy, aubry, mads]
    db.session.add_all(users)
    db.session.commit()
    print("Creating Friendship...")
   

    fr1 = Friendship(user_id = joe.id, friend_id = buddy.id)
    fr2 = Friendship(user_id = aubry.id, friend_id = buddy.id)
    fr3 = Friendship(user_id = buddy.id, friend_id = mads.id)
    fr4 = Friendship(user_id = mads.id, friend_id = buddy.id)

    friendships = [fr1, fr2, fr3, fr4]
    db.session.add_all(friendships)
    db.session.commit()


    print("Creating users...")
    p1 = Post(user_id= joe.id, image = "https://cdn.shopify.com/s/files/1/0602/8086/4941/products/CH-03-BAA_afc3c9c0-b091-400f-b1bc-13539f9f80ba_2048x.progressive.jpg?v=1669236220", description='on bech', category = 'sport')
    p2 = Post(user_id= buddy.id, image = "rvrfv", description='on sky', category = 'lifestyle')
    p3 = Post(user_id= aubry.id, image = "rv34v", description='on river', category = 'beauty')
    

    posts = [p1, p2, p3]
    db.session.add_all(posts)
    db.session.commit()



    print("Creating comment...")
    c1 = Comment(user_id= joe.id, post_id = p1.id, content='Super cool, dude')
    c2 = Comment(user_id= buddy.id, post_id = p2.id, content='What up!')
    c3 = Comment(user_id= aubry.id, post_id = p3.id, content='Nice picture')

    comments = [c1, c2, c3]
    db.session.add_all(comments)
    db.session.commit()

    print("Creating likes...")
    l1 = Like(user_id= joe.id, post_id = p2.id)
    l2 = Like(user_id= buddy.id, post_id = p3.id)
    l3 = Like(user_id= aubry.id, post_id = p1.id)
    

    likes = [l1, l2, l3]
    db.session.commit()

    print("Seeding done!")  
    db.session.add_all(likes)
    db.session.commit()
