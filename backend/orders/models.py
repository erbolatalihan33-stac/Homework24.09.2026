from django.conf import settings
from django.db import models
from products.models import Product


class Order(models.Model):
	STATUS_CHOICES = [("new", "New"), ("processing", "Processing"), ("sent", "Sent"), ("done", "Done")]
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
	customer_name = models.CharField(max_length=120)
	phone = models.CharField(max_length=40)
	address = models.TextField()
	status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
	total_price = models.DecimalField(max_digits=10, decimal_places=2)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]


class OrderItem(models.Model):
	order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
	product = models.ForeignKey(Product, on_delete=models.PROTECT)
	quantity = models.PositiveIntegerField()
	price = models.DecimalField(max_digits=10, decimal_places=2)

# Create your models here.
