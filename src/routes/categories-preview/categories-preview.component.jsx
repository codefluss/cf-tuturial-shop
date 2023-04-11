import CategoryPreview from '../../components/category-preview/category-preview.component';

import './categories-preview.styles.scss';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import { Fragment } from 'react';
import Spinner from '../../components/spinner/spinner.component';


const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <div className="category-preview-container">
            {
              Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
              })
            }
          </div>
        )
      }
    </Fragment>

  )
}

export default CategoriesPreview;