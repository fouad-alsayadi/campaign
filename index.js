const express = require('express');


const app = express();

app.get("/",(req,res)=>{
   res.send({hey:"there"}); 
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});