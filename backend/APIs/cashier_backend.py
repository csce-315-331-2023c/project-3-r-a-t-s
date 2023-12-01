# Define Routes and Application Logic
from flask import Blueprint, request, jsonify
# from flask_cors import CORS 
import psycopg2
from datetime import date
import random
import logging

cashier_BP = Blueprint('cashier_backend', __name__)

# Define database connection
DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@cashier_BP.route('/place_order', methods=['POST'])
def place_order():
    # Log the request method
    # app.logger.info(f"Received {request.method} request to /place_order")
    # Process the order data and update the database
    try:
        data = request.get_json()
        client_type = request.headers.get('X-Client-Type')

        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        order_total = 0.0
        current_date = date.today()

        if client_type == 'cashier':
            employeeID = random.randint(1, 4)
        elif client_type == 'customer':  
            employeeID = 5

        #app.logger.info("After EmployeeID")

        # Insert into the ORDERS table 
        insert_order_query = "INSERT INTO ORDERS (employee_id, order_total, date) VALUES (%s, %s, %s) RETURNING order_id"
        order_total = 0.0  # Initialize the order total
        cursor.execute(insert_order_query, (employeeID, order_total, current_date))
        order_id = cursor.fetchone()[0]

        #app.logger.info("Before For Loop")

        for item in data['items']:
            # Get Menu Item ID
            item_query = "SELECT menu_item_id, price FROM MENU_ITEMS WHERE menu_item_name = %s"
            cursor.execute(item_query, (item,))
            menu_item_data = cursor.fetchone()
            
            #app.logger.info("Entered For Loop")

            if menu_item_data:
                menu_item_id, menu_item_price = menu_item_data
                order_total += menu_item_price
                # Insert into ORDER_ITEMS table for each menu item
                order_items_query = "INSERT INTO ORDER_ITEMS (order_id, menu_item_id, quantity) VALUES (%s, %s, %s)"
                cursor.execute(order_items_query, (order_id, menu_item_id, 1,))
                # Reduce Menu Item's Ingredients From Inventory
                FetchIngredients_query = (
                    "SELECT I.ingredient_id, I.quantity AS inventory_quantity "
                    "FROM MENU_ITEMS MI "
                    "JOIN MENU_ITEM_INGREDIENTS MII ON MI.menu_item_id = MII.menu_item_id "
                    "JOIN INVENTORY I ON MII.ingredient_id = I.ingredient_id "
                    "WHERE MI.menu_item_name = %s"
                )
                cursor.execute(FetchIngredients_query, (item,))
                result_set = cursor.fetchall()

                #app.logger.info("Before If Result Set")

                if result_set:
                    # Process Result Set For Menu Items with Predefined Ingredients
                    for row in result_set:
                        ingredientId = row[0]
                        inventoryQuantity = row[1]
                        updatedQuantity = inventoryQuantity - 1

                        UpdateInventory_query = "UPDATE INVENTORY SET quantity = %s WHERE ingredient_id = %s"
                        cursor.execute(UpdateInventory_query, (updatedQuantity, ingredientId,))
                else:
                    UpdateInventory_query = "UPDATE INVENTORY SET quantity = quantity - 1 WHERE name = %s"
                    cursor.execute(UpdateInventory_query, (item,))
            else:
                # Handle the case where no menu item data is found
                error_message = f"No menu item found for: {item}"
                #app.logger.error(error_message)
        #app.logger.info("Before Updating Orders")        
        # Update the total in the ORDERS table
        update_total_query = "UPDATE ORDERS SET order_total = %s WHERE order_id = %s"
        cursor.execute(update_total_query, (order_total, order_id,))
        
        # Commit the changes to the database
        conn.commit()

        # Close the cursor and database connection
        cursor.close()
        conn.close()

        response_data = {
            "order_total": order_total,
            "message": "Order placed successfully (From Backend)"}
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)})

# Add other routes below

@cashier_BP.route('/get_price', methods=['POST'])
def get_price():
    menu_item = request.get_json()

    query = "SELECT price FROM menu_items WHERE menu_item_name='" + menu_item + "';"
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query)
        price = cursor.fetchall()

        return jsonify({"price": price, "item" : menu_item})


    except Exception as e:
        return jsonify({"error": str(e)})
    

@cashier_BP.route('/get_new_menu_items', methods=['POST'])
def get_new_menu_items():

    query = "SELECT menu_item_name FROM menu_items WHERE menu_item_id > 70;"
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query)
        data = cursor.fetchall()

        return jsonify({"data" : data})


    except Exception as e:
        return jsonify({"error": str(e)})