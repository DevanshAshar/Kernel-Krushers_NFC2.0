from django.db import models

# Create your models here.
class news_img(models.Model):
    news = models.TextField(null=True,blank=True)
    img = models.ImageField(upload_to='news/image')
    
    
class news_text(models.Model):
    news = models.TextField()
    
    def __str__(self) -> str:
        return self.news