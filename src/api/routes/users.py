from flask import Blueprint, request, jsonify
from ..models.models import User
from ..extensions import bcrypt
from ..db import db

user_bp = Blueprint('users', __name__)

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'No input data provided'}), 400
    
    username = data['username']
    password = data['password']

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password_hash=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'username': user.username, 
        'itineraries': [
            {
                'id': itinerary.id, 
                'type': itinerary.type,
                'name': itinerary.name, 
                'start': itinerary.start,
                'destination': itinerary.destination,
                'departure_time': itinerary.departure_time.isoformat() if itinerary.departure_time else None,
                'arrival_time': itinerary.arrival_time.isoformat() if itinerary.arrival_time else None,
            }
            for itinerary in user.itineraries
        ]
    }), 200

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'}), 200

@user_bp.route('/users/<int:user_id>/password', methods=['PUT'])
def update_password(user_id):
    data = request.get_json()

    if not data or 'password' not in data:
        return jsonify({'error': 'No input data provided'}), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    hashed_password = bcrypt.hash(data['password'])
    user.password_hash = hashed_password

    db.session.commit()

    return jsonify({'message': 'Password updated successfully'}), 200

@user_bp.route('/users/<int:user_id>/username', methods=['PUT'])
def update_username(user_id):
    data = request.get_json()

    if not data or 'username' not in data:
        return jsonify({'error': 'No input data provided'}), 400
    
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409
    
    user.username = data['username']
    db.session.commit()

    return jsonify({'message': 'Username updated successfully'}), 200