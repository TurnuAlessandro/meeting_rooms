from django.db import models


# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    occupied = models.BooleanField(default=False)

    def _str_(self):
        return self.name

# Create your models here.
