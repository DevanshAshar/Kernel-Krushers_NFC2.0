from rest_framework import serializers
from ML.translate.ocr_example import image_to_text
from ML.translate.translate import google_translate
from ML.pickle.sentiment import sentiment_analysis
from ML.pickle.fakenews import fake_detect
from ML.pickle.categorize import predict_category
from .email import gov_send_email
from .models import news_text, news_img



class newsTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = news_text
        fields = "__all__"
        
    def create(self, validated_data):
        text = validated_data['news']
        validated_data['news'] = google_translate(text)
        validated_data['category'] = predict_category(validated_data['news'])
        validated_data['sentiment'], max_m = sentiment_analysis(validated_data['news'])
        print(fake_detect(validated_data['news']))
        validated_data['fake'] = fake_detect(validated_data['news'])
        if max_m == 'Positive':
            gov_send_email(
                'scarlettwitch031@gmail.com',
                validated_data['sentiment']['Positive'],
                validated_data['sentiment']['Negative'],
                validated_data['sentiment']['Neutral'],
                validated_data['category']
                )
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
        instance.sentiment, max_m = sentiment_analysis(instance.news)
        instance.fake = fake_detect(instance.news)
        if max_m == 'Positive':
            gov_send_email(
                'scarlettwitch031@gmail.com',
                instance.sentiment['Positive'],
                instance.sentiment['Negative'],
                instance.sentiment['Neutral'],
                instance.category,
            )
        instance.save()
        return instance
    
    # def to_representation(self, instance):
    #     print(instance.news,'instance')
    #     predict = predict_category(instance.news)
    #     print(predict)
    #     instance.category = predict
    #     return super().to_representation(instance)