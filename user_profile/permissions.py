from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS


class CustomRetrieveProfilePermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS and IsAuthenticated:
            return True
        else:
            if view.kwargs.get('pk') == request.user.username:
                return True
            else:
                return False


class CustomCreateProfilePermission(BasePermission):
    def has_permission(self, request, view):
        if int(view.request.data.get('pk')) == request.user.id:
            return True
        else:
            return False