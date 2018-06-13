# coding=utf-8
from django import forms
from .models import Consumo, ValorEnergetico


class ValorEnergeticoForm(forms.ModelForm):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Formulario para gestionar el valor energetico
    """
    required_css_class = 'required'

    class Meta:
        model = ValorEnergetico
        fields = ('moneda', 'unida', 'tiempo')


class ConsumoForm(forms.ModelForm):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Formulario para gestionar el consumo energetico
    """
    required_css_class = 'required'

    class Meta:
        model = Consumo
        fields = ('sensor', 'consumo', 'fecha', 'valor')
