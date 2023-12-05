from flask import Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2 
import random

manager_BP = Blueprint('manager', __name__)

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@manager_BP.route('/get_order_history', methods=['POST'])
def get_order_history():
    """
    Fetches order history data based on the specified date range.

    :return: JSON response containing order history data.
    """
    dates = request.get_json()
    start_date = dates['startDate']
    end_date = dates['endDate']

    start_datetime = f"{start_date} 00:00:00"
    end_datetime = f"{end_date} 23:59:59"

    # Use start_date and end_date to query the database
    order_history_query = f"SELECT * FROM ORDERS WHERE date BETWEEN '{start_datetime}' AND '{end_datetime}' ORDER BY date DESC;"

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

            # Java logic to build the 'ingredients' string
            order_id = order_data['order_id']

            stmt = conn.cursor()
            menu_items = ""
            #Query Returns Menu Item Name From Specific Order ID 
            menu_items_query = f"""SELECT MENU_ITEMS.menu_item_name AS menu_item_name,
                                    ORDER_ITEMS.item_id as item_id FROM ORDERS
                                    JOIN ORDER_ITEMS ON ORDERS.order_id = ORDER_ITEMS.order_id
                                    JOIN MENU_ITEMS ON ORDER_ITEMS.menu_item_id = MENU_ITEMS.menu_item_id
                                    WHERE ORDERS.order_id = %s;"""
            stmt.execute(menu_items_query, (order_id,))
            results = stmt.fetchall()

            #Result will be the menu item name from order_id 
            for result in results:
                menu_item_name, item_id = result
                menu_id_query = f"SELECT menu_item_id from MENU_ITEMS where menu_item_name = %s;"
                cursor.execute(menu_id_query, (menu_item_name,))
                menu_item_id = cursor.fetchone()[0]

                boolean_query = "SELECT is_customizable FROM MENU_ITEMS WHERE menu_item_name = %s"
                cursor.execute(boolean_query, (menu_item_name,))
                is_customizable = cursor.fetchone()[0]

                if is_customizable == True:
                    #Fetch Ingredient Names FROM SELECTED_INGREDIENTS given the menu_item_id, order item id, and order id 
                    menu_ingredients_query = f"""SELECT i.name AS ingredient_name FROM SELECTED_INGREDIENTS mi JOIN 
                                            INVENTORY i ON mi.ingredient_id = i.ingredient_id WHERE
                                            mi.menu_item_id = %s
                                            AND mi.order_id = %s
                                            AND mi.item_id = %s;"""
                    cursor.execute(menu_ingredients_query, (menu_item_id, order_id, item_id, ))
                else:               
                    #Fetch Ingredient Names FROM MENU_ITEM_INGREDIENTS given the menu_item_id
                    menu_ingredients_query = f"""SELECT i.name AS ingredient_name FROM MENU_ITEM_INGREDIENTS mi JOIN 
                                                INVENTORY i ON mi.ingredient_id = i.ingredient_id WHERE
                                                mi.menu_item_id = %s;"""
                    cursor.execute(menu_ingredients_query, (menu_item_id,))

                ingredients = cursor.fetchall() #Format is [('Name',), ('Name2',), ...]
                names = [ingredient[0] for ingredient in ingredients] #Convert to List of String
                ingredient_names = ", ".join(names) #Join list of strings to one string
                menu_items += result[0] + ": (" + ingredient_names + ")" + ", "
                
            menu_items = menu_items[:-2] #To remove the last ", " 
            order_data['menu_items'] = menu_items
            order_history.append(order_data)

        conn.close()
        return jsonify(order_history)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to fetch order history'}), 500

