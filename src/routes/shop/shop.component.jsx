import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAnDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/categories/category.reducer';
import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return async () => {
      const categories = await getCategoriesAnDocuments();
      dispatch(setCategories(categories));
    };
  }, [dispatch]);
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path="/:category" element={<Category />} />
    </Routes>
  );
}

export default Shop;