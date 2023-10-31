import psycopg2
import psycopg2
import random
from datetime import datetime, timedelta
from flask import jsonify, Flask
from flask_cors import CORS  # <-- Add this import

app = Flask(__name__)
CORS(app)  # <-- I added this to handle CORS for all routes
# cors = CORS(app, resources={r"/submit_order": {"origins": "*"}})

@app.route('/submit_order', methods=['POST'])
def submit_order():
    DATABASE_URL = "dbname='csce315_904_01db' user='csce315_904_01user' host='csce-315-db.engr.tamu.edu' password='STAR'"
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO orders (message_text) VALUES (%s);",
        ("I think Im in love")
    )

    conn.commit()
    cur.close()
    conn.close()

    response = jsonify({"message": "success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response