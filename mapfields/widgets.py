'''
Created on Oct 10, 2012

@author: vencax
'''
# The development of this code was sponsored by MIG Internacional
# This code is released under the terms of the BSD license
# http://code.djangoproject.com/browser/django/trunk/LICENSE
# Feel free to use it at your whim/will/risk :D
# Contact info: Javier Rojas <jerojasro@gmail.com>
from django import forms
from django.utils.safestring import mark_safe
from django.conf import settings
from django.utils.translation import ugettext

class LocationWidget(forms.widgets.Widget):
    class Media:
        js = ('http://maps.google.com/maps/api/js?sensor=false',
              'mapfields/maps.js')
        
    def __init__(self, *args, **kw):
        super(LocationWidget, self).__init__(*args, **kw)
        self.inner_widget = forms.widgets.HiddenInput()

    def render(self, name, value, *args, **kwargs):
        js = '''
        <script type="text/javascript">
        //<![CDATA[
            var m = new ChooseLocMap("%s_id", "map_%s", true, "%s", "%smapfields/pointIcon.png");
        //]]>
        </script>
        ''' % (name, name, ugettext('Drag to desired position'), settings.STATIC_URL)
        html = self.inner_widget.render("%s" % name, value, dict(id='%s_id' % name))
        html += "<div id=\"map_%s\" style=\"width: 500px; height: 500px\"></div>" % name
        return mark_safe(html+js)
