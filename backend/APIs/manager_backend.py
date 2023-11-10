from flask import Blueprint 

manager_BP = Blueprint('manager', __name__)

@manager_BP.route('/get_order_history')
def get_order_history():
    return 'Manager Order History'