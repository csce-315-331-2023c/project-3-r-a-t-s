## Define Routes and Application Logic
from flask import Blueprint, request, jsonify
from flask_cors import CORS 
import psycopg2
#from datetime import date
#import random
import logging

manager_BP = Blueprint('manager', __name__)

# Enable CORS for all routes
CORS(manager_BP)
# CORS(cashier_BP, origins = 'https://project-3-r-a-t-s.vercel.app')

## Define database connection
DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@manager_BP.route('/get_product_report', methods = ['POST'])
def get_product_report():
    try:
        data = request.get_json()

        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        # get start and end dates
        start_date = data[0]
        end_date = data[1]

        query = ("SELECT MENU_ITEMS.menu_item_name, COUNT(*) AS menu_items "
                "FROM ORDERS " + "JOIN ORDER_ITEMS ON ORDERS.order_id = ORDER_ITEMS.order_id "
                "JOIN MENU_ITEMS ON ORDER_ITEMS.menu_item_id = MENU_ITEMS.menu_item_id "
                "WHERE ORDERS.date >= '%s' AND ORDERS.date <= '%s' "
                "GROUP BY MENU_ITEMS.menu_item_name;")
        
        cursor.execute(query, (start_date, end_date))
        results = cursor.fetchall()

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)})

@manager_BP.route('/get_order_history', methods=['POST'])
def get_order_history():
    dates = request.get_json()
    start_date = dates['startDate']
    end_date = dates['endDate']

    start_datetime = f"{start_date} 00:00:00"
    end_datetime = f"{end_date} 23:59:59"

    # Use start_date and end_date to query the database
    order_history_query = f"SELECT * FROM ORDERS WHERE date BETWEEN '{start_datetime}' AND '{end_datetime}';"

    # Execute the query and fetch the data
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(order_history_query)

        # Get column names from the cursor description
        column_names = [desc[0] for desc in cursor.description]

        # Fetch all rows and create a list of dicstionaries
        data = cursor.fetchall()
    
        # Convert the data to a JSON response
        order_history = []

        for order in data:
            order_data = dict(zip(column_names, order))
            # Format the date to display only the date part
            order_data['date'] = order_data['date'].strftime("%Y-%m-%d")
            order_history.append(order_data)

        conn.close()
        return jsonify(order_history)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to fetch order history'}), 500



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