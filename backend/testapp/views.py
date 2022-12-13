

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core import serializers
from .models import *
from mainapp.models import *
from mainapp.serializers import *
from .serializers import *
import json
from rest_framework import generics
import os
import subprocess
import unittest
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from copydetect import CopyDetector
from django.http import JsonResponse

def execute(code):
    py = open('temp.txt','w')
    py.write(code)
    py.close()

    
    os.rename('temp.txt','solution.py')
    out = subprocess.run(['python3', 'solution.py'],capture_output=True)
    print(out.stdout)
    print("debug")
    if(out.stderr):
        return_data = out.stderr.decode('utf-8').split('line')[-1]
        line = out.stderr.decode('utf-8').split('line')[-1][1]
        return_data = "1&"+ line+ "& line" + return_data 
    else:
        return_data = out.stdout.decode('utf-8')
        print(return_data)
        return_data = "0&" + return_data
    os.remove('solution.py') 
    data = {'code':return_data}
    return data
            
def testcase(answer, user, testcase):
        
    def excute_testcase(code, type, testcase):
        py = open('temp.txt','w')
        py.write(code)
        py.close()
        os.rename('temp.txt','solution.py')

        sh = open('temp.txt','w')

        sh.write('python3 main2.py '+testcase)

        sh.close()
        os.rename('temp.txt','temp.sh')
                    
        out = os.system(f'sh temp.sh > result_{type}.txt')
        os.remove('temp.sh')
    
    if ("*" in testcase):
        testcase1 = testcase.split("*")
        testcase2 = testcase1[-1].split("&")
            
        o_testcase = [tc for tc in testcase1[:-1]] + [testcase2[0]]
        h_testcase = [testcase2[i+1] for i in range(len(testcase2)-1)]     

    else:
        testcase = testcase.split("&")
        
        o_testcase = testcase[0]
        h_testcase = testcase[1]
    
    ots = []
    hts = []
    msg = ""
    pf = ""
    
    for idx, ot in enumerate(o_testcase):
        excute_testcase(answer, 'answer', ot)
        excute_testcase(user, 'my', ot)
        out = subprocess.run(['diff','result_answer.txt','result_my.txt'], capture_output=True)
        print(out)
        if (out.stderr):
            return_data = out.stderr.decode('utf-8')
        else:
            return_data = out.stdout.decode('utf-8')
            print(return_data)
            if(return_data==""):
                ots.append(1)
            else:
                ots.append(0)
                line1 = return_data.split('\n')[1][2:]
                line2 = return_data.split('\n')[-2][2:]
                return_data = f'The open testcase {idx+1}, correct answer is {line1} but user answer is {line2}.\n'
                if line1 == line2:
                    pf += "통과\n"
                else:
                    pf += "실패\n"
                msg += return_data
    
    msg += "&"
    pf += "&"

    for idx, ht in enumerate(h_testcase):
        excute_testcase(answer, 'answer', ht)
        excute_testcase(user, 'my', ht)
        out = subprocess.run(['diff','result_answer.txt','result_my.txt'], capture_output=True)
        
        if(out.stderr):
            return_data = out.stderr.decode('utf-8')
        else:
            return_data = out.stdout.decode('utf-8')
            if return_data == "":
                hts.append(1)
                pf += "통과\n"
            else:
                return_data = f'The hidden testcase {idx+1} is not identical.\n'
                msg += return_data
                hts.append(0)
                pf += "실패\n"

        

    return {'score':f'{(sum(ots)+sum(hts))/(len(ots)+len(hts))*100}', 'msg':f'{msg}', 'pf':f'{pf}'}
    
def evaluate(code):
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    print(code)
    os.rename('temp.txt','solution.py')
    exit_code, console_result = subprocess.getstatusoutput("multimetric solution.py")
    print("exit: ",exit_code)
    print("console: ",console_result)
    json_result = json.loads(console_result)
    e_score1 = json_result['overall']['pylint']
    e_score2 = json_result['overall']['halstead_timerequired']
    os.remove('solution.py') 
    return {'e_score1':e_score1,'e_score2':e_score2}
    
