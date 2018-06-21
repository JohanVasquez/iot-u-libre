from django.conf.urls import url
from .views import Grafica, Tiempo_real, Historico

urlpatterns = [

    # Sensor
    url(r'^crear-grafica$', Grafica.as_view(), name='crear_grafica'),
    url(r'^tiempo-real$', Tiempo_real.as_view(), name='tiempo_real'),
    url(r'^crear-historico$', Historico.as_view(), name='crear_historico'),

]
