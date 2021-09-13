from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include,re_path
from django.views.generic import TemplateView 
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/signup/', include('dj_rest_auth.registration.urls')),
    path('api/profile/', include('user_profile.urls')),
    path('api/game/', include('game.urls')),
    re_path('(^(?!(api|admin)).*$)',index,name='index'),
]

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
