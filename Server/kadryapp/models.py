from django.db import models

class Test(models.Model): 
    title = models.CharField(max_length = 200) 
    title2 = models.CharField(max_length = 200) 
