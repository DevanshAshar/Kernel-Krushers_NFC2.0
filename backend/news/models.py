from django.db import models

# Create your models here.
class news_img(models.Model):
    news = models.TextField(null=True,blank=True)
    img = models.ImageField(upload_to='news_image')
    category = models.CharField(max_length=200,default='', null=True, blank=True)
    
    
class news_text(models.Model):
    news = models.TextField()
    category = models.CharField(max_length=200,default='', null=True, blank=True)
    
    def __str__(self) -> str:
        return self.news