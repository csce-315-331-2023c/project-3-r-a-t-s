from flask import Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2 

manager_BP = Blueprint('manager', __name__)

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

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

            # Java logic to build the 'ingredients' string
            order_id = order_data['order_id']

            stmt = conn.cursor()
            menu_items = ""
            menu_items_query = f"""SELECT MENU_ITEMS.menu_item_name AS menu_items FROM ORDERS
                                    JOIN ORDER_ITEMS ON ORDERS.order_id = ORDER_ITEMS.order_id
                                    JOIN MENU_ITEMS ON ORDER_ITEMS.menu_item_id = MENU_ITEMS.menu_item_id
                                    WHERE ORDERS.order_id = %s;"""
            stmt.execute(menu_items_query, (order_id,))
            results = stmt.fetchall()

            for result in results:
                menu_items += result[0] + ", "

            order_data['menu_items'] = menu_items
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

@manager_BP.route('/get_employee_list', methods=['POST'])
def get_employee_list():

    employee_info_query = f"SELECT * FROM EMPLOYEE;"
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
    employee = request.get_json()

    employee_data = employee[0]
    last_name = employee_data['LastName']
    first_name = employee_data['FirstName']
    salary  = employee_data['Salary']
    hours_per_week  = employee_data['Hours']
    manager_id  = employee_data['ManagerID']

    add_employee_query = f"INSERT INTO EMPLOYEE(last_name, first_name, salary, hours_per_week, manager_id) VALUES (%s, %s, %s, %s, %s);"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(add_employee_query, (last_name, first_name, salary, hours_per_week, manager_id,))
        conn.commit()
        conn.close()
        return jsonify("Employee Added (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Add Employee'}), 500

@manager_BP.route('/remove_employee', methods=['POST'])
def remove_employee():
    employee = request.get_json()

    employee_data = employee[0]
    employee_id = employee_data['EmployeeID']

    add_employee_query = f"DELETE FROM EMPLOYEE where employee_id = %s;"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(add_employee_query, (employee_id,))
        conn.commit()
        conn.close()
        return jsonify("Employee Removed (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Remove Employee'}), 500

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
    
@manager_BP.route('/add_menu_item', methods=['POST'])
def add_menu_item():
    menu_item = request.get_json()  #Use const [addMenuItem, setMenuItem] = useState([ {menu_item_name: '', price: '', isCustomizable: '', ingredients: []} ]);

    menu_item_data = menu_item[0]
    menu_item_name = menu_item_data['menu_item_name']
    price = menu_item_data['price']
    isCustomizable  = menu_item_data['isCustomizable']
    ingredients = menu_item_data.get('ingredients', [])

    add_menu_item_query = f"INSERT INTO MENU_ITEMS(menu_item_name, price, isCustomizable) VALUES (%s, %s, %s) RETURNING menu_item_id;"
    get_ingredient_id = f"SELECT ingredient_id FROM INVENTORY WHERE INVENTORY.name = %s;"
    add_menu_item_ingredients = f"INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id) VALUES (%s);"

    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(add_menu_item_query, (menu_item_name, price, isCustomizable,))
        menu_item_id = cursor.fetchone()[0]

        for ingredient in ingredients:
            #Get Ingredient Id
            cursor.execute(get_ingredient_id, (ingredient,))
            ingredient_id = cursor.fetchone()[0]
            #Add Ingredients to Menu item
            cursor.execute(add_menu_item_ingredients, (menu_item_id, ingredient_id,))

        conn.commit()
        conn.close()
        return jsonify("Menu Item Added (From Backend)")
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Add Menu Item'}), 500

@manager_BP.route('/remove_menu_item', methods=['POST'])
def remove_menu_item():
    menu_item = request.get_json()  #Use const [removeMenuItem, setMenuItem] = useState([ {menu_item_name: ''}]);

    menu_item_data = menu_item[0]
    menu_item_name = menu_item_data['menu_item_name']

    get_menu_item_id = f"SELECT menu_item_id FROM MENU_ITEMS WHERE menu_item_name= %s"
    delete_menu_item_ingredients = f"DELETE FROM MENU_ITEM_INGREDIENTS WHERE menu_item_id = %s;"
    delete_menu_item = f"DELETE FROM MENU_ITEMS where menu_item_id = %s;"

    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(get_menu_item_id, (menu_item_name,))
        menu_item_id = cursor.fetchone()[0]

        if menu_item_id:
            menu_item_id = menu_item_id[0]

            cursor.execute(delete_menu_item_ingredients, (menu_item_id,))
            cursor.execute(delete_menu_item, (menu_item_id,))

            conn.commit()
            conn.close()
            return jsonify("Menu Item Deleted (From Backend)")
        
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Remove Menu Item'}), 500