class ExecuteCodeV1API(APIView):
    def get_object(self,user_id,question,save_type):
        try:
            return ExecuteCodeV1.objects.get(user_id=user_id, question=question, save_type=save_type)
        except ExecuteCodeV1.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','save_type':'1','exe_result':'line 1 : assertion error'}
            return test_data #Http404
    
    #내용 추가
    def post(self,request):
        
        serializer = ExecuteCodeV1Serializer(data=request.data)
        
        if serializer.is_valid():
            
            user_id = serializer.data['user_id']
            question = serializer.data['question']
            save_type = serializer.data['save_type']
            exe_result = execute(serializer.data['exe_result'])
            
            savecode = self.get_object(user_id, question, save_type)
            
            savecode['user_id'] = user_id
            savecode['question'] = question
            savecode['save_type'] = save_type
            savecode['exe_result'] = exe_result
            
            savecode_sericalizer = ExecuteCodeV1Serializer(savecode)
            
            return Response(savecode_sericalizer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 현재 에디터에 있는 코드 바로 실행
class ExecuteCodeV2API(APIView):
    def get(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.GET)
        if serializer.is_valid():
            codedata = execute(serializer.data.get('code'))
            codedata_serializer = ExecuteCodeV2Serializer(codedata)
            return Response(codedata_serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# 현재 에디터에 있는 코드 테스트 케이스 실행
class CheckTestcaseAPI(APIView):
    def get_object(self,question):
        try:
            return Question.objects.get(pk=question)
        except Question.DoesNotExist:
            test_data = {"question":"프기실_week3","course":"프기실","skeleton":"import numpy as np",
                "answer":"print(2)", "testcase":"1 2 1*4 5 0*7 8 9&3 3 3&4 4 4&5 5 0", "reference": "잘 풀어봐요", "duedate": "2022-11-17 23:59:59"
            }
            return test_data #Http404
            
    def get(self, request):
        question = request.GET['question']
        code = request.GET['code']
        question_object = self.get_object(question)
        try:
            tc = question_object.testcase
            answer = question_object.answer
        except:
            tc = question_object['testcase']
            answer= question_object['answer']
    
        result = testcase(answer, code, tc)
        codedata_serializer = CheckTestcaseSerializer(result)
        return Response(codedata_serializer.data)

# 현재 에디터에 있는 코드 가져와서 효율 채점하기
class EvaluateCodeAPI(APIView):
    def get(self,request):
        #code = request.data.get('code')
        code = request.GET['code']
        codedata = evaluate(code)
        print(codedata)
        codedata_serializer = EvaluateCodeSerializer(codedata)
        return Response(codedata_serializer.data)
    def delete(self, request):
        print("")


class CheckPlagiarismAPI(APIView):
    def post(self, request):
        ref_dir = "testapp"
        code = request.data.get('code')
        detector = CopyDetector(ref_dirs=[ref_dir], boilerplate_dirs=[ref_dir], extensions=["py"], display_t=0.5)
        f=open("test.py", 'w')
        code = str(code)
        f.write(code)
        f.close()
        detector.add_file("test.py")
        detector.run()
        os.remove("test.py")
        return JsonResponse({"score":detector.similarity_matrix[0][0][0]})

class CheckReadabilityAPI(APIView):
    
    def analyze(self,code):
        mypy_score = 20
        pylint_score = 20
        eradicate_score = 20
        radon_score = 20
        pycodestyle_score = 20

        try:
            user_code = open("./user_code.py",'w')
            user_code.write(code)
            user_code.close()
        except IOError:
            raise AssertionError

        os.system("pylama ./user_code.py > result.txt")

        read_code = open("./result.txt",'r')

        ret_data = {"score":"","comment":""}
        score = {"mypy":0,"pylint":0,"eradicate":0,"radon":0,"pycodestyle":0}
        comment = {"mypy":[],"pylint":[],"eradicate":[],"radon":[],"pycodestyle":[]}

        lines = read_code.readlines()
        for line in lines:
            res = ""
            words = line.split()
            if words[-1]=="[mypy]":
                for word in words[2:-1]:
                    res += word + " "
                mypy_score -= 1
            elif words[-1]=="[pylint]":
                for word in words[2:-1]:
                    res += word + " "
                pylint_score -= 1
            elif words[-1]=="[eradicate]":
                for word in words[2:-1]:
                    res += word + " "
                eradicate_score -= 1
            elif words[-1]=="[radon]":
                for word in words[2:-1]:
                    res += word + " "
                radon_score -= 1
            elif words[-1]=="[pycodestyle]":
                for word in words[2:-1]:
                    res += word + " "
                pycodestyle_score -= 1

            res += '\n'
            words[-1] = words[-1][1:-1]
            comment[words[-1]].append(res)
        
        read_code.close()
        os.remove("./user_code.py")
        os.remove("./result.txt")

        if mypy_score < 0:
            mypy_score = 0
        if pylint_score < 0:
            pylint_score = 0
        if eradicate_score < 0:
            eradicate_score = 0
        if radon_score < 0:
            radon_score = 0
        if pycodestyle_score < 0:
            pycodestyle_score = 0

        score['mypy'] = mypy_score
        score['pylint'] = pylint_score
        score['eradicate'] = eradicate_score
        score['radon'] = radon_score
        score['pycodestyle'] = pycodestyle_score

        ret_data['score'] = score
        ret_data['comment'] = comment

        return ret_data
    
    def concatString(self,lines):
        ret = ""
        for line in lines:
            ret += line
        return ret

    def post(self,request):
        
        user_code = request.data.get('code')
        data = self.analyze(user_code)
        data['comment']['mypy'] = self.concatString(data['comment']['mypy'])
        data['comment']['pylint'] = self.concatString(data['comment']['pylint'])
        data['comment']['eradicate'] = self.concatString(data['comment']['eradicate'])
        data['comment']['radon'] = self.concatString(data['comment']['radon'])
        data['comment']['pycodestyle'] = self.concatString(data['comment']['pycodestyle'])
        return Response(data,status=status.HTTP_201_CREATED)
