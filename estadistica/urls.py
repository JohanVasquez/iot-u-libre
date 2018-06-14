from django.conf.urls import url
from .views import Grafica

urlpatterns = [

    # Sensor
    url(r'^crear-grafica$', Grafica.as_view(), name='crear_grafica'),

]