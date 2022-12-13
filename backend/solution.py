def solution(add1, add2, add3):
    sum = add1 + add2 + add3*10
    sum = sum + 1
    return sum

if __name__ == "__main__":
    print(solution(1, 2, 3))