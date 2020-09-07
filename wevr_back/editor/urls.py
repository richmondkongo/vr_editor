from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'visite-virtuelle', views.Visite_virtuelle_view)
router.register(r'image-360', views.Image_360_view)
router.register(r'hotspot', views.Hotspot_view)
router.register(r'infospot', views.Infospot_view)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)