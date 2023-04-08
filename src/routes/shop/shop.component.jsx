import { useContext, Fragment } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const Shop = () => {
  const  { categoriesMap } = useContext(CategoryContext)

  return (
    <div className="shop-container">
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </div>
  )
}

export default Shop;