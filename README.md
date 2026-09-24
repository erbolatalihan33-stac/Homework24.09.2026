# MARCHÉ — учебный интернет-магазин

Учебный интернет-магазин на Django REST Framework и React + TypeScript. Проект собран по материалам раздела React: компоненты, props, state, формы, `useEffect`, Axios, маршрутизация, Context API и `localStorage`.

## Возможности

- каталог товаров с поиском, категориями и сортировкой;
- страница товара и остатки на складе;
- корзина с сохранением в `localStorage`;
- регистрация, вход и личный кабинет;
- оформление заказа и история заказов;
- Django Admin и REST API;
- PostgreSQL и Docker Compose.

## Стек

Backend: Python, Django, Django REST Framework, PostgreSQL.
Frontend: React, TypeScript, Vite, Axios, react-router-dom.

## Запуск

```bash
copy .env.example .env
docker compose up --build
```

Frontend: http://localhost:5173  
API: http://localhost:8000/api/  
Admin: http://localhost:8000/admin/

Для локального frontend без Docker:

```bash
cd frontend
npm install
npm run dev
```

После запуска backend можно наполнить учебный каталог:

```bash
docker compose exec backend python manage.py seed_demo
```

## API

- `GET/POST /api/categories/`
- `GET/PUT/DELETE /api/categories/{id}/`
- `GET/POST /api/products/`
- `GET/PUT/DELETE /api/products/{id}/`
- `GET/POST /api/orders/` — только для авторизованного пользователя
- `GET /api/orders/{id}/`
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/auth/me/`

Поиск товаров: `/api/products/?search=лампа&category=1&ordering=price`.

## Архитектура

Корзина хранится в React Context и синхронизируется с `localStorage`, как в материалах уроков `ls16_Context API` и `ls18_local_storage_persistence`. Сервер хранит пользователей, товары, категории и заказы. Заказ создается только для текущего пользователя, поэтому чужая история недоступна.

## Использование AI

В процессе разработки использовались AI-инструменты.

AI применялся для генерации отдельных участков кода, поиска и объяснения ошибок, рефакторинга и подготовки документации. Сложные сгенерированные блоки помечены непосредственно в исходных файлах комментариями `AI-GENERATED: ChatGPT`; изменения по подсказкам и исправлениям помечаются `AI-ASSISTED: ChatGPT`.

Основная архитектура проекта, интеграция компонентов и проверка полученного кода выполнены разработчиком. Структура React опирается на учебные материалы из `MaterialDjango/Obsidian/WebDevProgram/React`.

## Структура

```text
backend/
  categories/ products/ orders/ users/ config/
frontend/src/
  components/ context/ pages/ services/ types/
docker-compose.yml
```

## Автор

Учебный проект разработчика.




# AI-GENERATED: ChatGPT