import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../context/productsContext'
import '../css/single-product.css'
import { CartContext } from '../context/CartContext'

export const ProductPage = () => {

    const { products } = useContext(ProductsContext)

    const { addPurchase } = useContext(CartContext)

    const handleAddPurchase = (purchase, selectedQuantity) => {
        addPurchase(purchase, selectedQuantity)
        console.log(productQuantity)
    }

    const { id } = useParams()

    const product = products.filter((filteredProduct) => filteredProduct.id == id)[0]

    const [productQuantity, setProductQuantity] = useState(1)

    const handleProductQuantity = (e) => {
        setProductQuantity(parseInt(e.target.value))
        setTimeout(() => {
            if(e.target.value < 1){
                setProductQuantity(1)
            }
        }, 2200);
    }

    const increaseProductQuantity = () => {
        setProductQuantity(productQuantity + 1)
        console.log(productQuantity)
    }

    const decreaseProductQuantity = () => {
        setProductQuantity(productQuantity - 1)
        if(productQuantity < 2){
            setProductQuantity(1)
        }
    }

    return (
        <main>
            <div className='single-product-container container py-5'>
                <section>
                    <div className='row'>
                        <div className='col-12 col-md-5 pe-4'>
                            <div className='image-container'>
                                <img src={product.image}></img>
                            </div>
                        </div>
                        <div className='col-12 col-md-7 ps-4'>
                            <div className='product-details-container'>
                                <h3>{product.title}</h3>
                                <p className='product-price'>{product.price + " p/u"}</p>
                                <table>
                                    <tr>
                                        <th>Brand:</th>
                                        <td>Bill Gates</td>
                                    </tr>
                                </table>
                                <p className='product-description'>{product.description}</p>
                                <div className='product-purchase'>
                                    <label>Available
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                                            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                                        </svg>
                                    </label>
                                    <div className='purchase-wrapper'>
                                        <div className='purchase-quantity'>
                                            <label>{(product.price * productQuantity).toFixed(2) + "$"}</label>
                                            <div className='quantity-counter'>
                                                <button className='btn btn-secondary' onClick={() => decreaseProductQuantity()}>-</button>
                                                <input type='number' value={productQuantity} onChange={handleProductQuantity}></input>
                                                <button className='btn btn-primary' onClick={() => increaseProductQuantity()}>+</button>
                                            </div>
                                        </div>
                                        <div class="d-grid gap-2 mb-0">
                                            <button onClick={()=> handleAddPurchase(product, productQuantity)} class="btn btn-primary add-button" type="button">
                                                Add to Cart
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
