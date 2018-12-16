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
        query : this.props.query
        } 
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
        
    }

    render(){
        
        return(
            <div className='book' style={{text :'bold'}}>
                <div className='book-top'>
                    <div className='book-cover'
                        style={{ width: 128, height: 193,
                            backgroundImage: `url(${this.state.book.imageLinks.smallThumbnail})` }}
                        > 
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange = {this.handleChange}>
                            {this.state.optionsData.map(option =>(
                                <option key={option.key} 
                                        value={option.value}>{option.text}</option>                            
                            ))}
                            
                        </select>
                    </div>
                </div>{this.state.book.title}  
            </div>
        )
    }
}

export default Book;