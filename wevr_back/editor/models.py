from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from wevr_back.models import BaseModel

class Visite_virtuelle(BaseModel):
    libelle = models.CharField(max_length=255, help_text="Le libelle de la visite.", blank=True, null=False, default='vide')
    client = models.CharField(max_length=255, help_text="Id du client concerné.", blank=True, null=True, default='no')
    def __str__(self):
        return self.libelle


class Image_360(BaseModel):
    base64 = models.TextField(help_text="Base 64 de l'image.", blank=True, null=True)
    lastModified = models.CharField(max_length=255, null=True, help_text="La dernière modification effectuée par le user sur l'image au niveau de lui son pc.")
    name = models.CharField(max_length=255, help_text="Le libelle de la visite.", blank=True, null=True)
    size = models.IntegerField(validators=[MaxValueValidator(9999999999)], null=True, help_text="Taille de l'image.")
    vr = models.ForeignKey(Visite_virtuelle, on_delete=models.CASCADE, help_text="Visite virtuelle concernée à laquelle cette image est liée.", related_name='image_360')
    def __str__(self):
        return self.name


class Hotspot(BaseModel):
    coords = models.CharField(max_length=255, help_text="Coordonnées x, y et z du hotspot.")
    origin = models.ForeignKey(Image_360, on_delete=models.CASCADE, help_text="Image où l'on verra le hotspot.", related_name="hotspot")
    to = models.ForeignKey(Image_360, on_delete=models.CASCADE, help_text="Image où  le hotspot redigera.", related_name="hotpost_to")


class Infospot(BaseModel):
    coords = models.CharField(max_length=255, help_text="Coordonnées x, y et z de l'infospot.")
    img = models.ForeignKey(Image_360, on_delete=models.CASCADE, help_text="Image où l'on verra l' infospot.", related_name="infospot")
    info = models.TextField(help_text="Text/html de l'infospot.")
    txt_or_html  = models.IntegerField(null=True, help_text="Donne le type de l'infospot(text = 0 et html = 1).")