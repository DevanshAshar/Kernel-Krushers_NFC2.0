# Generated by Django 4.2.5 on 2023-09-15 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0004_news_img_category_news_text_category_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='news_img',
            name='fake',
            field=models.CharField(blank=True, default='real', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='news_img',
            name='sentiment',
            field=models.CharField(blank=True, default=[], max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='news_text',
            name='fake',
            field=models.CharField(blank=True, default='real', max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='news_text',
            name='sentiment',
            field=models.CharField(blank=True, default=[], max_length=200, null=True),
        ),
    ]