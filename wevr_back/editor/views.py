from rest_framework import viewsets, permissions, filters
from .serializers import Visite_virtuelle_serializer, Image_360_serializer, Hotspot_serializer, Infospot_serializer
from .models import Visite_virtuelle, Image_360, Hotspot, Infospot
from rest_framework.response import Response
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend


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


class Visite_virtuelle_view(viewsets.ModelViewSet):
    ordered_tasks = Visite_virtuelle.objects.order_by('-created_at')
    queryset = Visite_virtuelle.objects.all().order_by('-created_at')
    serializer_class = Visite_virtuelle_serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['libelle', 'client', 'image_360', 'id', 'client']


class Image_360_view(viewsets.ModelViewSet):
    ordered_tasks = Image_360.objects.order_by('created_at')
    queryset = Image_360.objects.all().order_by('created_at')
    serializer_class = Image_360_serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "lastModified", "name", "size", "vr", 'hotspot', 'infospot', 'created_at']

    def create(self, request, *args, **kwargs):
        request.data['base64'] = imageConvert(request.data['base64'])  
        serial = Image_360_serializer(data=request.data)
        if serial.is_valid():
            serial.save()
            return Response({"success":serial.data})
        else:
            print(serial.errors)
            if (serial.errors['id']):
                print('---------------------------L\'ID de cet image existe déjà----------------------------')
            return Response({'error':serial.errors})
    


class Hotspot_view(viewsets.ModelViewSet):
    queryset = Hotspot.objects.all()
    serializer_class = Hotspot_serializer


class Infospot_view(viewsets.ModelViewSet):
    queryset = Infospot.objects.all()
    serializer_class = Infospot_serializer