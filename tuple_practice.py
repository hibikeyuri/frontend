word = "echo"
t = ()
count = 3

for i in range(count):
    if(i+1 > len(word)):
        print("out bound of words")
    else:
        tempword = (word[i+1:],)
        for i in range(count):
            t += tempword

print(t)