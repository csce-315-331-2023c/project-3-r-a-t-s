from flask import Flask, Blueprint
from flask_cors import CORS
from APIs.manager_backend import manager_BP
from APIs.cashier_backend import cashier_BP
from APIs.manager_reports import reports_BP
from APIs.login_routes import login_BP
from flask import Flask, redirect, url_for, flash, request, session, abort
from flask_dance.contrib.google import make_google_blueprint, google
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
import pathlib

app = Flask(__name__)
CORS(app)
# CORS(app, origins = 'https://project-3-r-a-t-s.vercel.app')

app.secret_key = 'ThisIsSecretKey'
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = "637566929389-vsccqb12khhu5b72l1ut2vu9d9ca7st1.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

# Register the blueprints
app.register_blueprint(manager_BP, url_prefix="/api/manager")
app.register_blueprint(cashier_BP, url_prefix="/api/cashier")
app.register_blueprint(reports_BP, url_prefix="/api/manager_reports")
app.register_blueprint(login_BP, url_prefix="/api/login_routes")


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper

@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    token_request = google.auth.transport.requests.Request()

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    # Use JavaScript to close the popup window
    close_popup_script = """
        <script>
            window.opener.postMessage('google-auth-success', '*');
            window.close();
        </script>
    """
    return close_popup_script
    
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == '__main__':
    #app.run()
    app.run(debug=True)
