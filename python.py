dep = input("Enter the Department\n")
s = dep
sem = input("Enter no the Semester\n")
nos = int(sem)
s = s +" =[sem"+sem
for j in range(int(sem)):
    s = s+"["
    nosub= int(input("Enter no of subjects\n"))
    for i in range(nosub):
        sub = input("Enter the subject\n")
        credit = input("Enter the credit\n")
        s = s + "{"+ sub + ":" + credit 
        if(nosub>1):
            s = s+"},"
            nosub-=1
        else:
            s = s+"}"
    if(nos>1):
        s = s[:len(s)-1]+"],"
        nos -=1
    else:
        s +="]"
print(s+"]")