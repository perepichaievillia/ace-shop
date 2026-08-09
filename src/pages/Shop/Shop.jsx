import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { CATEGORIES, getProductsByCategory } from '../../data/products';
import styles from './Shop.module.css';

const SORTS = [
  { id: 'newest', label: 'Найновіші' },
  { id: 'price-asc', label: 'Від дешевших до дорожчих' },
  { id: 'price-desc', label: 'Від дорожчих до дешевших' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'newest';

  const products = useMemo(() => {
    const base = getProductsByCategory(category);
    const sorted = [...base];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [category, sort]);

  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    setParams(next, { replace: true });
  };

  const setSort = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'newest') next.delete('sort');
    else next.set('sort', id);
    setParams(next, { replace: true });
  };

  return (
    <div className="container">
      <div className={styles.head}>
        <h1 className={styles.title}>Магазин</h1>
      </div>

      <div className={styles.bar}>
        <div className={styles.tabs} role="tablist" aria-label="Фільтр за категорією">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              className={`${styles.tab} ${category === cat.id ? styles.tabActive : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.sortWrap}>
          <label htmlFor="sort" className={styles.sortLabel}>Сортувати</label>
          <select
            id="sort"
            className={styles.select}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.body}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
