from django.db import models
from mainapp.models import *

class Save(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,db_column='user_id')
    question = models.ForeignKey(Question,on_delete=models.CASCADE,db_column='question')
    count = models.IntegerField()
    code = models.TextField()