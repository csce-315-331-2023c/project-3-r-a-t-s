# Define Routes and Application Logic
from flask import Blueprint, request, jsonify
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
    """
    Processes the order data and updates the database with the order details.

    :return: JSON response indicating the success or error of the order placement.
    """
    try:
        data = request.get_json()
        client_type = request.headers.get('X-Client-Type')

        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        order_total = 0.0
        current_date = date.today()

        if client_type == 'cashier':
            user_id = data['username']
            get_employee_query = "SELECT employee_id FROM EMPLOYEE where username = %s;"
            cursor.execute(get_employee_query, (user_id,))
            employeeID = cursor.fetchone()[0]
            print("EmployeeID", employeeID)
        elif client_type == 'customer':  
            employeeID = 5

        # Insert into the ORDERS table 
        insert_order_query = "INSERT INTO ORDERS (employee_id, order_total, date) VALUES (%s, %s, %s) RETURNING order_id"
        order_total = 0.0  # Initialize the order total
        cursor.execute(insert_order_query, (employeeID, order_total, current_date,))
        order_id = cursor.fetchone()[0]

        for item in data['items']:
            #Check if item is an array and parse by commas. The first item in the array will be the menu_item_name
            if ',' in item:
                item_list = item.split(', ')
                menu_item_name = item_list[0]
                ingredients = item_list[1:]
            else:
                menu_item_name = item

            # Get Menu Item ID
            item_query = "SELECT menu_item_id, price, is_customizable FROM MENU_ITEMS WHERE menu_item_name = %s"
            cursor.execute(item_query, (menu_item_name,))
            menu_item_data = cursor.fetchone()
            
            if menu_item_data:
                menu_item_id, menu_item_price, is_customizable = menu_item_data
                order_total += menu_item_price
                # Insert into ORDER_ITEMS table for each menu item
                order_items_query = "INSERT INTO ORDER_ITEMS (order_id, menu_item_id, quantity) VALUES (%s, %s, %s) RETURNING item_id"
                cursor.execute(order_items_query, (order_id, menu_item_id, 1,))
                item_id = cursor.fetchone()[0]

                #If Menu Item Is Customizable, insert into selected_ingredients
                if is_customizable == True:
                    if "Penne" in menu_item_name:
                        ingredients.append("Penne")
                    if "Spaghetti" in menu_item_name:
                        ingredients.append("Spaghetti")
                    if "Meatballs" in menu_item_name:
                        ingredients.append("Meatballs")

                    for ingredient_name in ingredients:
                        try:
                            get_ingredient_id_query = "SELECT ingredient_id FROM INVENTORY where name = %s"
                            cursor.execute(get_ingredient_id_query, (ingredient_name,))
                            ingredient_id = cursor.fetchone()[0]

                            if ingredient_id:
                                {}
                            else:
                                return jsonify({"error": "No Ingredient Info Found For: " + ingredient_name})

                            insert_selections_query = "INSERT INTO SELECTED_INGREDIENTS(order_id, item_id, menu_item_id, ingredient_id) VALUES(%s, %s, %s, %s)"
                            cursor.execute(insert_selections_query, (order_id, item_id, menu_item_id, ingredient_id,))

                        except Exception as e:
                            return jsonify({"error": str(e)})

                    #Use Selected Ingredients to reduce them from inventory
                    FetchIngredients_query = (
                        "SELECT I.ingredient_id, I.quantity AS inventory_quantity "
                        "FROM MENU_ITEMS MI "
                        "JOIN SELECTED_INGREDIENTS MII ON MI.menu_item_id = MII.menu_item_id "
                        "JOIN INVENTORY I ON MII.ingredient_id = I.ingredient_id "
                        "WHERE MI.menu_item_name = %s"
                    )
                else: 
                    # Reduce Menu Item's Ingredients From Inventory
                    FetchIngredients_query = (
                        "SELECT I.ingredient_id, I.quantity AS inventory_quantity "
                        "FROM MENU_ITEMS MI "
                        "JOIN MENU_ITEM_INGREDIENTS MII ON MI.menu_item_id = MII.menu_item_id "
                        "JOIN INVENTORY I ON MII.ingredient_id = I.ingredient_id "
                        "WHERE MI.menu_item_name = %s"
                    )

                cursor.execute(FetchIngredients_query, (menu_item_name,))
                result_set = cursor.fetchall()
                if result_set:
                    for row in result_set:
                        ingredientId = row[0]
                        inventoryQuantity = row[1]
                        updatedQuantity = inventoryQuantity - 1

                        UpdateInventory_query = "UPDATE INVENTORY SET quantity = %s WHERE ingredient_id = %s"
                        cursor.execute(UpdateInventory_query, (updatedQuantity, ingredientId,))
                else:
                    UpdateInventory_query = "UPDATE INVENTORY SET quantity = quantity - 1 WHERE name = %s"
                    cursor.execute(UpdateInventory_query, (menu_item_name,))
            else:
                # Handle the case where no menu item data is found
                error_message = f"No menu item found for: {menu_item_name}"
                print(error_message)

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

@cashier_BP.route('/get_price', methods=['POST'])
def get_price():
    """
    Retrieves the price of a menu item from the database.

    :return: JSON response containing the price of the specified menu item.
    """

    menu_item = request.get_json()

    query = "SELECT price FROM menu_items WHERE menu_item_name='" + menu_item + "';"
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query)
        price = cursor.fetchall()

        if price:
            return jsonify({"price": price[0], "item": menu_item})
        else:
            return jsonify({"error": "No price found for Menu Item: " + menu_item})

    except Exception as e:
        return jsonify({"error": str(e)})
    

@cashier_BP.route('/get_new_menu_items', methods=['POST'])
def get_new_menu_items():
    """
    Retrieves a list of new menu items from the database.

    :return: JSON response containing the names of new menu items.
    """

    query = "SELECT menu_item_name FROM menu_items WHERE menu_item_id > 70;"
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query)
        data = cursor.fetchall()

        return jsonify({"data" : data})


    except Exception as e:
        return jsonify({"error": str(e)})
