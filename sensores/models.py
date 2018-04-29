# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Sensores(models.Model):
    """
    Autor: Johan Vasquez
    Fecha: 29/04/2018
    Descripcion: Modelo para gestionar los sensores registrados en el sistema
    """
    ESTADO = (
        (0, 'ACTIVO'),
        (1, 'INACTIVO'),
    )

    nombre = models.CharField(max_length=50, verbose_name='Nombre del sensor')
    estado = models.PositiveIntegerField(choices=ESTADO)
    ubicacion = models.CharField(max_length=50, verbose_name='Nombre del sensor')

    def __str__(self):
        return self.nombre
