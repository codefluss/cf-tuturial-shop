import { createContext, useEffect, useState } from 'react';
import { addCollectionAndDocuments, getCategoriesAnDocuments } from '../utils/firebase/firebase.utils';
import SHOP_DATA from '../shop-data';

export const CategoryContext = createContext({
  categoriesMap: {}
});

export const CategoryProvider = ({ children }) => {
  const [categoriesMap, setCategories] = useState({})
  const value = { categoriesMap, setCategories };


  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAnDocuments();
      setCategories(categoryMap);
      console.log(categoryMap);
    }
    getCategoriesMap();
    // addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);


  return <CategoryContext.Provider value={value}>{ children }</CategoryContext.Provider>
};

