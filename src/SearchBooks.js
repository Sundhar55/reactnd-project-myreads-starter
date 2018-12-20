// src/SearchBook.js

import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
class SearchBooks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            query:'',
            books:[],
            shelfedBooks : this.props.shelfedBooks,
            updateShelf : this.props.updateShelf,
            searchBooks : this.props.searchBooks
            
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    SearchBooks = (query)=>{
        //sets the query based on the value typed
        
        const trimmedQuery = query.trim();
        //get the search results from the api
        if(query.trim() !==''){
        BooksAPI.search(trimmedQuery)
        .then((books)=> {
            this.setState(()=>({books: (books)}))
            
          }) 
        }
        if(trimmedQuery === ''){
            this.setState(()=> ({books: []}))
            
        }
    }
    handleChange(e){
        const query = e.target.value;
        this.setState(()=>({
            query : query
        }));
        this.SearchBooks(query)
    }

    render(){
        return(
                <div className="search-books">
                    <div className="search-books-bar" > 
                        <Link className= 'close-search' to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" 
                                placeholder="Search by title or author"
                                value={this.state.query}
                             /*  onChange={(event)=> this.SearchBooks(event.target.value)} */
                               onChange={this.handleChange} 
                                />
                        </div>
                    </div>                    
                    <div className='search-books-results' >
                        <ol className='books-grid'>
                            {this.state.books.length >0 && 
                                this.state.books.map((book) => (
                                <li className='b' key={book.id} >
                                    <Book book ={book} query={this.state.query}
                                        shelf = {
                                            this.state.shelfedBooks.filter(sb => sb.bookId === book.id)
                                        } 
                                        updateShelf ={this.state.updateShelf}/>
                                </li>
                            ))}
                          
                        </ol>
                    </div>    
                    {this.state.books.length ===0 &&
                    <div className='book-authors'> No Results</div>}             
                </div>                        
        )
    }
}

export default SearchBooks;