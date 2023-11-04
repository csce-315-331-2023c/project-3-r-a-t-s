
# Set up a virtual environment
source tvenv/Scripts/activate

# Install project dependencies
pip install -r requirements.txt

# Install Gunicorn
pip install gunicorn

# Deactivate the virtual environment
deactivate

# Build steps complete
