# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime

from django.views.generic import ListView, CreateView, FormView
from django.urls import reverse_lazy
from django.http import JsonResponse

from .models import Consumo, ValorEnergetico
from .forms import ConsumoForm, ValorEnergeticoForm, CostoForm


class ConsumoCreateView(CreateView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para crear consumo energetico
    """
    model = Consumo
    form_class = ConsumoForm
    success_url = reverse_lazy('gestion_consumo:listar_consumo')


class ConsumoListView(ListView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para Listar el consumo energetico
    """
    model = Consumo


class ValorEnergeticoCreateView(CreateView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para crear consumo energetico
    """
    model = ValorEnergetico
    form_class = ValorEnergeticoForm
    success_url = reverse_lazy('gestion_consumo:listar_valor')


class ValorEnergeticoListView(ListView):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Vista para Listar el consumo energetico
    """
    model = ValorEnergetico


class CostoEnergetico(FormView):
    form_class = CostoForm
    template_name = 'consumo/costo_energetico.html'


def get_costo_energetico(request):
    """
    """
    if request.is_ajax():
        fecha_desde = str(request.POST["data[fecha_inicial]"])
        fecha_desde = datetime.strptime(fecha_desde, "%d/%m/%Y %H:%M")
        fecha_hasta = str(request.POST["data[fecha_final]"])
        fecha_hasta = datetime.strptime(fecha_hasta,  "%d/%m/%Y %H:%M")
        id_sensor = str(request.POST["data[id_sensor]"])
        costo_kwh = int(request.POST["data[costo_kwh]"])

        if fecha_desde and fecha_hasta and id_sensor and costo_kwh:
            consumo_total = Consumo.objects.filter(sensor_id=id_sensor, fecha__range=[fecha_desde,
                                                                                      fecha_hasta]).all()
            count = 0
            for consumo in consumo_total:
                count += consumo.consumo
            response = {"costo": float((count*costo_kwh)/1000)}
            return JsonResponse(response)
        else:
            response = {"Error": "Dato faltante"}
            return JsonResponse(response)
