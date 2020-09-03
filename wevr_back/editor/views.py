from rest_framework import viewsets, permissions, filters
from .serializers import Visite_virtuelle_serializer, Image_360_serializer, Hotspot_serializer, Infospot_serializer
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class Visite_virtuelle_view(viewsets.ModelViewSet):
    ordered_tasks = Visite_virtuelle.objects.order_by('-created_at')
    queryset = Visite_virtuelle.objects.all().order_by('-created_at')
    serializer_class = Visite_virtuelle_serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['libelle', 'client', 'image_360']


class Image_360_view(viewsets.ModelViewSet):
    ordered_tasks = Image_360.objects.order_by('-created_at')
    queryset = Image_360.objects.all().order_by('-created_at')
    serializer_class = Image_360_serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "base64", "lastModified", "name", "size", "vr", 'hotspot', 'infospot']


class Hotspot_view(viewsets.ModelViewSet):
    queryset = Hotspot.objects.all()
    serializer_class = Hotspot_serializer


class Infospot_view(viewsets.ModelViewSet):
    queryset = Infospot.objects.all()
    serializer_class = Infospot_serializer