//getting the request sent by the user

function getReqBooks(req){
 return new Promise((resolve,reject)=>{
     try{
         let body = "";
         req.on("data", load =>{
             body += load.toString();
         });
         req.on("end",()=>{
             resolve(body);
         })
     }
     catch(error){
         reject(error);
     }
 })
}

module.exports = {getReqBooks};