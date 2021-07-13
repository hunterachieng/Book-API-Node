const http = require("http");
const { url } = require("inspector");
const books = require("./books");
const Book = require("./controller")
const {getReqBooks} = require("./utils");

const PORT = process.env.PORT || 5300;

var server = http.createServer(async(req,res)=>{
    //get all books /api/books
    if(req.url === "/api/books" && req.method === "GET"){
        let books = await new Book().getBooks();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(books));
    }
    //get specific book
    // /api/books/:id :GET
    else if(req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "GET"){
       try{
        const id = req.url.split("/") [3];
        const book = await new Book().getBook(id);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(book));
       }
       catch(error){
           res.writeHead(404,{"Content-Type":"application/json"});
           res.end(JSON.stringify({message: error}));
       }
    }
  
    //deleting a book 
    // /api/boks/:id :DELETE

    else if(req.url.match(/\/api\/books\/([0-9]+)/)&& req.method === "DELETE"){
        try{
             const id = req.url.split("/") [3];
             const book = await new Book().deleteBook(id);
             res.writeHead(200, {"Content-Type": "application/json"});
             res.end(JSON.stringify(book));
        }
        catch(error){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }
    //updating a book
    // /api/books/:id :PUT
    else if(req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "PUT"){
        try{
            const id = req.url.split("/") [3];
            const bookUpdate = await new Book().updateBook(id);

            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(bookUpdate));
        }
        catch(error){
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }
      //creating a new book
    // /api/books : POST
    else if(req.url === "/api/books" && req.method === "POST"){
        let book_data = await getReqBooks(req);
        let newBook = await new Book().createBook(JSON.parse(book_data));

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newBook));
    };
})
server.listen(PORT, ()=> console.log(` Server is runnin on port :${PORT}`));
