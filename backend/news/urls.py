from django.urls import path, include
from .views import *

urlpatterns = [
    path('text/',NewsTextAPI.as_view(),name='news-txt'),
    path('img/',NewsImgAPI.as_view(),name='news-img')
]
