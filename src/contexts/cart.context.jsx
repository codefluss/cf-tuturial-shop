import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_OPEN: 'SET_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartContext = createContext(INITIAL_STATE);

const cartReducer = (state, action) => {
  const { type, payload} = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount
    }));
  }

  const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
      return cartItems.map(cartItem =>
        cartItem.id === productToAdd.id
          ? {...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    return [...cartItems, { ...productToAdd, quantity: 1}];
  }

  const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity -1 }
        : cartItem
    );
  }

  const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, isOpen));
  }

  const value = {
    isCartOpen,
    cartCount,
    cartTotal,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}