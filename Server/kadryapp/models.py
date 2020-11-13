from djongo import models



class People(models.Model):
    id = models.CharField(max_length=255)
    year = models.CharField(max_length=255)
    Total = models.CharField(max_length=255)
    PeopleData = models.EmbeddedField(
        model_container=PeopleData
    )

class PeopleData(models.Model):
    WorkAble = models.CharField(max_length=255)
    Migrant = models.CharField(max_length=255)
    PeopleOldAndYoung = models.EmbeddedField(
        model_container=OldAndYoung
    )  

class PeopleOldAndYoung(models.Model):
    Old = models.CharField(max_length=255)
    Young = models.CharField(max_length=255) 


 