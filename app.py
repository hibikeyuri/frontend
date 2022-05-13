from flask import Flask
from flask import request
from flask import render_template
from flask import session


app = Flask(__name__, static_folder="public", static_url_path="/")
#setting session key
app.secret_key = "nozomizore_is_the_best"

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/page")
def page():
    return render_template("page.html")

@app.route("/show", methods=["POST"])
def show():
    name = request.args.get("n", "")
    return "Hello Flask " + name

@app.route("/calculate", methods=["POST"])
def calculate():
    #digit = request.args.get("max", "")
    digit = request.form["max"]
    digit = int(digit)
    result = 0
    for i in range(1, digit+1):
        result += i
    #return "result is: " + str(result)
    return render_template("result.html", data=result)

@app.route("/hello")
def hello():
    name = request.args.get("name", "")
    session["username"] = name #session["field name"] = data
    return "welcome, " + name

@app.route("/talk")
def talk():
    name = session["username"]
    return name + ", Nice to meet you!"

app.run()