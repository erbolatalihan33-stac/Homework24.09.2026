from django.core.management.base import BaseCommand
from categories.models import Category
from products.models import Product


class Command(BaseCommand):
    help = "Creates a small catalog for local development"

    # AI-ASSISTED: ChatGPT
    def handle(self, *args, **options):
        examples = {
            "Дом": [
                ("Льняная лампа", "Мягкий свет для вечернего чтения.", "89.00", 12, "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900"),
                ("Керамическая ваза", "Ручная работа с естественной фактурой.", "64.00", 8, "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=900"),
            ],
            "Работа": [
                ("Кожаный блокнот", "Плотная бумага для больших идей.", "32.00", 20, "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900"),
                ("Настольный органайзер", "Спокойный порядок на рабочем столе.", "45.00", 6, "https://images.unsplash.com/photo-1544816565-1f7a6b4f3c10?w=900"),
            ],
            "Ритуалы": [
                ("Чайная чашка", "Теплая керамика для медленного утра.", "24.00", 15, "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900"),
            ],
        }
        for category_name, products in examples.items():
            category, _ = Category.objects.get_or_create(name=category_name)
            for name, description, price, stock, image in products:
                Product.objects.update_or_create(name=name, defaults={"description": description, "price": price, "stock": stock, "image": image, "category": category})
        self.stdout.write(self.style.SUCCESS("Demo catalog created"))
