import React from 'react'

export const CategoriesList = ({ categoryActive, filterCategory }) => {

    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

    return (
        <div className='tags-container'>
            <label>Categories</label>
            <div className='tags'>
                <button className={categoryActive == 'all' ? "tag-active" : ""} onClick={() => filterCategory("all")}>all</button>
                {categories.map(categoryInCategories => {
                    return (
                        <>
                            <button className={categoryActive == categoryInCategories ? "tag-active" : ""} onClick={() => filterCategory(categoryInCategories)}>{categoryInCategories}</button>
                        </>)
                })}
            </div>
        </div>
    )
}
