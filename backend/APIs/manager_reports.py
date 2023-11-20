from flask import Blueprint, jsonify, request
import psycopg2 
from collections import defaultdict, OrderedDict
from typing import List, Tuple
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
        sorted_dict = OrderedDict(sorted(pair_frequency_map.items(), key=lambda item: (item[1], item[0]), reverse=True))

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

    query = f"SELECT MENU_ITEMS.menu_item_name, COUNT(*) AS menu_items FROM ORDERS JOIN ORDER_ITEMS ON ORDERS.order_id = ORDER_ITEMS.order_id JOIN MENU_ITEMS ON ORDER_ITEMS.menu_item_id = MENU_ITEMS.menu_item_id WHERE ORDERS.date >= '{start_date}' AND ORDERS.date <= '{end_date}' GROUP BY MENU_ITEMS.menu_item_name ORDER BY menu_items DESC;"
    
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

@reports_BP.route('/get_restock_report', methods = ['POST'])
def get_restock_report():
    # dates = request.get_json()
    # start_date = dates['startDate']
    # end_date = dates['endDate']

    query = f"""SELECT name, quantity, threshold
                FROM inventory
                WHERE quantity < threshold;"""

    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        # cursor.execute(query, (start_date, end_date,))
        cursor.execute(query,)
        results = cursor.fetchall()

        restock_report = []
        for result in results:
            name, quantity, threshold = result
            restock_report.append({
                # "ingredient_id": ingredient_id,
                "name": name,
                "quantity": quantity,
                "threshold": threshold
            })

        conn.close()
        return jsonify({"restock_report": restock_report})

    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to generate Restock Report'}), 500


@reports_BP.route('/get_excess_report', methods = ['POST'])
def get_excess_report():
    try:
        dates = request.get_json()
        start_date = dates['startDate']
        end_date = dates['endDate']

        query = f"""WITH ingredient_sales AS (
                        SELECT
                            mi.ingredient_id,
                            i.name AS ingredient_name,
                            SUM(CASE WHEN oi.menu_item_id IS NOT NULL THEN oi.quantity ELSE 0 END) AS amount_sold,
                            i.quantity AS current_quantity
                        FROM
                            menu_item_ingredients mi
                        INNER JOIN
                            inventory i ON mi.ingredient_id = i.ingredient_id
                        LEFT JOIN
                            order_items oi ON mi.menu_item_id = oi.menu_item_id
                        LEFT JOIN
                            orders o ON oi.order_id = o.order_id
                        WHERE
                            o.date >= '{start_date}'
                        GROUP BY
                            mi.ingredient_id, i.name, i.quantity
                    )
                    SELECT
                        ingredient_name,
                        amount_sold,
                        current_quantity
                    FROM
                        ingredient_sales
                    WHERE
                        (amount_sold * 10) < current_quantity + amount_sold;"""

        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(query, (start_date,))
        results = cursor.fetchall()

        excess_report = []
        for result in results:
            ingredient_name, amount_sold, current_quantity = result
            excess_report.append({
                "ingredient_name": ingredient_name,
                "amount_sold": amount_sold,
                "current_quantity": current_quantity
            })

        conn.close()
        return jsonify({"excess_report": excess_report})

    except:
        print(e)
        return jsonify({'error': 'Failed to generate Excess Report'}), 500

