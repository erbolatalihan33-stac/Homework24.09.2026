from django.urls import path
from .views import OrderViewSet

order_view = OrderViewSet.as_view({"get": "list", "post": "create"})
order_detail = OrderViewSet.as_view({"get": "retrieve"})

urlpatterns = [
    path("", order_view),
    path("<int:pk>/", order_detail),
]
