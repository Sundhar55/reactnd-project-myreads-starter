//src/bookshelf.js

import React from 'react';

function BookShelf(props){
    return(
        
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.name}</h2>
            <div className="bookshelf-books"></div>
        </div>
    )
}

export default BookShelf