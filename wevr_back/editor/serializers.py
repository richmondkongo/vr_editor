from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot


def imageConvert(data):
    from django.core.files.base import ContentFile
    import base64
    import uuid
    

    if data == '' or data == None:
        a = None
        print("c'est nul, pas d'image")
    else:
        format, imgstr = data.split(';base64,')
        ext = format.split('/')[-1]
        a = ContentFile(base64.b64decode(imgstr), name=str(uuid.uuid4())[:12] + '.' + ext)
    return a



class Hotspot_serializer(serializers.ModelSerializer):
    class Meta:
        model = Hotspot
        fields = "__all__"


class Infospot_serializer(serializers.ModelSerializer):
    class Meta:
        model = Infospot
        fields = "__all__"


class Image_360_serializer(serializers.ModelSerializer, QueryFieldsMixin):
    hotspot = Hotspot_serializer(many=True, read_only=True)
    infospot = Infospot_serializer(many=True, read_only=True)

    class Meta:
        model = Image_360
        fields = ['id', 'base64', 'lastModified', 'name', 'size', 'vr', 'hotspot', 'infospot']
    
    # def create(self, validated_data):
    #     validated_data['base64'] = imageConvert(validated_data['base64'])
    #     # print('\n\n\n\n\n\n\n\n', self, '\n\n\n\n\n', validated_data['base64'], '\n\n\n\n\n\n\n\n')
    #     return Image_360.objects.create(**validated_data)


class Visite_virtuelle_serializer(serializers.ModelSerializer, QueryFieldsMixin):
    image_360 = Image_360_serializer(many=True, read_only=True) 

    class Meta:
        model = Visite_virtuelle
        fields = ['id', 'libelle', 'client', 'created_at', 'image_360']