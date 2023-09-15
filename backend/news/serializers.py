from rest_framework import serializers
from translate.translate import google_translate
from translate.ocr_example import image_to_text
from .models import news_text, news_img


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
        print(validated_data['img'])
        instance = super().create(validated_data)
        validated_data['news'] = image_to_text("http://127.0.0.1:8000/media/"+str(instance.img))
        instance.news = validated_data['news']
        instance.save()
        return instance
    