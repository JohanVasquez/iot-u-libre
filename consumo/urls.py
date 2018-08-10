from django.conf.urls import url
from .views import ConsumoCreateView, ConsumoListView, ValorEnergeticoCreateView, \
    ValorEnergeticoListView, CostoEnergetico, get_costo_energetico

urlpatterns = [

    # Sensor
    url(r'^crear-consumo$', ConsumoCreateView.as_view(), name='crear_consumo'),
    url(r'^listar-consumo$', ConsumoListView.as_view(), name='listar_consumo'),
    url(r'^crear-valor$', ValorEnergeticoCreateView.as_view(), name='crear_valor'),
    url(r'^listar-valor$', ValorEnergeticoListView.as_view(), name='listar_valor'),
    url(r'^costo-energetico$', CostoEnergetico.as_view(), name='costo_energetico'),
    # ajax
    url(r'^get-costo$', get_costo_energetico, name='get_costo'),

]
