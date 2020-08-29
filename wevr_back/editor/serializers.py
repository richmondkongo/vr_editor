from rest_framework import serializers
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot

class Visite_virtuelle_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visite_virtuelle
        # fields = ('name', 'alias')
        fields = ("id", "libelle")
        # fields = "__all__"


class Image_360_serializer(serializers.ModelSerializer):
    class Meta:
        model = Image_360
        fields = ("id", "base64", "lastModified", "name", "size", "vr")

class Hotspot_serializer(serializers.ModelSerializer):
    class Meta:
        model = Hotspot
        fields = "__all__"


class Infospot_serializer(serializers.ModelSerializer):
    class Meta:
        model = Infospot
        fields = "__all__"