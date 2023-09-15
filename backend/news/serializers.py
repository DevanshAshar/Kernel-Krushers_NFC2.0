from rest_framework import serializers
from news.ocr_example import image_to_text
from news.translate import google_translate
from .models import news_text, news_img
from ML.pickle.categorize import predict_category
class newsTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = news_text
        fields = "__all__"
        
    def create(self, validated_data):
        text = validated_data['news']
        validated_data['news'] = google_translate(text)
        return super().create(validated_data)
        
class newsImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = news_img
        fields = "__all__"

    #overiding the create method to store text extracted by the image
    def create(self, validated_data):
        data = self.context.get('request').data
        # print(data['lang'], 'data 12345')
        instance = super().create(validated_data)
        text = image_to_text("http://127.0.0.1:8000/media/"+str(instance.img),data['lang'])
        instance.news = google_translate(text)
        instance.save()
        return instance
    
    def to_representation(self, instance):
        print(instance.news,'instance')
        
        return super().to_representation(instance)