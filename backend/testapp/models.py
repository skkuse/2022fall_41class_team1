from email.policy import default
from django.db import models
from jsonfield import JSONField
from mainapp.models import User, Question

# Create your models here.

class ExecuteCodeV1(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question')
    save_type = models.CharField(max_length=1) # type 1,2,3 -> 요거 까지 key로 하는법?
    exe_result = models.TextField()
    
    def __str__(self):
        return "Execute result of " + self.user_id + "\'s " + self.save_type + "th save " + self.question + " code"

class ExecuteCodeV2(models.Model):
    code = models.TextField()
    
class CheckTestcase(models.Model):
    score = models.CharField(max_length=10)
    msg = models.TextField() # test case 정보 제공.
    
class EvaluateCode(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, db_column='question')
    plagiarism = models.TextField()
    function = models.TextField()
    efficiency = models.TextField()
    readability = models.TextField()
    
    def __str__(self):
        return "Evaluate result of "+ self.user_id + "\'s " + self.question + " code"