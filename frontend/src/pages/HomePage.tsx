import { useEffect, useState } from 'react'
import { productService } from '../services/api'
import type { Category, Product } from '../types'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]); const [categories, setCategories] = useState<Category[]>([]); const [search, setSearch] = useState(''); const [category, setCategory] = useState(''); const [ordering, setOrdering] = useState(''); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { productService.categories().then((response) => setCategories(response.data)).catch(() => setError('Не удалось загрузить категории')); }, [])
  useEffect(() => { productService.list({ search, category, ordering }).then((response) => setProducts(response.data)).catch(() => setError('Запусти backend, чтобы увидеть каталог')).finally(() => setLoading(false)) }, [search, category, ordering])
  return <main><section className="intro"><p className="eyebrow">Магазин вещей с характером</p><h1>Выбирай то,<br /><em>что остается.</em></h1><p className="intro-copy">Продуманные предметы для дома, работы и ежедневных ритуалов.</p></section><section className="catalog"><div className="catalog-head"><div><p className="eyebrow">Коллекция / 2026</p><h2>Все товары</h2></div><div className="filters"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск товаров" /><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Все категории</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={ordering} onChange={(event) => setOrdering(event.target.value)}><option value="">Сначала новые</option><option value="price">Дешевле</option><option value="-price">Дороже</option></select></div></div>{loading ? <p className="state">Загрузка каталога...</p> : error ? <p className="state error">{error}</p> : <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section></main>
}
