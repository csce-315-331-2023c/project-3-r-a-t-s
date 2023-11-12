from flask import Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2 

manager_BP = Blueprint('manager', __name__)

# Enable CORS for all routes
CORS(manager_BP)
# CORS(manager_BP, origins = 'https://project-3-r-a-t-s.vercel.app')

## Define database connection
DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@manager_BP.route('/get_order_history')
def get_order_history():
    return jsonify({"message": "order history fetched"})


@manager_BP.route('/get_inventory', methods=['GET'])
def get_inventory():
    try:
        client_type = request.headers.get('X-Client-Type')
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute('SELECT ingredient_id, name, quantity, unit FROM inventory')
        inventory_items = cursor.fetchall()

        items = [
            {
                "ingredient_id": item[0],
                "name": item[1],
                "quantity": item[2],
                "unit": item[3]
            }
            for item in inventory_items
        ]

        cursor.close()
        conn.close()

        return jsonify({"items": items})

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)})