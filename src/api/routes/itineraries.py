from flask import Blueprint, jsonify, request
from ...crawler import crawler_map
from ..models.models import Itinerary
from ..db import db

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

    itinerary_data = {
        'type': data['type'],
        'name': data['name'],
        'description': data['description'],
        'image': data['image'],
        'url': data['url'],
        'start': data['start'],
        'destination': data['destination'],
        'departure_time': data['departure_time'],
        'arrival_time': data['arrival_time'],
        'price': data['price']
    }

    try:
        itinerary = Itinerary(**itinerary_data)
        db.session.add(itinerary)
        db.session.commit()

        return jsonify({
            'message': 'Itinerary created successfully',
            'id': itinerary.id,
        }), 201
    except Exception as e:
        db.session.rollback()
        
        if 'unique constraint' in str(e).lower() or 'duplicate' in str(e).lower():
            existing_itinerary = Itinerary.query.filter_by(
                type=itinerary_data['type'],
                name=itinerary_data['name'],
                url=itinerary_data['url']
            ).first()

            if existing_itinerary:
                return jsonify({
                    'message': 'Itinerary already exists',
                    'id': existing_itinerary.id
                }), 200                

        return jsonify({
            'error': 'Failed to create itinerary',
            'details': str(e)
        }), 409

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

@itinerary_bp.route('/itineraries/search', methods=['POST'])
def search_itineraries():
    print("Search endpoint hit!")
    data = request.get_json()
    query = data.get('query')
    clean_query = {k: v for k, v in query.items() if v is not None and v != ''}

    type = data.get('type')
    print(f"Searching for itineraries of type: {type}")
    print(f"Query: {clean_query}")

    crawler = crawler_map[type]()
    results = crawler.search(**clean_query)
    print(f"Search results:", results)

    return jsonify({'message': 'Search completed successfully', 'results': results}), 200