from datetime import datetime
from ..db import db

user_itinerary = db.Table('user_itinerary',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('itinerary_id', db.Integer, db.ForeignKey('itinerary.id'), primary_key=True), 
    db.Column('booked_at', db.DateTime, default=datetime.utcnow)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    itineraries = db.relationship('Itinerary', secondary=user_itinerary, backref='users')

class Itinerary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    image = db.Column(db.String(200))
    url = db.Column(db.String(200))
    start = db.Column(db.String(50))
    destination = db.Column(db.String(50))
    departure_time = db.Column(db.String)
    arrival_time = db.Column(db.String)
    price = db.Column(db.Float)

class TokenBlacklist(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(255), unique=True, nullable=False)  # JWT ID
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    revoked = db.Column(db.Boolean, default=False)