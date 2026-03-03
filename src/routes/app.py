from flask import Flask
from flask_cors import CORS
from LoginRoutes import login_bp

app = Flask(__name__)
CORS(app)

# Registering the GET/POST endpoint
app.register_blueprint(login_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)