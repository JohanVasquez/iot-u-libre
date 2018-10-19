# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime, timedelta

from django.views.generic import TemplateView
from sensores.models import Sensores
from consumo.models import Consumo
from django.shortcuts import render


class Grafica(TemplateView):
    template_name = 'grafica/index.html'

    def get_context_data(self, *args, **kwargs):
        context = super(Grafica, self).get_context_data(*args, **kwargs)
        """ORM de django"""
        sensores = list(Consumo.objects.all())
        context["obj_sensor"] = sensores

        n = []  # Nombre del sensor
        v = []  # valor del sensores

        for consum in sensores:
            n.append(consum.sensor.nombre)
            v.append(consum.consumo)

        # Creo diccionario para operar duplicados
        dic_consumo = list(zip(n, v))  # los duplicados se agruparan y su valor de consumo se sumara
        result = {}  # aqui estara la suma de cada valor del sensor sin repetirlo

        for k, v in dic_consumo:
            total = result.get(k, 0) + v
            result[k] = total

        context["d_consumo"] = result

        suma = 0
        for consumos in sensores:
            suma = suma+int(consumos.consumo)
        context["consum_total"] = suma

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
        meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        context = super(Historico, self).get_context_data(*args, **kwargs)
        date = datetime.now()

        #data = []
        #for month_back in range(date.month, date.month-6, -1):
        #    print(meses[month_back])

        return context
