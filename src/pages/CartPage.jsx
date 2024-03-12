import React, { useContext } from 'react'
import '../css/cart.css'
import { CartContext } from '../context/CartContext'
import { PageBanner } from '../components/PageBanner'

export const CartPage = () => {

  const { shopList, deletePurchase, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  const getTotal = () => {
    return shopList.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleImpresion = () => {
    alert("Compra Realizada con Exito")
    shopList.map(cartItem => deletePurchase(cartItem.id))
  }

  return (
    <>
      <PageBanner page='Cart' image='/img/shop-cart.jpg' search='Cart'></PageBanner>
      <div className='container my-5'>
        <table className="table table-striped text-center align-middle">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col">Quantity</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {shopList.map(item => (
              <tr>
                <th scope="row"><img src={item.image}></img></th>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <td><button className='btn btn-secondary' onClick={() => decreaseQuantity(item.id)}>-</button>{item.quantity}<button className='btn btn-primary' onClick={() => increaseQuantity(item.id)}>+</button></td>
                <td>
                  <button onClick={() => deletePurchase(item.id)} className='btn btn-danger erase-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <th><b>TOTAL: </b></th>
              <td></td>
              <td></td>
              <td>${getTotal()}</td>
            </tr>
          </tbody>
        </table>

        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleImpresion}
            disabled={shopList < 1}
          >PURCHASE</button>
        </div>
      </div >
    </>
  )
}
