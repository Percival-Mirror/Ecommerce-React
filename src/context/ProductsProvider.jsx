import { useEffect, useState } from "react"
import { ProductsContext } from "./productsContext"

export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        console.log(data)
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}
