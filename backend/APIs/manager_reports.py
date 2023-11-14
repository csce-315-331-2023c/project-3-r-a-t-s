from flask import Blueprint, jsonify, request
import psycopg2 
from collections import defaultdict
from tkinter import ttk
from typing import List, Tuple
from tkinter import messagebox
from datetime import date


reports_BP = Blueprint('manager_reports', __name__)

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@reports_BP.route('/WhatSellsTogether', methods = ['POST'])
def WhatSellsTogether():
    dates = request.get_json()
    start_date = dates['startDate']
    end_date = dates['endDate']

    start_datetime = f"{start_date} 00:00:00"
    end_datetime = f"{end_date} 23:59:59"

    pairs_query = f"""SELECT mi1.menu_item_name AS item1, mi2.menu_item_name AS item2
                        FROM ORDER_ITEMS o1
                        JOIN ORDERS ord1 ON o1.order_id = ord1.order_id
                        JOIN ORDER_ITEMS o2 ON o2.order_id = ord1.order_id
                        JOIN MENU_ITEMS mi1 ON o1.menu_item_id = mi1.menu_item_id
                        JOIN MENU_ITEMS mi2 ON o2.menu_item_id = mi2.menu_item_id
                        WHERE ord1.date >= %s AND ord1.date <= %s
                        AND o1.menu_item_id < o2.menu_item_id;"""

    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(pairs_query, (start_datetime, end_datetime,))
        results = cursor.fetchall()

        # Process pairs of menu items
        pair_frequency_map = defaultdict(int) 

        for row in results: #Iterates through pairs in results
            item1, item2 = row 
            pair = f"{item1} - {item2}"
            pair_frequency_map[pair] += 1 #{pair}:count

        # Sort pairs by frequency
        sorted_dict = dict(sorted(pair_frequency_map.items(), key=lambda item: item[1], reverse=True))

        conn.close()
        return jsonify(sorted_dict)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Generate Whats Sells Together Report'}), 500
    

@reports_BP.route('/get_product_report', methods = ['POST'])
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