from flask import Flask, Blueprint, jsonify, request, redirect, url_for, session
from authlib.integrations.flask_client import OAuth
import psycopg2
from time import time
import random

login_BP = Blueprint('login_routes', __name__)

DB_PARAMS = {
    'dbname': 'csce315_904_01db', 
    'user': 'csce315_904_01user',
    'password': 'STAR',
    'host': 'csce-315-db.engr.tamu.edu',
}

@login_BP.route('/check_cashier_login', methods=['POST'])
def check_cashier_login():
    """
    Checks the login credentials for a cashier against the database.

    :return: JSON response indicating the success or failure of the login attempt.
    """
    
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


@login_BP.route('/check_if_employee', methods=['POST'])
def check_if_employee():
    """
    Checks if user is an employee.

    :return: JSON response indicating if user is employee.
    """
    email_data = request.get_json()
    print("Email: ", email_data)

    verify_query = f"SELECT employee_id FROM EMPLOYEE where email = %s;"
    # Execute the query
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        cursor = conn.cursor()
        cursor.execute(verify_query, (email_data,))
        verify_result = cursor.fetchone()
        employee_id = verify_result[0]  # Extract the employee_id from the result

        if (employee_id):
            verify_status = 'Yes'
        else:
            verify_status = 'No'

        conn.commit()
        conn.close()
        print("Verify Status", verify_status)

        response_data = {
            'message': 'Verification Completed (From Backend)',
            'isEmployee': verify_status
        }
        return jsonify(response_data)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to Check If Employee Found'}), 500