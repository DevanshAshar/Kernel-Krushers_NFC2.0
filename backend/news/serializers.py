from rest_framework import serializers
from ML.translate.ocr_example import image_to_text
from ML.translate.translate import google_translate
from ML.pickle.sentiment import sentiment_analysis
from .models import news_text, news_img
from ML.pickle.categorize import predict_category


class newsTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = news_text
        fields = "__all__"
        
    def create(self, validated_data):
        text = validated_data['news']
        validated_data['news'] = google_translate(text)
        validated_data['category'] = predict_category(validated_data['news'])
        validated_data['sentiment'] = sentiment_analysis(validated_data['news'])
        return super().create(validated_data)
    
    # def to_representation(self, instance):
    #     print(instance.news,'instance')
    #     predict = predict_category(instance.news)
    #     print(predict)
    #     return super().to_representation(instance)
        
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
        instance.category = predict_category(instance.news)
        instance.sentiment = sentiment_analysis(instance.news)
        instance.save()
        return instance
    
    # def to_representation(self, instance):
    #     print(instance.news,'instance')
    #     predict = predict_category(instance.news)
    #     print(predict)
    #     instance.category = predict
    #     return super().to_representation(instance)