from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

from db import db
db.init_app(app)

from models import models

from routes.users import user_bp
app.register_blueprint(user_bp)

from routes.itineraries import itinerary_bp
app.register_blueprint(itinerary_bp)

from routes.booking import user_itinerary_bp
app.register_blueprint(user_itinerary_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)