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
            
        }
    }
    
    SearchBooks = (query)=>{
        //sets the query based on the value typed
        
        this.setState((query)=>({
            query : query.trim
        }));
        //get the search results from the api
        if(query.trim() !==''){
        BooksAPI.search(query)
        .then((books)=> {
            console.log('searchResults');
            console.log(books);
            this.setState(()=>({books: (books)}))
            console.log(books);
            
          }) 
        }
        if(query.trim() === ''){
            this.setState(()=> ({books: []}))
            console.log('no search buddy');
        }
    }

    /*updateShelf = (book, shelf,query) =>{
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
    } */
    render(){
        console.log('shelvedBooks');
        console.log(this.state.shelfedBooks);
        console.log(typeof(this.state.shelfedBooks))
       // const s = this.state.shelfedBooks.filter(b => b.bookId === book.id);
        console.log('s');
      //  console.log(s);
        return(
                <div className="search-books">
                    <div className="search-books-bar" > 
                        <Link className= 'close-search' to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" 
                                placeholder="Search by title or author"
                                value={this.state.query}
                               onChange={(event)=> this.SearchBooks(event.target.value)} 
                              /* onChange={(event)=> this.state.searchBooks(event.target.value)} */
                                />
                        </div>
                    </div>
                    
                    <div className='search-books-results' >
                        <ol className='books-grid'>
                            {this.state.books.length >0 && 
                                this.state.books.map((book) => (
                                <li className='b' key={book.id} >
                                    <Book book ={book} query={this.state.query}
                                        shelf = { this.state.shelfedBooks.filter((b) => b.bookId === book.id) } 
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