from .models import Comentario
from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator


class ComentarioForm(forms.ModelForm):
    texto = forms.CharField(widget=forms.Textarea(
        attrs={'cols': '7', 'rows': '10', 'class': 'materialize-textarea'},
    ))
    nombre = forms.CharField(max_length=99, widget=forms.TextInput(
        attrs={
            'type': 'text',
            'readonly': True,
        }
    ))
    id_usuario = forms.CharField(max_length=99999, widget=forms.Textarea(
        attrs={'cols': '7', 'rows': '10', 'class': 'hide'},
    ))

    class Meta:
        fields = ('nombre', 'texto', 'id_usuario')
        model = Comentario
