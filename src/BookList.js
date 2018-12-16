//src/booklist.js

import React from 'react';
import Book from './Book';

class BookList extends React.Component{
    render(){
        const {bookList,shelf} = this.props;
        console.log('BL');
        console.log(bookList);
        return(
            <div>
                <ol className='books-grid'>
                    {bookList.map((book) => (
                        <li className='b' key={book.id} shelf={shelf}>
                            <Book book={book} />
                        </li>
                    ))}
                </ol>
            
                
            </div>
        )
    }
}

export default BookList;