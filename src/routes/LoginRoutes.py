from flask import Blueprint, request, jsonify

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/api/login', methods=['POST'])
def login():
    # 1. Receive POST data
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # 2. Simple check (Placeholder for your GET/POST logic)
    if email == "test@gojio.com" and password == "password123":
        return jsonify({
            "user": {"id": "u1", "name": "User", "email": email}
        }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401