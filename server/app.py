from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
db = SQLAlchemy()

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

class Check(Resource):
    def get(self):
        return {"message": "Check"}

api.add_resource(Check, '/campers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
