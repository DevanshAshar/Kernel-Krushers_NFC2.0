# Generated by Django 4.2.5 on 2023-09-15 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(blank=True, help_text='Enter your name', max_length=20, null=True)),
                ('username', models.CharField(max_length=200, unique=True)),
                ('email', models.EmailField(help_text='Enter your Email', max_length=255, unique=True, verbose_name='email address')),
                ('password_reset_token', models.CharField(blank=True, max_length=250, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_email_verified', models.BooleanField(default=False)),
                ('gender', models.CharField(default='prefer not to say', max_length=100)),
                ('stress_count', models.PositiveIntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
