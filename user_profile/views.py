from django.contrib.auth.models import User
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, ListAPIView
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Profile
from .serializers import ProfileSerializer, UserSearchSerializer


class RetrieveProfile(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self, queryset=None, **kwargs):
        id = self.kwargs.get('pk')
        return get_object_or_404(Profile, user_id=id)


class CreateProfile(CreateAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SearchUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSearchSerializer

    def get_queryset(self):
        return User.objects.filter(Q(username__startswith=self.kwargs.get('username')))
