# AI-GENERATED: ChatGPT
from django.db import transaction
from rest_framework import serializers
from products.models import Product
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "customer_name", "phone", "address", "status", "total_price", "created_at", "items"]
        read_only_fields = ["status", "total_price", "created_at"]

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop("items")
        total = 0
        order_items = []
        for item in items_data:
            product = Product.objects.select_for_update().get(pk=item["product"].pk)
            if item["quantity"] > product.stock:
                raise serializers.ValidationError(f"Недостаточно товара: {product.name}")
            total += product.price * item["quantity"]
            product.stock -= item["quantity"]
            product.save(update_fields=["stock"])
            order_items.append((product, item["quantity"], product.price))
        order = Order.objects.create(total_price=total, user=self.context["request"].user, **validated_data)
        OrderItem.objects.bulk_create([OrderItem(order=order, product=p, quantity=q, price=price) for p, q, price in order_items])
        return order
