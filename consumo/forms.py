# coding=utf-8
from django import forms
from .models import Consumo, ValorEnergetico, Sensores


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
        fields = ('sensor', 'consumo', 'fecha')


class CostoForm(forms.Form):
    """
    Autor: Johan Vasquez
    Fecha: 12/06/2018
    Descripción: Formulario para gestionar el consumo energetico
    """
    fecha_inicial = forms.DateTimeField()
    fecha_final = forms.DateTimeField()
    sensores = forms.ModelChoiceField(queryset=Sensores.objects.all())
    costo_kwh = forms.IntegerField()

    def __init__(self, *args, **kwargs):
        super(CostoForm, self).__init__(*args, **kwargs)
        self.fields['fecha_inicial'].widget.attrs.update({'class': 'datetimepicker'})
        self.fields['fecha_final'].widget.attrs.update({'class': 'datetimepicker'})
        self.fields['sensores'].queryset = Sensores.objects.all()

    required_css_class = 'required'