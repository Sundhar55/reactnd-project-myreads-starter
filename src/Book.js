//src/book.js

import React from 'react';
//import * as BooksAPI from './BooksAPI';

class Book extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            optionsData :[
                {key: 1, value: 'move', text: 'Move to...'},
                {key: 2, value: 'currentlyReading', text: 'Currently Reading'},
                {key: 3, value: 'wantToRead', text: 'Want To Read'},
                {key: 4, value: 'read', text: 'Read'},
                {key: 5, value: 'none', text: 'None'}
            ],
        book : this.props.book,
        query : this.props.query,
        bookShelf : this.props.shelf,
        
        } 
    }
    componentDidMount(){
     /*   BooksAPI.get(this.state.book.id)
            .then((book) => {this.setState(
                (book => ({bookShelf: book.shelf}))
            )}
                
            ) */
            console.log('Mount in Book');
            console.log(this.props.shelf);
    }
    updateShelf=this.props.updateShelf;
    handleChange=(e)=>{
        console.log(e.target.value);
        console.log(this.state.book);
        //const val = this.state.optionsData.filter((item)=> item.value === e.target.value);
        const shelf = e.target.value;
        console.log(shelf);
        const book = this.state.book;
        this.updateShelf(this.state.book, shelf);
        this.setState(()=>({
            book : book
        }))
        e.target.selected = true;
    }

    render(){
        console.log(this.state.book.id)
        console.log(this.state.bookShelf)
        console.log('in book');
        const stat = (
                        this.state.bookShelf.length === 1) ?
        this.state.bookShelf[0].shelf  :'none'
        //console.log(this.state.bookShelf.shelf)
        console.log(stat);
        return(
            <div className='book' style={{text :'bold'}}>
                <div className='book-top'>
                    <div className='book-cover'
                        style={{ width: 128, height: 193,
                            backgroundImage: (this.state.book.imageLinks !== undefined)
                            ? `url(${this.state.book.imageLinks.smallThumbnail})` 
                            : `url({${'./icons/add.svg'}})`
                             }}
                        > 
                    </div>
                    <div className="book-shelf-changer">
                        <select value ={stat} onChange = {this.handleChange}>
                            {this.state.optionsData.map(option =>(
                                <option key={option.key} 
                                        value={option.value} 
                                    disabled = {option.key ===1 && (true)} 
                                   
                                     >
                                    {option.text}</option>                            
                            ))}
                            
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">
                    {this.state.book.authors +', '  }
                </div>
            </div>
        )
    }
}

export default Book;