@manager_BP.route('/get_inventory', methods=['GET'])
def get_inventory():
    """
    Fetches the current inventory.

    :return: JSON response containing the inventory data.
    """
    try:
        client_type = request.headers.get('X-Client-Type')
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute('SELECT ingredient_id, name, price, quantity, unit FROM inventory')
        inventory_items = cursor.fetchall()

        items = [
            {
                "ingredient_id": item[0],
                "name": item[1],
                "price": item[2],
                "quantity": item[3],
                "unit": item[4]
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
    """
    Adds an item to the inventory.

    :return: JSON response indicating the success or failure of the operation.
    """
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
    """
    Removes an item from the inventory.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        item_id = data['ingredient_id']
        
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM inventory WHERE ingredient_id = %s', (item_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Item {item_id} removed from inventory"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500

@manager_BP.route('/edit_inventory', methods=['POST'])
def edit_inventory():
    """
    Edits the quantity of an item in the inventory.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        item_name = data['name']
        new_quantity = data['newQuantity']

        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute('UPDATE inventory SET quantity = %s WHERE name = %s', (new_quantity, item_name))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Quantity for item {item_name} edited in inventory"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500
    
# Python Flask function

@manager_BP.route('/update_inventory_item', methods=['POST'])
def update_inventory_item():
    """
    Updates information for an inventory item.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        item_id = data['id']
        new_name = data['name']
        new_quantity = data['quantity']
        new_price = data['price']
        new_unit = data['unit']

        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        query = """
        UPDATE inventory 
        SET name = %s, quantity = %s, price = %s, unit = %s 
        WHERE ingredient_id = %s
        """
        cursor.execute(query, (new_name, new_quantity, new_price, new_unit, item_id))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Inventory item {item_id} updated successfully"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500


@manager_BP.route('/get_employee_list', methods=['POST'])
def get_employee_list():
    """
    Fetches a list of employees.

    :return: JSON response containing the employee list.
    """

    employee_info_query = f"SELECT * FROM EMPLOYEE ORDER BY employee_id ASC;"
    # Execute the query and fetch the data
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(employee_info_query)

        # Get column names from the cursor description
        column_names = [desc[0] for desc in cursor.description]

        # Fetch all rows and create a list of dicstionaries
        data = cursor.fetchall()
    
        # Convert the data to a JSON response
        employee_info = []

        for employee in data:
            employee_data = dict(zip(column_names, employee))
            employee_info.append(employee_data)

        conn.close()
        return jsonify(employee_info)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Fetch Employee Information'}), 500
    
@manager_BP.route('/add_employee', methods=['POST'])
def add_employee():
    """
    Adds an employee to the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    employee_data = request.get_json()

    last_name = employee_data['LastName']
    first_name = employee_data['FirstName']
    salary  = employee_data['Salary']
    hours_per_week  = employee_data['Hours']
    manager_id  = employee_data['ManagerID']
    username = str(random.randint(1000, 9999)) 
    password = employee_data['Password']

    max_employee_query = f"SELECT MAX(employee_id) FROM EMPLOYEE;"
    manager_count_query = f"SELECT manager_id FROM MANAGER;"
    username_query = f"SELECT username FROM EMPLOYEE;"
    add_employee_query = f"INSERT INTO EMPLOYEE(employee_id, last_name, first_name, salary, hours_per_week, manager_id, username, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        #Get Next Available Employee ID
        cursor.execute(max_employee_query)
        employee_max = cursor.fetchone()
        employee_id = int(employee_max[0]) + 1

        #Check if ManagerID is within range
        cursor.execute(manager_count_query)
        manager_ids = [id[0] for id in cursor.fetchall()]        

        if str(manager_id) not in map(str, manager_ids):
            conn.close()
            return jsonify({'error': 'ManagerID out of range', 'available_manager_ids': manager_ids})

        #Check if username is unique
        cursor.execute(username_query)
        usernames_taken = [user[0] for user in cursor.fetchall()]
        while str(username) in map(str, usernames_taken):
            username = str(random.randint(1000, 9999))

        cursor.execute(add_employee_query, (employee_id, last_name, first_name, salary, hours_per_week, manager_id, username, password,))
        conn.commit()
        conn.close()
        response_data = {
            'message': 'Employee Added (From Backend)',
            'username': username,
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Add Employee'}), 500

@manager_BP.route('/remove_employee', methods=['POST'])
def remove_employee():
    """
    Removes an employee from the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    employee_id = request.get_json()

    remove_employee_query = f"DELETE FROM EMPLOYEE where employee_id = %s;"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(remove_employee_query, (employee_id,))
        conn.commit()
        conn.close()
        return jsonify("Employee Removed (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Remove Employee'}), 500

@manager_BP.route('/update_employee', methods=['POST'])
def update_employee():
    """
    Updates information for an employee in the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    employee_data = request.get_json()
    if not employee_data:
        return jsonify({'error': 'Invalid JSON format'}), 400

    employee_id = employee_data['employee_id']
    last_name = employee_data['LastName']
    first_name = employee_data['FirstName']
    salary  = employee_data['Salary']
    hours_per_week  = employee_data['Hours']
    manager_id  = employee_data['ManagerID']
    password = employee_data['Password']

    update_query = """UPDATE EMPLOYEE SET last_name = %s, first_name = %s, salary = %s, hours_per_week = %s, manager_id = %s, password = %s WHERE employee_id = %s;"""
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(update_query, (last_name, first_name, salary, hours_per_week, manager_id, password, employee_id, ))
        conn.commit()
        conn.close()
        return jsonify("Employee Added (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Add Employee'}), 500

@manager_BP.route('/get_menu_items', methods=['GET'])
def get_menu_items():
    """
    Fetches a list of menu items with their ingredients.

    :return: JSON response containing the menu items and their ingredients.
    """
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute('''SELECT menu_item_id, menu_item_name, price FROM menu_items ORDER BY menu_item_name;''')
        menu_items = cursor.fetchall()

        items = [
            {"menu_item_id": item[0], "name": item[1], "price": item[2], "ingredients": []}
            for item in menu_items
        ]

        for i in items:
            cursor.execute('''
            SELECT 
                i.name AS ingredient_name
            FROM 
                MENU_ITEMS mi
            JOIN 
                MENU_ITEM_INGREDIENTS mii ON mi.menu_item_id = mii.menu_item_id
            JOIN 
                INVENTORY i ON mii.ingredient_id = i.ingredient_id
            WHERE 
                mi.menu_item_name = %s;
            ''', (i.get('name'),))
            ingredients = cursor.fetchall()
            i.update({'ingredients': ingredients})
        
        # cursor.execute('''
        #     SELECT 
        #         mi.menu_item_id, 
        #         mi.menu_item_name, 
        #         mi.price, 
        #         array_agg(i.name) AS ingredients
        #     FROM 
        #         menu_items mi
        #     JOIN 
        #         menu_item_ingredients mii ON mi.menu_item_id = mii.menu_item_id
        #     JOIN 
        #         inventory i ON mii.ingredient_id = i.ingredient_id
        #     GROUP BY 
        #         mi.menu_item_id;
        # ''')
        # menu_items = cursor.fetchall()

        # items = [
        #     {"menu_item_id": item[0], "name": item[1], "price": item[2], "ingredients": item[3]}
        #     for item in menu_items
        # ]

        cursor.close()
        conn.close()

        return jsonify(items)

    except Exception as e:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        return jsonify({"error": str(e)}), 500

@manager_BP.route('/add_menu_item', methods=['POST'])
def add_menu_item():
    """
    Adds a menu item to the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        
        # Update menu_items
        cursor.execute('INSERT INTO menu_items (menu_item_name, price, is_customizable) VALUES (%s, %s, FALSE);',
                       (data['name'], data['price']))
        conn.commit()  

        # get new menu_item id
        cursor.execute('SELECT menu_item_id FROM menu_items WHERE menu_item_name=%s;',
                       (data['name'],))
        temp = cursor.fetchone()
        id = int(temp[0])

        # map new menu_item ingredients with menu_item 
        for i in data['ingredients']:
            # get ingredient id
            cursor.execute('SELECT ingredient_id FROM inventory WHERE name=%s;', (i,))
            temp = cursor.fetchone() 
            id2 = int(temp[0])

            # add to menu_item_ingredients
            cursor.execute('INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id) VALUES (%s, %s);', (id, id2,))
            conn.commit()  

        cursor.close()
        conn.close()
        return jsonify({"message": "Menu item added"}), 200
    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500

@manager_BP.route('/delete_menu_item', methods=['POST'])
def delete_menu_item():
    """
    Deletes a menu item from the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        id = data['id']

        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        # remove ingredients
        cursor.execute('DELETE FROM MENU_ITEM_INGREDIENTS WHERE menu_item_id= %s;', (id,))
        conn.commit()

        cursor.execute('DELETE FROM menu_items WHERE menu_item_id = %s;', (id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Menu item {id} removed"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500

@manager_BP.route('/change_menu_item', methods=['POST'])
def change_menu_item():
    """
    Changes information for a menu item in the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    try:
        data = request.get_json()
        item_name = data['name']
        new_price = data['price']
        id = data['id']
        ingredients = data['ingredients']
        
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute('UPDATE menu_items SET price = %s WHERE menu_item_name = %s', (new_price, item_name,))
        conn.commit()

        # remove ingredients
        cursor.execute('DELETE FROM MENU_ITEM_INGREDIENTS WHERE menu_item_id= %s;', (id,))
        conn.commit()

        # # re-map menu_item ingredients with menu_item 
        for i in ingredients:
            # get ingredient id
            cursor.execute('SELECT ingredient_id FROM inventory WHERE name=%s;', (i,))
            temp = cursor.fetchone() 
            id2 = int(temp[0])

            # add to menu_item_ingredients
            cursor.execute('INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id) VALUES (%s, %s);', (id, id2,))
            conn.commit()  

        cursor.close()
        conn.close()

        return jsonify({"message": f"Menu item {item_name} price changed"}), 200

    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({"error": str(e)}), 500

@manager_BP.route('/get_manager_list', methods=['POST'])
def get_manager_list():
    """
    Fetches a list of managers.

    :return: JSON response containing the manager list.
    """

    manager_info_query = f"SELECT * FROM MANAGER ORDER BY manager_id ASC;"
    # Execute the query and fetch the data
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(manager_info_query)

        # Get column names from the cursor description
        column_names = [desc[0] for desc in cursor.description]

        # Fetch all rows and create a list of dicstionaries
        data = cursor.fetchall()
    
        # Convert the data to a JSON response
        manager_info = []

        for manager in data:
            manager_data = dict(zip(column_names, manager))
            manager_info.append(manager_data)

        conn.close()
        return jsonify(manager_info)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Fetch Manager Information'}), 500

@manager_BP.route('/add_manager', methods=['POST'])
def add_manager():
    """
    Adds a manager to the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    manager_data = request.get_json()

    last_name = manager_data['LastName']
    first_name = manager_data['FirstName']
    salary = manager_data['Salary']
    hours_per_week = manager_data['Hours']
    email = manager_data['Email']

    max_manager_query = f"SELECT MAX(manager_id) FROM MANAGER;"
    add_manager_query = f"INSERT INTO MANAGER(manager_id, last_name, first_name, salary, hours_per_week, email) VALUES (%s, %s, %s, %s, %s, %s);"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        #Get Next Available Manager ID
        cursor.execute(max_manager_query)
        manager_max = cursor.fetchone()
        manager_id = int(manager_max[0]) + 1

        cursor.execute(add_manager_query, (manager_id, last_name, first_name, salary, hours_per_week, email,))
        conn.commit()
        conn.close()
        response_data = {
            'message': 'Manager Added (From Backend)',
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Add Manager'}), 500

@manager_BP.route('/remove_manager', methods=['POST'])
def remove_manager():
    """
    Removes a manager from the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    manager_id = request.get_json()

    remove_manager_query = f"DELETE FROM MANAGER where manager_id = %s;"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(remove_manager_query, (manager_id,))
        conn.commit()
        conn.close()
        return jsonify("Manager Removed (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Remove Manager'}), 500
    
@manager_BP.route('/update_manager', methods=['POST'])
def update_manager():
    """
    Updates information for a manager in the database.

    :return: JSON response indicating the success or failure of the operation.
    """
    manager_data = request.get_json()
    if not manager_data:
        return jsonify({'error': 'Invalid JSON format'}), 400

    manager_id = manager_data['manager_id']
    last_name = manager_data['LastName']
    first_name = manager_data['FirstName']
    salary  = manager_data['Salary']
    hours_per_week  = manager_data['Hours']
    email = manager_data['Email']
    admin = manager_data['Admin']

    update_query = """UPDATE MANAGER SET last_name = %s, first_name = %s, salary = %s, hours_per_week = %s, email = %s, admin = %s WHERE manager_id = %s;"""
    
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(update_query, (last_name, first_name, salary, hours_per_week, email, admin, manager_id, ))
        conn.commit()
        conn.close()
        response_data = {
            'message': 'Manager Updated (From Backend)',
            'isAdmin': admin
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Update Manager'}), 500

@manager_BP.route('/get_ingredients', methods=['POST'])
def get_ingredients():
    """
    Fetches a list of ingredients.

    :return: JSON response containing the ingredients list.
    """

    manager_info_query = f"SELECT name FROM inventory ORDER BY name;"
    # Execute the query and fetch the data
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(manager_info_query)

        # Fetch all rows and create a list of dicstionaries
        data = cursor.fetchall()

        items = [
            {"value": item[0], "label": item[0]}
            for item in data
        ]

        conn.close()
        return jsonify(items)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to fetch Ingredients list'}), 500
        
@manager_BP.route('/check_if_admin', methods=['POST'])
def check_if_admin():
    """
    Checks if a manager is an admin.

    :return: JSON response indicating the admin status of the manager.
    """
    request_data = request.get_json()
    manager_email = request_data.get('email')

    verify_query = f"SELECT admin FROM MANAGER where email = %s;"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(verify_query, (manager_email,))
        verify_result = cursor.fetchone()
        verify_status = verify_result[0]  # Extract the admin status from the result
        conn.commit()
        conn.close()
        response_data = {
            'message': 'Verification Completed (From Backend)',
            'isAdmin': verify_status
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Remove Manager'}), 500
