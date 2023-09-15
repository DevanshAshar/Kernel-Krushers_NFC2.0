from django.contrib import admin
from .models import news_img, news_text
# Register your models here.

admin.site.register(news_text)
admin.site.register(news_img)