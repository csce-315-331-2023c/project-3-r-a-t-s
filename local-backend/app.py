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


#######################################################################################

# from flask import Flask
# from flask.helpers import send_from_directory
# from flask_cors import CORS, cross_origin

# app = Flask(__name__, static_folder='../pos/build')
# CORS(app)
# @app.route("/api", methods=["GET", "POST"])
# @cross_origin()
# def index():
#     return {
#         "message": "Howdy there, World!"
#     }

# @app.route('/')
# @cross_origin()
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')


# if __name__ == "__main__":
#     app.run(debug=True)

#######################################################################################

import datetime
import math
import random
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__, static_folder='../pos/build')
CORS(app)

def get_menu_item_id(item_name, cur):
    cur.execute("SELECT menu_item_id FROM MENU_ITEMS WHERE menu_item_name = %s", (item_name,))
    return cur.fetchone()[0]

def reduce_inventory_for_menu_item(cur, menu_item_name):
    # Fetch required ingredients and their current quantities in the inventory
    sql_fetch_ingredients = """
        SELECT i.ingredient_id, i.quantity AS inventory_quantity
        FROM MENU_ITEMS mi
        JOIN MENU_ITEM_INGREDIENTS mii ON mi.menu_item_id = mii.menu_item_id
        JOIN INVENTORY i ON mii.ingredient_id = i.ingredient_id
        WHERE mi.menu_item_name = %s
    """
    cur.execute(sql_fetch_ingredients, (menu_item_name,))
    ingredients = cur.fetchall()

    for ingredient in ingredients:
        ingredient_id = ingredient[0]
        inventory_quantity = ingredient[1]

        # Update the inventory quantity by reducing it by 1
        sql_update_inventory = """
            UPDATE INVENTORY SET quantity = %s WHERE ingredient_id = %s
        """
        cur.execute(sql_update_inventory, (inventory_quantity - 1, ingredient_id))



@app.route("/api", methods=["GET", "POST"])
@cross_origin(methods=["GET", "POST"])
def index():
    try:
        DATABASE_URL = "dbname='csce315_904_01db' user='csce315_904_01user' host='csce-315-db.engr.tamu.edu' password='STAR'"
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        data = request.json
        current_order = data.get('order', [])

        employeeId = int(random.random() * 4) + 1  # Random int between 1 to 4 inclusive
        orderTotal = random.uniform(80, 120) # Random double between 80 to 120


        cur.execute(
            "INSERT INTO orders (employee_id, order_total, date) VALUES (%s, %s, %s) RETURNING order_id",
            (employeeId, orderTotal, datetime.datetime.now())
        )
        order_id = cur.fetchone()[0]

        for item in current_order:
            
            menu_item_id = get_menu_item_id(item, cur)
            cur.execute(
                "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (%s, %s, %s)",
                (order_id, menu_item_id, 1)
            )

            reduce_inventory_for_menu_item(cur, item)

        conn.commit()
        cur.close()
        conn.close()

        response = jsonify({"message": "success"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
