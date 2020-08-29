from rest_framework import viewsets
from .serializers import Visite_virtuelle_serializer, Image_360_serializer, Hotspot_serializer, Infospot_serializer
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot


class Visite_virtuelle_view(viewsets.ModelViewSet):
    queryset = Visite_virtuelle.objects.all().order_by('libelle')
    serializer_class = Visite_virtuelle_serializer


class Image_360_view(viewsets.ModelViewSet):
    queryset = Image_360.objects.all()
    serializer_class = Image_360_serializer


class Hotspot_view(viewsets.ModelViewSet):
    queryset = Hotspot.objects.all()
    serializer_class = Hotspot_serializer


class Infospot_view(viewsets.ModelViewSet):
    queryset = Infospot.objects.all()
    serializer_class = Infospot_serializer