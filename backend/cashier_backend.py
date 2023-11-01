## Define Routes and Application Logic
from flask import Flask, request, jsonify
from flask_cors import CORS 
import psycopg2
from datetime import date
import random

app = Flask(__name__)

# Enable CORS for all routes
# Run Locally with CORS(app)
# CORS(app)
CORS(app, resources={r"/place_order": {"origins": "https://project-3-r-a-t-s.vercel.app"}})

## Define database connection
DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@app.route('/place_order', methods=['POST'])
def place_order():
    # Log the request method
    app.logger.info(f"Received {request.method} request to /place_order")
    # Process the order data and update the database
    try:
        data = request.get_json()

        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        order_total = 0.0
        current_date = date.today()
        employeeID = random.randint(1, 4)

        # Insert into the ORDERS table 
        insert_order_query = "INSERT INTO ORDERS (employee_id, order_total, date) VALUES (%s, %s, %s) RETURNING order_id"
        order_total = 0.0  # Initialize the order total
        cursor.execute(insert_order_query, (employeeID, order_total, current_date))
        order_id = cursor.fetchone()[0]

        for item in data['items']:
            # Get Menu Item ID
            item_query = "SELECT menu_item_id, price FROM MENU_ITEMS WHERE menu_item_name = %s"
            cursor.execute(item_query, (item,))
            menu_item_data = cursor.fetchone()

            if menu_item_data:
                menu_item_id, menu_item_price = menu_item_data
                order_total += menu_item_price

                # Insert into ORDER_ITEMS table for each menu item
                order_items_query = "INSERT INTO ORDER_ITEMS (order_id, menu_item_id, quantity) VALUES (%s, %s, %s)"
                cursor.execute(order_items_query, (order_id, menu_item_id, 1))

        # Update the total in the ORDERS table
        update_total_query = "UPDATE ORDERS SET order_total = %s WHERE order_id = %s"
        cursor.execute(update_total_query, (order_total, order_id))
        
        # Commit the changes to the database
        conn.commit()

        # Close the cursor and database connection
        cursor.close()
        conn.close()

        return jsonify({"message": "Order placed successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run()