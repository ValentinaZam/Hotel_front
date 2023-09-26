import React from 'react';


const Filter = ({ category, selectedCategory, handleSelectChange, textCategory }) => {
    return (<div className="sort_box">
        <p className="text">{textCategory}</p>
        <select className="sort" value={selectedCategory} onChange={handleSelectChange}>

            <option className="option" value=""></option>
            {category.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>

    </div>)
}

export default Filter