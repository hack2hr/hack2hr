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
        model_container=PeopleOldAndYoung
    )  

class PeopleOldAndYoung(models.Model):
    Old = models.CharField(max_length=255)
    Young = models.CharField(max_length=255) 


"year": "1998",
"madeby": "Ivanov",
"auto": "true"
"accepted": "false"
"total": "800",
"data": {
    "workAble": "200",
    "migrants": "200",
    "other": {
        "totalother": "400"
        "old": "200",
        "young": "200"
    }
}
        

"year": "",
"totalyear": "",
"data": {
    "q1": {
        "totalq1": "",
        "a": {
            "count": "100",
            "madeby": "Ivanov",
            "auto": "true",
            "accepted": "true",
        }
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "g": "",
        "k": "",
        "l": "",
        "m": "",
        "n": "",
        "o": "",
        "p": "",
        "q": "",
        "r": "",
        "s": "",
        "t": "",
        "u": "",
    },
    "q2": {
        "totalq2": "",
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "g": "",
        "k": "",
        "l": "",
        "m": "",
        "n": "",
        "o": "",
        "p": "",
        "q": "",
        "r": "",
        "s": "",
        "t": "",
        "u": "",
    },
    "q3": {
        "totalq4": "",
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "g": "",
        "k": "",
        "l": "",
        "m": "",
        "n": "",
        "o": "",
        "p": "",
        "q": "",
        "r": "",
        "s": "",
        "t": "",
        "u": "",
    },
    "q4": {
        "totalq4": "",
        "a": "",
        "b": "",
        "c": "",
        "d": "",
        "e": "",
        "f": "",
        "g": "",
        "h": "",
        "i": "",
        "g": "",
        "k": "",
        "l": "",
        "m": "",
        "n": "",
        "o": "",
        "p": "",
        "q": "",
        "r": "",
        "s": "",
        "t": "",
        "u": "",
    }
}
 
"year": "1998",
"total": "800",
"data": {
    "students": "200",
    "count": "200",
    "percenttowork": "3"
}