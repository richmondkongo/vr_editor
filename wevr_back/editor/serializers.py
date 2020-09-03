from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot


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

class Visite_virtuelle_serializer(serializers.ModelSerializer, QueryFieldsMixin):
    image_360 = Image_360_serializer(many=True, read_only=True) #serializers.SerializerMethodField('get_image_360')
    class Meta:
        model = Visite_virtuelle
        fields = ['id', 'libelle', 'client', 'created_at', 'image_360']
        
    # def get_image_360(self, obj):
    #     try:
    #         # print('id :', obj.image_360)
    #         res = Image_360.objects.filter(vr=obj.id)
    #         print('\n\n\n\n------view:\n\n{}\n\n'.format(res))
    #         res2 = Image_360_serializer(res)
    #         return res2.data
    #     except Exception as e:
    #         # return e
    #         print ('\n\n\n\n\n\n\t\tErreur rencontrée:{}\n\n\n\n\n\n'.format(e))
    #         return {}
