from django.db import models
from categories.models import Category


class Product(models.Model):
	name = models.CharField(max_length=180)
	description = models.TextField()
	price = models.DecimalField(max_digits=10, decimal_places=2)
	image = models.URLField(blank=True)
	category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
	stock = models.PositiveIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return self.name

# Create your models here.
