from email.policy import default
from django.db import models
from jsonfield import JSONField
from mainapp.models import User, Course, Question, UserData

# Create your models here.

class ExecuteCodeV1(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question')
    # 다른 테이블에서 정보를 가져오는법?
    save_type = models.CharField(max_length=1) # type 1,2,3 -> 요거 까지 key로 하는법?
    exe_result = models.TextField()
    
    def __str__(self):
        return "Execute result of " + self.user_id + "\'s " + self.save_type + "th save " + self.question + " code"

class ExecuteCodeV2(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question')
    exe_result = models.TextField()
    
    def __str__(self):
        return "Execute result of " + self.user_id + "\'s " + self.question + " code"
    
class CheckTestcase(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question')
    tc_result1 = models.TextField()
    tc_result2 = models.TextField()
    tc_result3 = models.TextField()
    
    def __str__(self):
        return "Testcase execution result of " + self.user_id + "\'s " + self.question + " code"
    
