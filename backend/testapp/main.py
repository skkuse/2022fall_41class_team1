from solution import solution
import sys

def main():
    
    total_argv = len(sys.argv)
    
    start_string = 'solution('
    for i in range(1,total_argv-1):
        start_string += f'{sys.argv[i]} ,'
    start_string += f'{sys.argv[i+1]})'
    
    print(eval(start_string))

if __name__ == "__main__":
    main()