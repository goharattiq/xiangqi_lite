from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED

from .models import Profile
from .permissions import CustomRetrieveProfilePermission
from .serializers import ProfileSerializer, UserSearchSerializer, ProfileUpdateSerializer


class RetrieveProfile(RetrieveUpdateAPIView):
    permission_classes = [CustomRetrieveProfilePermission]
    serializer_class = ProfileSerializer

    def get_object(self, queryset=None, **kwargs):
        return get_object_or_404(Profile, user__username=self.kwargs.get('username'))

    def update(self, request, *args, **kwargs):
        instance = Profile.objects.get(user__username=self.kwargs['username'])
        serializer = ProfileUpdateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.update(instance=instance, validated_data=serializer.data, photo=request.data.get('photo'))
            return HttpResponse(status=HTTP_202_ACCEPTED)

        return HttpResponse(status=HTTP_204_NO_CONTENT)


class SearchUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSearchSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        return User.objects.filter(Q(username__startswith=username),
                                   ~Q(username=self.request.user.username))


class LeaderBoard(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.order_by('-rating')[:3]
