from crypt import methods
from gc import collect
import pymongo
from flask import *


f = open("mongokey", "r")
tempstring = f.readline()
client = pymongo.MongoClient(tempstring)
db = client.member_system
f.close()
print("database has build successfully!")


app = Flask(__name__, static_folder="public", static_url_path="/")
#setting session key
app.secret_key = "nozomizore_is_the_best"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/member")
def member():
    if "nickname" in session:
        return render_template("member.html")
    else:
        return redirect ("/")

@app.route("/error")
def error():
    message = request.args.get("msg", "error occurred, please contact customer service")
    return render_template("error.html", message=message)

@app.route("/signup", methods=["POST"])
def signup():
    nickname = request.form["nickname"]
    email = request.form["email"]
    password = request.form["password"]
    
    collection = db.user
    result = collection.find_one({
        "email": email
    })
    if result != None:
        return redirect("/error?msg=email_has_been_registered")
    collection.insert_one({
        "nickname": nickname,
        "email": email,
        "password": password
    })
    return redirect("/")

@app.route("/signin", methods=["POST"])
def signin():
    email = request.form["email"]
    password = request.form["password"]
    
    collection = db.user
    result = collection.find_one({
        "$and": [
            {"email": email},
            {"password": password}
        ]
    })
    if result == None:
        return redirect("/error?msg=accout or password error")
    session["nickname"] = result["nickname"]
    return redirect("/member")

@app.route("/signout")
def signout():
    del session["nickname"]
    return redirect("/")

@app.route("/test")
def test():
    pass

@app.route("/test2")
def test2():
    pass

app.run()
