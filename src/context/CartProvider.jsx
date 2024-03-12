import { useReducer } from 'react'
import { CartContext } from '../context/CartContext'


const initialState = []

export const CartProvider = ({ children }) => {

    const shoppingReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CART] Add Purchase':
                return [...state.filter(item => item.id !== action.payload.id), action.payload];
            case '[CART] Increase Quantity Purchase':
                return state.map(item => {
                    const elements = item.quantity + 1
                    if (item.id === action.payload) return { ...item, quantity: elements }
                    return item
                })
            case '[CART] Decrease Quantity Purchase':
                return state.map(item => {
                    const elements = item.quantity - 1
                    if (item.id === action.payload && item.quantity > 1) return { ...item, quantity: elements }
                    return item
                })
            case '[CART] Delete Purchase':
                return state.filter(purchase => purchase.id !== action.payload)
            default:
                return state
        }
    }

    const [shopList, dispatch] = useReducer(shoppingReducer, initialState)

    const addPurchase = (purchase, selectedQuantity) => {
        if (shopList.find(item => item.id == purchase.id)){
            purchase.quantity = purchase.quantity + selectedQuantity
        } else{
            purchase.quantity = selectedQuantity
        }
        const action = {
            type: '[CART] Add Purchase',
            payload: purchase
        }
        dispatch(action)
    }
    const increaseQuantity = (id) => {
        const action = {
            type: '[CART] Increase Quantity Purchase',
            payload: id
        }
        dispatch(action)

    }
    const decreaseQuantity = (id) => {
        const action = {
            type: '[CART] Decrease Quantity Purchase',
            payload: id
        }
        dispatch(action)

    }
    const deletePurchase = (id) => {
        const action = {
            type: '[CART] Delete Purchase',
            payload: id
        }
        dispatch(action)

    }


    return (

        <CartContext.Provider value={{ shopList, addPurchase, increaseQuantity, decreaseQuantity, deletePurchase }}>
            {children}
        </CartContext.Provider>
    )
}