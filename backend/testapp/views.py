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
from copydetect import CopyDetector

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
    return return_data
            
def testcase(answer, user, testcase):
    
    def excute_testcase(code, type, testcase):
        
        py = open('temp.txt','w')
        py.write(code)
        py.close()
        os.rename('temp.txt','solution.py')

        sh = open('temp.txt','w')
        sh.write('python main.py '+testcase)
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
    
    os.remove('result_answer.txt')
    os.remove('result_my.txt')
                    
    return {'t_score':(sum(ots)+sum(hts))/(len(ots)+len(hts))*100, 'msg':msg}
    
class ExecuteCodeV1API(APIView):
    def get_object(self,user_id,question,save_type):
        try:
            return ExecuteCodeV1.objects.get(user_id=user_id, quetsion=question, save_type=save_type)
        except ExecuteCodeV1.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','save_type':'1','exe_result':'line 1 : assertion error'}
            return test_data #Http404
    
    #내용 추가
    def post(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        if serializer.is_valid():
            serializer.exe_result = execute(serializer.exe_result)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #내용 조회
    def get(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        
        if serializer.is_valid():
            codedata = self.get_object(serializer.user_id, serializer.question, serializer.save_type)
            codedata_serializer = ExecuteCodeV1Serializer(codedata)
            return Response(codedata_serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제
    def delete(self,request):
        serializer = ExecuteCodeV1Serializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question
        save_type = serializer.save_type

        codedata = self.get_object(user_id,question,save_type)
        codedata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ExecuteCodeV2API(APIView):
    def get_object(self,user_id,question):
        try:
            return ExecuteCodeV2.objects.get(user_id=user_id, quetsion=question)
        except ExecuteCodeV2.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','exe_result':'line 1 : assertion error'}
            return test_data #Http404
    
    #내용 추가
    def post(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.data)
        if serializer.is_valid():
            serializer.exe_result = execute(serializer.exe_result)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #내용 조회
    def get(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.data)
        
        if serializer.is_valid():
            codedata = self.get_object(serializer.user_id, serializer.question)
            codedata_serializer = ExecuteCodeV2Serializer(codedata)
            return Response(codedata_serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #내용 삭제
    def delete(self,request):
        serializer = ExecuteCodeV2Serializer(data=request.data)
        user_id = serializer.user_id
        question = serializer.question

        codedata = self.get_object(user_id,question)
        codedata.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CheckTestcaseAPI(APIView):
    def get_object(self, user_id, question):
        try:
            return CheckTestcase.objects.get(user_id=user_id, question=question)
        except CheckTestcase.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','msg' :'In the line 0, correct answer is 10 but user answer is 30'}
            return test_data
    
    # 내용 확인
    def get(self, request):
        q_serializers = QuestionSerializer(data=request.data)
        serializer = CheckTestcaseSerializer(data=request.data)
        if q_serializers.is_valid():
            testcase = q_serializers.testcase
            answer = q_serializers.anwer
            result = testcase(answer, serializers.msg, testcase)
            serializer.msg = result['msg']
            serializer.score = result['score']
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvaluateCodeAPI(APIView):
    def get_object(self, user_id, question):
        try:
            return EvaluateCode.objects.get(user_id=user_id, question=question)
        except EvaluateCode.DoesNotExist:
            test_data = {'user_id':'jcy9911','question':'SWE3002-01','score':'20','msg' :'In the line 0, correct answer is 10 but user answer is 30'}
            return test_data
    
    def post(self, request):
        plagiarism = models.TextField()
        function = models.TextField()
        efficiency = models.TextField()
        readability = models.TextField()
        print("")
    
    def get(self, request):
        print("")
        
    def delete(self, request):
        print("")

class CheckPlagiarismAPI(APIView):
    def post(self, request):
        ref_dir = "testapp"
        code = request.data.get('code')
        detector = CopyDetector(ref_dirs=[ref_dir], boilerplate_dirs=[ref_dir], extensions=["py"], display_t=0.5)
        f=open("test.py", 'w')
        f.write(code)
        f.close()
        detector.add_file("test.py")
        detector.run()
        os.remove("test.py")
        return Response(detector.similarity_matrix[0][0][0])

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
        