//src/book.js

import React from 'react';

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
        bookShelf : this.props.shelf.length ===1 ? this.props.shelf[0].shelf : 'none',
        targetShelfValue : 'none'
        
        
        } 
        
    }
    
    updateShelf=this.props.updateShelf;
    handleChange=(e)=>{
        const shelf = e.target.value;
        const book = this.state.book;
        this.setState(()=>({
            book : book,
            bookShelf : shelf
        }))
        this.updateShelf(this.state.book, shelf);
    }

    render(){
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
                        <select value ={this.state.bookShelf} onChange = {this.handleChange}>
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