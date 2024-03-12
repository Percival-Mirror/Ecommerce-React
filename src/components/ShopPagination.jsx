import { Pagination } from '@mui/material'
import React from 'react'

export const ShopPagination = ({totalProducts, productsPerPage, handleChange, page}) => {
    return (
        <>
            <Pagination count={Math.ceil(totalProducts / productsPerPage)} shape="rounded" page={page} onChange={handleChange}/>
        </>
    )
}
