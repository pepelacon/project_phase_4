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
    joe = User(username = "joe")
    buddy = User(username = "buddy")
    aubry = User(username = "aubry")
    mads = User(username = "mads")

    users = [joe, buddy, aubry, mads]

    print("Creating Friendship...")


    fr1 = Friendship(user_id = 1, friend_id = 2)
    fr2 = Friendship(user_id = 3, friend_id = 2)
    fr3 = Friendship(user_id = 2, friend_id = 4)
    fr4 = Friendship(user_id = 4, friend_id = 2)

    friendships = [fr1, fr2, fr3, fr4]
    


    print("Creating users...")
    p1 = Post(user_id= 1, image = "https://cdn.shopify.com/s/files/1/0602/8086/4941/products/CH-03-BAA_afc3c9c0-b091-400f-b1bc-13539f9f80ba_2048x.progressive.jpg?v=1669236220", description='on bech', category = 'sport')
    p2 = Post(user_id= 2, image = "rvrfv", description='on sky', category = 'lifestyle')
    p3 = Post(user_id= 3, image = "rv34v", description='on river', category = 'beauty')
    

    posts = [p1, p2, p3]


    print("Creating comment...")
    c1 = Comment(user_id= 1, post_id = 1, content='Super cool, dude')
    c2 = Comment(user_id= 2, post_id = 2, content='What up!')
    c3 = Comment(user_id= 3, post_id = 2, content='Nice picture')
    

    comments = [c1, c2, c3]

    print("Creating likes...")
    l1 = Like(user_id= 1, post_id = 2)
    l2 = Like(user_id= 2, post_id = 4)
    l3 = Like(user_id= 3, post_id = 1)
    

    likes = [l1, l2, l3]


    print("Seeding done!")
    db.session.add_all(users)
    db.session.add_all(friendships)
    db.session.add_all(posts)
    db.session.add_all(comments)
    db.session.add_all(likes)



    db.session.commit()
