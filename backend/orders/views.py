from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(ViewSet):
	permission_classes = [IsAuthenticated]

	def list(self, request):
		orders = Order.objects.filter(user=request.user).prefetch_related("items__product")
		return Response(OrderSerializer(orders, many=True).data)

	def retrieve(self, request, pk=None):
		order = Order.objects.filter(user=request.user).prefetch_related("items__product").get(pk=pk)
		return Response(OrderSerializer(order).data)

	def create(self, request):
		serializer = OrderSerializer(data=request.data, context={"request": request})
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)

# Create your views here.
