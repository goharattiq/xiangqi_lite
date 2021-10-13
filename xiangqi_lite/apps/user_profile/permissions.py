from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS


class CustomRetrieveProfilePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS and IsAuthenticated:
            return True
        elif view.kwargs.get('username') == request.user.username:
            return True
        return False
