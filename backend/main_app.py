from flask import Flask
from flask_cors import CORS
from APIs.manager_backend import manager_BP
from APIs.cashier_backend import cashier_BP
from APIs.manager_reports import reports_BP

app = Flask(__name__)

# CORS(app)
CORS(app, origins = 'https://project-3-r-a-t-s.vercel.app')

# Register the blueprints
app.register_blueprint(manager_BP, url_prefix="/api/manager")
app.register_blueprint(cashier_BP, url_prefix="/api/cashier")
app.register_blueprint(reports_BP, url_prefix="/api/manager_reports")

if __name__ == '__main__':
    #app.run()
    app.run(debug=True)
