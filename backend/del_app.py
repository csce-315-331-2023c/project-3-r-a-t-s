# import psycopg2
# import psycopg2
# import random
# from datetime import datetime, timedelta
# from flask import jsonify, Flask
# from flask_cors import CORS  # <-- Add this import

# app = Flask(__name__)
# # CORS(app)  # <-- I added this to handle CORS for all routes
# # cors = CORS(app, resources={r"/submit_order": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"/submit_order": {"origins": "http://localhost:3000"}}, allow_headers=['Content-Type'])


# @app.route('/submit_order', methods=['POST'])
# def submit_order():
#     DATABASE_URL = "dbname='csce315_904_01db' user='csce315_904_01user' host='csce-315-db.engr.tamu.edu' password='STAR'"
#     conn = psycopg2.connect(DATABASE_URL)
#     cur = conn.cursor()

#     cur.execute(
#         "INSERT INTO orders (message_text) VALUES (%s);",
#         ("I think Im in love")
#     )

#     conn.commit()
#     cur.close()
#     conn.close()

#     response = jsonify({"message": "success"})
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='../pos/build')
CORS(app)
@app.route("/api", methods=["GET", "POST"])
@cross_origin()
def index():
    return {
        "message": "Howdy there, World!"
    }

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
