import os
import subprocess
import unittest

def excute(code):
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    os.rename('temp.txt','temp.py')
    out = subprocess.Popen(['python','temp.py'], stdout=subprocess.PIPE).stdout  
    return_data = out.read().strip()
    out.close()
    os.remove('temp.py') 
    return return_data

class MyTests(unittest.TestCase):
    def __init__(self, true_result, my_result):
        super(MyTests, self).__init__()
        self.true_result = true_result
        self.my_result = my_result
        
    def test(self):
        if type('s') != type(self.my_result):
            my_result = f'{self.my_result}'
        result = self.assertEqual(self.true_result, my_result)
        return result