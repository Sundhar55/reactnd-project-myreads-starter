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
    shelfedBooks: [],
    isShelfUpdated : false,
    query : ''
  }
  
  getBooks=()=>{
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(()=>({books: books}))
      console.log(books);
      this.setState(()=> ({
        shelfedBooks : books.map(book => ({bookId : book.id, shelf:book.shelf}))
      }))
      
    }) 
  }
  
  updateShelf = (book, shelf,query) =>{
    console.log('updateing shelve for books')
    console.log(book)
    console.log(shelf)
    BooksAPI.update(book,shelf)
    .then((data)=>{
        console.log(data);
        this.setState(()=>({
            books : data,
           isShelfUpdated : true
        }))
    })
    this.getBooks();
   // this.SearchBooks(query);
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
        console.log(books);
        
      }) 
    )
  }
  componentDidMount(){
    this.getBooks();
  }  
  componentDidUpdate(prevProps,prevState){
    //if(this.props.books.length !== prevProps.books.length){
    //this.getBooks();
    //}
    console.log('CDU');
    console.log('cs');
    console.log(this.state.isShelfUpdated);
    console.log('ps')
    console.log(prevState.isShelfUpdated)
    //if(prevState.isShelfUpdated !== this.state.isShelfUpdated ){
      //  console.log('only once man');
        //this.setState({isShelfUpdated:false});
    //}
    //if(prevState.books.length === this.state.books.length ){
     // this.getBooks();
    //}
  }
  render() {
   // const {showSearchPage,bookshelf} = this.state;
    console.log('app');
    console.log(this.state.shelfedBooks)
    console.log(this.state.isShelfUpdated)
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
                {this.state.bookshelf.map((item)=>(
                <li key={item.id}><BookShelf name={item.text}/>
                  <BookList bookList={this.state.books.filter(book => book.shelf === item.value)} 
                    shelf={ this.state.shelfedBooks}
                    updateShelf = {this.updateShelf}
                    />
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
//trial
export default BooksApp
