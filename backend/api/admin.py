from django.contrib import admin
from .models import Room

class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'occupied')

# Register your models here.

admin.site.register(Room, RoomAdmin)