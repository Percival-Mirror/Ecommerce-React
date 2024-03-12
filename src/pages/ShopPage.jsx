import React, { useEffect, useState } from 'react'
import '../css/shop.css'
import { useContext } from 'react'
import { ProductsContext } from '../context/productsContext'
import { Card } from '../components/Card'
import { ShopPagination } from '../components/ShopPagination'
import { CartContext } from '../context/CartContext'
import { useLocation } from 'react-router-dom'
import { CategoriesList } from '../components/CategoriesList'
import { PageBanner } from '../components/PageBanner'

export const ShopPage = () => {

  // Obtención de los datos de la barra de busqueda

  const location = useLocation()

  const search = location.state

  //  Cart y Products context data 

  const { addPurchase } = useContext(CartContext)

  const { products } = useContext(ProductsContext)

  const handleAddPurchase = (purchase, selectedQuantity) => {
    addPurchase(purchase, selectedQuantity)
  }

  // Filtrado

  const [shopGrid, setShopGrid] = useState(true)

  const [category, setCategory] = useState("all")

  const [searchInput, setSearchInput] = useState('')

  const [categoryActive, setCategoryActive] = useState("all")

  const [productsPerPage, setProductsPerPage] = useState(12)

  const [currentPage, setCurrentPage] = useState(1)

  const [sortBy, setSortBy] = useState("Más Reciente")

  const filterCategory = (categorySelected) => {
    setCurrentPage(1)
    setCategory(categorySelected)
    setCategoryActive(categorySelected)
    setSearchInput('')
  }

  const onSortChange = (event) => {
    setSortBy(event.target.value)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (search !== null) {
      setCategory(search.category == 'All' ? 'all' : search.category)
      setCategoryActive(search.category == 'All' ? 'all' : search.category)
      setSearchInput(search.input)
    }
  }, [search])

  // Paginación

  const numberOfProducts = category == "all" ? products.filter((item) => { return searchInput.toLowerCase() == "" ? item : item.title.toLowerCase().includes(searchInput) }).length
    :
    products.filter((item) => { return searchInput.toLowerCase() == "" ? item : item.title.toLowerCase().includes(searchInput) }).filter(product => product.category == category).length;

  const handleChangePagination = (e, p) => {
    setCurrentPage(p)
  }

  const lastIndex = currentPage * productsPerPage

  const firstIndex = lastIndex - productsPerPage

  const filteredProducts = category != 'all' ? products.filter((item) => { return searchInput.toLowerCase() == "" ? item : item.title.toLowerCase().includes(searchInput) }).filter(product => product.category == category) : products.filter((item) => { return searchInput.toLowerCase() == "" ? item : item.title.toLowerCase().includes(searchInput) })

  const showProducts = filteredProducts.sort((a, b) =>{
      const priceA = a.price
      const priceB = b.price

      switch(sortBy){
        case 'Del Menor al Mayor Precio':
          return priceA - priceB
        case 'Del Mayor al Menor Precio':
          return priceB - priceA
      }
    })

  return (
    <main>
      <PageBanner page='Shop' image="/img/shop-back.jpg" search={categoryActive}></PageBanner>
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-lg-9 col-12'>
            <section>
              <h3>{category == 'all' ? "ALL PRODUCTS" : category.toUpperCase()}</h3>
              <div className='d-flex align-items-center justify-content-between pb-4'>
                <p className='m-0'>{`Showing [${firstIndex + 1} - ${numberOfProducts < lastIndex ? lastIndex - Math.abs(numberOfProducts - lastIndex) : lastIndex}] of ${numberOfProducts} productss.`}</p>
                <div className='d-flex align-items-center justify-content-between gap-2'>
                  <div className='filter-container'>
                    <select onChange={onSortChange}>
                      <option selected>Most Recent</option>
                      <option>Lower to Higher</option>
                      <option>Higher to Lower</option>
                    </select>
                  </div>
                  <div className='grid-buttons-container'>
                    <button className={shopGrid ? 'active' : ''} onClick={() => setShopGrid(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                        <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                      </svg>
                    </button>
                    <button button className={shopGrid ? '' : 'active'} onClick={() => setShopGrid(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className={shopGrid ? 'shop-products-container' : "shop-products-container list"}>
                {showProducts.map(product => {
                    return (<Card
                      grid={shopGrid}
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      handleAdd={() => handleAddPurchase(product, 1)}
                    >
                    </Card>)
                  }).slice(firstIndex, lastIndex)
                }
              </div>

              <div className='pagination-container'>
                <ShopPagination
                  totalProducts={numberOfProducts}
                  productsPerPage={productsPerPage}
                  handleChange={handleChangePagination}
                  page={currentPage}></ShopPagination>
              </div>
            </section>
          </div>
          <div className='col-lg-3 col-12'>
            <aside>
              <CategoriesList categoryActive={categoryActive} filterCategory={filterCategory}></CategoriesList>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
