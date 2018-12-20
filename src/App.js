import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import BookShelf from './BookShelf';
import BookList from './BookList';
import SearchBooks from './SearchBooks';
import addImage from './icons/add.svg';
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books : [],
    bookshelf : [
                  {text: 'Currently Reading',id : 1 , value:'currentlyReading'},
                  {text : "Want to Read", id: 2, value : 'wantToRead'},
                  {text:"Read", id: 3, value: 'read'}],
    shelfedBooks: [],
    isShelfUpdated : false,
    query : '',
    searchedBooks : []
  }
  
  getBooks=()=>{
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(()=>({books: books}))
      this.setState(()=> ({
        shelfedBooks : books.map(book => ({bookId : book.id, shelf:book.shelf}))
      }))
      
    }) 
  }
  
  updateShelf = (book, shelf,query) =>{
    BooksAPI.update(book,shelf)
    .then((data)=>{
        this.setState(()=>({
            books : data,
           isShelfUpdated : true
        }))
    })
    this.getBooks();  
  }

  searchBooks = (query)=>{
    //sets the query based on the value typed
    this.setState(()=>({
        query : query.trim
    }));
    //get the search results from the api
    (query !=='') &&(
    BooksAPI.search(query)
    .then((books)=> {
        this.setState(()=>({books: (books)}))
      }) 
    )
  }
  componentDidMount(){
    this.getBooks();
  }  
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {(this.state.books !== undefined &&
            this.state.books.length) > 0 &&
                <div className="list-books-content" >
                  {this.state.bookshelf.map((item)=>(
                  <div key={item.id}><BookShelf name={item.text}/>
                  <BookList bookList={this.state.books.filter(book => book.shelf === item.value)} 
                    shelf={ this.state.shelfedBooks}
                    updateShelf = {this.updateShelf}
                    />
                </div>
                ))}
                </div>
              }
            
          </div>
          <div className="open-search">
          <Link to='/search'
            style={{backgroundImage:`url({${addImage}})` }}>Add a book</Link>
            
          </div> 
          </div>
        )} />
          <Route path='/search' render={(history)=>(
          <SearchBooks shelfedBooks = {this.state.shelfedBooks} 
          query = {this.state.query}
          updateShelf = {this.updateShelf}
          searchBooks= {this.searchBooks}  onBack={()=>
            history.push('/')} />)} /> 
      </div>    
    )
  }
}

export default BooksApp
