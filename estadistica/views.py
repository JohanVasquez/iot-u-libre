# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.generic import TemplateView
from sensores.models import Sensores
from consumo.models import Consumo
from django.shortcuts import render


class Grafica(TemplateView):
    template_name = 'grafica/index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Grafica, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = list(Sensores.objects.all())
        context["obj_sensor"] = sensores
        return context


class Tiempo_real(TemplateView):
    template_name = 'grafica/tiempo_real.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Tiempo_real, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = list(Sensores.objects.all())
        context["obj_sensor"] = sensores
        return context


class Historico(TemplateView):
    template_name = 'grafica/historico.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Historico, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = list(Consumo.objects.all())
        context["obj_sensor"] = sensores
        list_sensores = Sensores.objects.all()
        list_consumo = []
        consm = 0
        for sensor in list_sensores:
            consumos = Consumo.objects.filter(pk=sensor.pk)
            for consumo in consumos:
                consm += consumo.consumo
            list_consumo.append([sensor, consumos])
            consm = 0
        for lista in list_consumo:
            print(lista[0])
        # correcion

        return context
