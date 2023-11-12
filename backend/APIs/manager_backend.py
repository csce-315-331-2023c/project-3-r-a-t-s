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

@manager_BP.route('/get_order_history')
def get_order_history():
    return 'Manager Order History'

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

        cursor.close()
        conn.close()

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)})
