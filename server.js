const express=require('express');
const { SocketAddress } = require('net');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const path=require('path');
const { json } = require('stream/consumers');
let htm_pat=path.join(__dirname,"/index.html");
let playwf=path.join(__dirname,"/Views/playwf.html");




app.get("/",(req,res)=>{
    res.sendFile(htm_pat);
});
app.get("/playwf",(req,res)=>{
    res.sendFile(playwf);
   
});


var players=[];
let numbers_of_players=0;
var waiting_player;
var room_id=0;

io.on('connection',Socket=>{
Socket.on("i-pn-s",(name)=>{
players.push(Socket.id);   
numbers_of_players++;
console.log(numbers_of_players);   

if(numbers_of_players%2===0){
    let x=numbers_of_players;
    Socket.emit(Socket.id,waiting_player,room_id.toString(),x-2);
 const y=x-1;
    console.log("y="+y);
 Socket.broadcast.emit(players[x-2],name,room_id.toString(),x-1);
    console.log("after emit",numbers_of_players);    
}else{
waiting_player=name;
}
Socket.on("game-move", (enmy,position) =>{
let temp=players[enmy]+"moves";
console.log(temp);
Socket.broadcast.emit(temp,position);
 });
 



});

Socket.on('disconnect', () => {
    console.log(Socket.id);
});


}
)

http.listen(PORT,()=>{
    console.log('server started');
})