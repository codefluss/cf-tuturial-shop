import { useContext, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss';
import { CategoryContext } from '../../contexts/category.context';

const Shop = () => {
  const  { categoriesMap } = useContext(CategoryContext)

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => {
          return <Fragment key={title}>
            <h2>{ title.toUpperCase() }</h2>
            <div className="products-container">
              { categoriesMap[title].map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
              ))}
            </div>
          </Fragment>
        })
      }

    </Fragment>
  )
}

export default Shop;