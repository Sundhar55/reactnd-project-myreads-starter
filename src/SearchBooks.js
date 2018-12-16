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
            books:[]
        }
    }
    
    SearchBooks = (query)=>{
        //sets the query based on the value typed
        this.setState((query)=>({
            query : query.trim
        }));
        //get the search results from the api
        (query !=='') &&(
        BooksAPI.search(query)
        .then((books)=> {
            this.setState(()=>({books: books}))
            console.log(books);
            
          }) 
        )
    }
    updateShelf = (book, shelf,query) =>{
        console.log('in SearchBooks')
        console.log(book)
        console.log(shelf)
        BooksAPI.update(book,shelf)
        .then((data)=>{
            console.log(data);
            this.setState(()=>({
                books : data
            }))
        })
       // this.SearchBooks(query);
    }
    render(){
        ;
        return(
                <div className="search-books">
                    <div className="search-books-bar" > 
                        <Link className= 'close-search' to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" 
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={(event)=> this.SearchBooks(event.target.value)}/>
                        </div>
                    </div>
                    <div className='search-book-results' >
                        <ol className='books-grid'>
                            {this.state.books.length >0 && 
                                this.state.books.map((book) => (
                                <li className='b' key={book.id} >
                                    <Book book ={book} query={this.state.query} updateShelf ={this.updateShelf}/>
                                </li>
                            ))}}
                        </ol>
                    </div>                   
                </div>
                
                        
        )
    }
}

export default SearchBooks;