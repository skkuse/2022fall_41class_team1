from django.contrib import admin
from mainapp.models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Question)
admin.site.register(UserData)
admin.site.register(Course)
admin.site.register(Chat)
admin.site.register(Submission)