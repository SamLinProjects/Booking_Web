from flask import Blueprint, jsonify, request
from ..models.models import Itinerary, User
from ..db import db

user_itinerary_bp = Blueprint('user_itineraries', __name__)

@user_itinerary_bp.route('/users/<int:user_id>/itineraries/<int:itinerary_id>', methods=['POST'])
def booking_itinerary(user_id, itinerary_id): 
    user = User.query.get(user_id)
    itinerary = Itinerary.query.get(itinerary_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    if itinerary in user.itineraries:
        return jsonify({'error': 'Itinerary already booked by user'}), 409

    user.itineraries.append(itinerary)
    db.session.commit()

    return jsonify({'message': 'Itinerary booked successfully'}), 201

@user_itinerary_bp.route('/users/<int:user_id>/itineraries', methods=['GET'])
def get_user_itinerary(user_id): 
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    itineraries = [
        {
            'id': itinerary.id,
            'type': itinerary.type,
            'name': itinerary.name,
            'start': itinerary.start,
            'destination': itinerary.destination,
            'departure_time': itinerary.departure_time.format() if itinerary.departure_time else None,
            'arrival_time': itinerary.arrival_time.format() if itinerary.arrival_time else None,
        }
        for itinerary in user.itineraries
    ]

    return jsonify({'itineraries': itineraries}), 200

@user_itinerary_bp.route('/users/<int:user_id>/itineraries/<int:itinerary_id>', methods=['GET'])
def get_user_itinerary_by_id(user_id, itinerary_id): 
    user = User.query.get(user_id)
    itinerary = Itinerary.query.get(itinerary_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    if itinerary not in user.itineraries:
        return jsonify({'error': 'Itinerary not booked by user'}), 404

    return jsonify({
        'id': itinerary.id,
        'type': itinerary.type,
        'name': itinerary.name,
        'start': itinerary.start,
        'destination': itinerary.destination,
        'departure_time': itinerary.departure_time.isoformat() if itinerary.departure_time else None,
        'arrival_time': itinerary.arrival_time.isoformat() if itinerary.arrival_time else None,
    }), 200

@user_itinerary_bp.route('/users/<int:user_id>/itineraries/<int:itinerary_id>', methods=['DELETE'])
def delete_user_itinerary(user_id, itinerary_id): 
    user = User.query.get(user_id)
    itinerary = Itinerary.query.get(itinerary_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    if itinerary not in user.itineraries:
        return jsonify({'error': 'Itinerary not booked by user'}), 404

    user.itineraries.remove(itinerary)
    db.session.commit()

    return jsonify({'message': 'Itinerary unbooked successfully'}), 200