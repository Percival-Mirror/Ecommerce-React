import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {

    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

    const [categorySelected, setCategorySelected] = useState('all')

    const [searchInput, setSearchInput] = useState("")

    const navigateSearch = useNavigate()

    const onInputChange = (event) => {
        setSearchInput(event.target.value)
    }

    const onSelectChange = (event) => {
        setCategorySelected(event.target.value)
        console.log(event.target.value)
    }

    const [search, setSearch] = useState({ category: "", input: "" })

    useEffect(() => {
        setSearch({ category: categorySelected, input: searchInput })
    }, [categorySelected, searchInput])

    const onSubmitSearch = (event) => {
        event.preventDefault()
        navigateSearch('/shop', { state: search })
    }

    return (
        <form onSubmit={onSubmitSearch}>
            <select onChange={onSelectChange}>
                <option selected>All</option>
                {categories.map(category => {
                    return (
                        <option>{category}</option>)
                })}
            </select>
            <input value={searchInput} onChange={onInputChange} type='text'></input>
            <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </button>
        </form>
    )
}
