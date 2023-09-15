from rest_framework.generics import GenericAPIView,ListCreateAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin,DestroyModelMixin,UpdateModelMixin
from .models import news_img,news_text
from .serializers import newsTextSerializer, newsImgSerializer

# Create your views here.

class NewsTextAPI(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = news_text.objects.all()
    serializer_class = newsTextSerializer
    
    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
class NewsImgAPI(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = news_img.objects.all()
    serializer_class = newsImgSerializer
    
    def post(self, request, *args, **kwargs):
        # print(request.data['lang'])
        return super().create(request,context={request.data['lang']}, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        
        return super().list(request, *args, **kwargs)