var books = require("./books");

class Controller{
    async getBooks(){
        return new Promise ((resolve, _)=> resolve(books));
    }

    //get one book
    async getBook(id){
        return new Promise((resolve, reject)=>{
            const book = books.find(book => book.id === parseInt(id));
        if(!book){
            reject(`Book with id ${id} not found`);
        }else {
            resolve(book);
        }
        });
    }
    //create a book
    async createBook(book){
        return new Promise((resolve, _)=>{
            let newBook = {
                id: Math.floor(5 + Math.random()*10),
                ...book
            };
            resolve(newBook);
        });
    }

    //update a book
    async updateBook(id){
        return new Promise((resolve, reject)=>{
            let book = books.find(book => book.id === parseInt(id));
            if(!book){
                reject(`Book with id ${id} not found`);
            }
            else {
                book["completed"] = true;
                resolve(book);
            }

        });
    }
    //delete a book
    async deleteBook(id){
        return new Promise ((resolve,reject)=>{
            let book = books.find(book => book.id === parseInt(id));
            if(!book){
                reject(`Book with id ${id} not found`);
            }
            else {
                resolve("Book deleted successfully");
            }
        });
    }
    }

    module.exports = Controller;