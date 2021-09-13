from django.contrib.auth.models import User
from django.http import HttpResponse
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

    def update(self, request, *args, **kwargs):
        ProfileSerializer().update(Profile.objects.get(user_id=self.kwargs['pk']), validated_data=request.data)
        return HttpResponse(status=200)


class CreateProfile(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        ProfileSerializer().create(validated_data=request.data['id'])
        return HttpResponse(status=201)


class SearchUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSearchSerializer

    def get_queryset(self):
        return User.objects.filter(Q(username__startswith=self.kwargs.get('username')),
                                   ~Q(username=self.request.user.username))


class LeaderBoard(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.order_by('-rating')[:3]