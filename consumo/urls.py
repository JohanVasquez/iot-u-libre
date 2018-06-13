from django.conf.urls import url
from .views import ConsumoCreateView, ConsumoListView, ValorEnergeticoCreateView, ValorEnergeticoListView

urlpatterns = [

    # Sensor
    url(r'^crear-consumo$', ConsumoCreateView.as_view(), name='crear_consumo'),
    url(r'^listar-consumo$', ConsumoListView.as_view(), name='listar_consumo'),
    url(r'^crear-valor$', ValorEnergeticoCreateView.as_view(), name='crear_valor'),
    url(r'^listar-valor$', ValorEnergeticoListView.as_view(), name='listar_valor'),

]
