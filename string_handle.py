

a = input("input your full name: ")
def string_handle(inputstring):
    end, front = inputstring.split()
    print(front.capitalize() + ", " + end.capitalize())
    print(front.upper()+ ", " + end.capitalize())
    print(front.upper()+ ", " +end.upper())

string_handle(a)