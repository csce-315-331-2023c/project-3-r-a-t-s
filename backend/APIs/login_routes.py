from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
import psycopg2

login_BP = Blueprint('login_routes', __name__)

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@login_BP.route('/check_cashier_login', methods=['POST'])
def check_cashier_login():
    login_info = request.get_json()

    username = login_info['username']
    password = login_info['password']

    check_user_query = f"SELECT COUNT (*) FROM EMPLOYEE where username=%s and password=%s;"
    name_user_query = f"SELECT first_name FROM EMPLOYEE where username=%s and password=%s;"
    try: 
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()

        cursor.execute(check_user_query, (username, password,))
        count = int(cursor.fetchone()[0])
        current_app.logger.info("Count: %s", count)

        if (count != 0) :
            cursor.execute(name_user_query, (username, password,))
            name_user = str(cursor.fetchone()[0])

            response_data = {
            'message': 'Cashier Login Successful',
            'name_of_user' : name_user,
            }
            return jsonify(response_data)
        else :
            response_data = {
            'message': 'Cashier Login Unsuccessful',
            }
            return jsonify(response_data)

    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Verify User Login'}), 500
