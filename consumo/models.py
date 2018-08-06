# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime

from django.db import models
from sensores.models import Sensores


class ValorEnergetico(models.Model):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripcion: Modelo para controlar el valor de la energia
    """
    MONEDA = (
        (0, 'PESOS $(CO)'),
    )
    UNIDAD = (
        (0, 'Watts'),
    )
    TIEMPO = (
        (0, 'Segundo'),
    )
    moneda = models.PositiveIntegerField(choices=MONEDA)
    unida = models.PositiveIntegerField(choices=UNIDAD)
    tiempo = models.PositiveIntegerField(choices=TIEMPO)

    def __str__(self):
        return str(self.MONEDA[self.moneda][1]) + " " + str(self.UNIDAD[self.unida][1])


class Consumo(models.Model):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripcion: Modelo para contabilizar el consumo de los sensores
    """
    sensor = models.ForeignKey(Sensores)
    consumo = models.IntegerField(default=0)
    fecha = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.sensor, self.consumo, self.fecha
