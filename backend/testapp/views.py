from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core import serializers
from .models import *
from mainapp.models import *
from mainapp.serializers import *
from .serializers import *
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

def execute(code):
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    os.rename('temp.txt','temp.py')
    out = subprocess.run(['python', 'temp.py'],capture_output=True)
    if(out.stderr):
        return_data = out.stderr.decode('utf-8').split(',')[-1]
    else:
        return_data = out.stdout.decode('utf-8')
    os.remove('temp.py') 
    data = {'code':return_data}
    return data

def excute_testcase(code, type, testcase):
        
    py = open('temp.txt','w')
    py.write(code)
    py.close()
    os.rename('temp.txt','solution.py')

    sh = open('temp.txt','w')
    sh.write('python main2.py '+testcase)
    sh.close()
    os.rename('temp.txt','temp.sh')
                
    out = os.system(f'sh temp.sh > result_{type}.txt')
    os.remove('temp.sh')
            
def testcase(answer, user, testcase):
        
    print(answer)
    print(user)
    
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
    msg = []
    
    for idx, ot in enumerate(o_testcase):
        excute_testcase(answer, 'answer', ot)
        excute_testcase(user, 'my', ot)
        out = subprocess.run(['diff','result_answer.txt','result_my.txt'], capture_output=True)
        
        if (out.stderr):
            return_data = out.stderr.decode('utf-8')
        else:
            return_data = out.stdout.decode('utf-8')
            if(return_data==""):
                ots.append(1)
            else:
                ots.append(0)
                line1 = return_data.split('\n')[1][-1]
                line2 = return_data.split('\n')[-2][-1]
                return_data = f'In the {idx} line, correct answer is {line1} but user answer is {line2}. (open case)'
                msg.append(return_data)
        
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
            else:
                return_data = f'The {idx} line is not identical. (hidden case)'
                msg.append(return_data)
                hts.append(0)
                    
    return {'score':f'{(sum(ots)+sum(hts))/(len(ots)+len(hts))*100}', 'msg':f'{msg}'}
    
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
        serializer = ExecuteCodeV2Serializer(data=request.data)
        if serializer.is_valid():
            codedata = execute(serializer.data['code'])
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

        question = request.data.get('question')
        code = request.data.get('code')
        '''
        code = '\n'
        
        for line in open('code1','r').readlines():
            code = code + line
        '''
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

class EvaluateCodeAPI(APIView):
    def get_object(self, user_id, question):
        try:
            return EvaluateCode.objects.get(user_id=user_id, question=question)
        except EvaluateCode.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','score':'20','msg' :'In the line 0, correct answer is 10 but user answer is 30'}
            return test_data
    
    def get(self, request):
        print("")