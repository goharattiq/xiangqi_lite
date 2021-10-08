from django.contrib import admin

from .models import Profile

admin.site.register(Profile)

admin.site.site_header = 'Xiangqi Lite Adminstration'
admin.site.site_title = 'Xiangqi Lite Portal'
admin.site.index_title = 'Xiangqi Lite Settings'
