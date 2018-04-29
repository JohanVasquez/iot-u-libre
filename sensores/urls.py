from django.conf.urls import url
from .views import SensoresCreateView, SensoresListView, SensoresUpdateView

urlpatterns = [

    # Sensor
    url(r'^crear-sensor$', SensoresCreateView.as_view(), name='crear_sensor'),
    url(r'^listar-sensor$', SensoresListView.as_view(), name='listar_sensor'),
    url(r'^editar-sensor/(?P<pk>\d+)/$', SensoresUpdateView.as_view(), name='editar_sensor'),

]
