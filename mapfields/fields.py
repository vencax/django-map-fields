'''
Created on Oct 10, 2012

@author: vencax
'''
from django import forms
from .widgets import LocationWidget
from django.conf import settings

INITIAL_POS = getattr(settings, 'MAPFIELDS_INITIAL_POS', '50:15:8')

class LocationField(forms.Field):
    widget = LocationWidget
    
    def __init__(self, **kwargs):
        kwargs['initial'] = INITIAL_POS
        super(LocationField, self).__init__(**kwargs)