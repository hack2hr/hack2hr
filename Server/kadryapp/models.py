from djongo import models

class Coll(models.Model):
    _id = models.ObjectIdField()
    ids = models.CharField(max_length=255)
    headline = models.CharField(max_length=255)    
