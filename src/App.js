import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import BookShelf from './BookShelf';
import BookList from './BookList';
import SearchBooks from './SearchBooks';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead  ofusing this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books : [],
    bookshelf : [
                  {text: 'Currently Reading',id : 1 , value:'currentlyReading'},
                  {text : "Want to Read", id: 2, value : 'wantToRead'},
                  {text:"Read", id: 3, value: 'read'}],
    
  }
  componentDidMount(){
    BooksAPI.getAll()
      .then((books)=> {
        this.setState(()=>({books: books}))
        console.log(books);
        
      }) 
  }
  render() {
    const {showSearchPage,bookshelf} = this.state;
    
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
                <ol className="" >
                  {this.state.books.length}
                {bookshelf.map((item)=>(
                <li key={item.id}><BookShelf name={item.text}/>
                  <BookList bookList={this.state.books.filter(book => book.shelf === item.value)} 
                    shelf={item.text}/>
                </li>
                ))}
                </ol>
              }
            
          </div>
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
            {/*<button>it</button> */}
          </div> 
          </div>
        )} />
        <Route path='/search' render={(history)=>(<SearchBooks onBack={()=>
            history.push('/')} />)} />
              
        
      </div>    
          
    )
  }
}
//trial
export default BooksApp
