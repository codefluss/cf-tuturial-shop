import { createContext, useEffect, useState } from 'react';
import { getCategoriesAnDocuments } from '../utils/firebase/firebase.utils';

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
  }, []);


  return <CategoryContext.Provider value={value}>{ children }</CategoryContext.Provider>
};

