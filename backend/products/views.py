from django.db.models import Q
from rest_framework.filters import OrderingFilter
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
	queryset = Product.objects.select_related("category").all()
	serializer_class = ProductSerializer
	filter_backends = [OrderingFilter]
	ordering_fields = ["price", "created_at", "name"]

	def get_queryset(self):
		queryset = super().get_queryset()
		search = self.request.query_params.get("search", "").strip()
		category = self.request.query_params.get("category")
		if search:
			queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))
		if category:
			queryset = queryset.filter(category_id=category)
		return queryset

# Create your views here.
