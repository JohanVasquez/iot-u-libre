from django.conf.urls import url
from .views import Grafica, Tiempo_real

urlpatterns = [

    # Sensor
    url(r'^crear-grafica$', Grafica.as_view(), name='crear_grafica'),
    url(r'^tiempo-real$', Tiempo_real.as_view(), name='tiempo_real'),

]
