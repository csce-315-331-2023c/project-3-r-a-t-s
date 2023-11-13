from flask import Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2 

manager_BP = Blueprint('manager', __name__)

# Enable CORS for all routes
CORS(manager_BP)
# CORS(cashier_BP, origins = 'https://project-3-r-a-t-s.vercel.app')

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@manager_BP.route('/get_product_report', methods = ['POST'])
def get_product_report():
    data = request.get_json()
    start_date = data['startDate']
    end_date = data['endDate']

    query = f"SELECT MENU_ITEMS.menu_item_name, COUNT(*) AS menu_items FROM ORDERS JOIN ORDER_ITEMS ON ORDERS.order_id = ORDER_ITEMS.order_id JOIN MENU_ITEMS ON ORDER_ITEMS.menu_item_id = MENU_ITEMS.menu_item_id WHERE ORDERS.date >= '{start_date}' AND ORDERS.date <= '{end_date}' GROUP BY MENU_ITEMS.menu_item_name;"
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query, (start_date, end_date,))
        results = cursor.fetchall()

        column_names = [desc[0] for desc in cursor.description]
    
        report = []

        for item in results:
            order_data = dict(zip(column_names, item))
            report.append(order_data)

        return jsonify({"report": report,
                        "start": start_date})


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
    

@manager_BP.route('/add_inventory', methods=['POST'])
def add_inventory():
    try:
        data = request.get_json()
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO inventory (name, quantity, unit, price, threshold) VALUES (%s, %s, %s, %s, %s)',
                       (data['name'], data['quantity'], data['unit'], data['price'], data['threshold']))
        conn.commit()  
        
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Item added to inventory"}), 201

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500
    

@manager_BP.route('/remove_inventory', methods=['POST'])
def remove_inventory():
    try:
        data = request.get_json()
        item_name = data['name']
        
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM inventory WHERE name = %s', (item_name,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Item {item_name} removed from inventory"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500


@manager_BP.route('/get_menu_items', methods=['GET'])
def get_menu_items():
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute('SELECT menu_item_id, menu_item_name, price FROM menu_items')
        menu_items = cursor.fetchall()

        print("menuItems", menu_items)

        items = [
            {"menu_item_id": item[0], "name": item[1], "price": item[2]}
            for item in menu_items
        ]

        cursor.close()
        conn.close()

        return jsonify(items)

    except Exception as e:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        return jsonify({"error": str(e)}), 500
