//src/booklist.js

import React from 'react';
import Book from './Book';

class BookList extends React.Component{
    render(){
        const {bookList,shelf,updateShelf} = this.props;
        
        return(
            <div>
                <ol className='books-grid'>
                    {bookList.map((book) => (
                        <li className='b' key={book.id} shelf={shelf}>
                            <Book book={book} 
                            shelf={ [{bookId : book.id, shelf : book.shelf  }]} 
                            updateShelf = {updateShelf}
                             />
                        </li>
                    ))}
                </ol>
            
                
            </div>
        )
    }
}

export default BookList;