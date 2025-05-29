from flask import Blueprint, jsonify, request
from models.models import Itinerary
from db import db

itinerary_bp = Blueprint('itineraries', __name__)

@itinerary_bp.route('/itineraries', methods=['POST'])
def create_itinerary():
    data = request.get_json()
    fields = ['type', 'name', 'description', 'image', 'url', 'start', 'destination', 'departure_time', 'arrival_time', 'price']
    required_field = ['type', 'name', 'url', 'price']

    if [f for f in required_field if f not in data]:
        return jsonify({'error': 'Some fields missing.'}), 400
    
    for field in fields:
        if field not in data:
            data[field] = ""

    type = data['type']
    name = data['name']
    description = data['description']
    image = data['image']
    url = data['url']
    start = data['start']
    destination = data['destination']
    departure_time = data['departure_time']
    arrival_time = data['arrival_time']
    price = data['price']

    if Itinerary.query.filter_by(name=name).first():
        return jsonify({'error': 'Itinerary already exists'}), 409
    
    new_itinerary = Itinerary(
        type=type,
        name=name,
        description=description,
        image=image,
        url=url,
        start=start,
        destination=destination,
        departure_time=departure_time,
        arrival_time=arrival_time,
        price=price
    )

    db.session.add(new_itinerary)
    db.session.commit()

    return jsonify({'message': 'Itinerary created successfully'}), 201

@itinerary_bp.route('/itineraries/<int:itinerary_id>', methods=['GET'])
def get_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    return jsonify({
        'id': itinerary.id,
        'type': itinerary.type,
        'name': itinerary.name,
        'description': itinerary.description,
        'image': itinerary.image,
        'url': itinerary.url,
        'start': itinerary.start,
        'destination': itinerary.destination,
        'departure_time': itinerary.departure_time.isoformat() if itinerary.departure_time else None,
        'arrival_time': itinerary.arrival_time.isoformat() if itinerary.arrival_time else None,
        'price': itinerary.price
    }), 200

@itinerary_bp.route('/itineraries/<int:itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)

    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    db.session.delete(itinerary)
    db.session.commit()

    return jsonify({'message': 'Itinerary deleted successfully'}), 200

@itinerary_bp.route('/itineraries/<int:itinerary_id>', methods=['PUT'])
def update_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    data = request.get_json()
    for field in ['type', 'name', 'description', 'image', 'url', 'start', 'destination', 'departure_time', 'arrival_time', 'price']:
        if field in data:
            setattr(itinerary, field, data[field])

    db.session.commit()
    return jsonify({'message': 'Itinerary updated successfully'}), 200
