from flask import Flask
from flask import request
from flask import render_template


app = Flask(__name__, static="public", static_url="")

@app.route("/")
def index():
    return render_template("index", name="something")
    return "Hello Flask"

def test():
    pass

app.run()