const express=require('express');
const { SocketAddress } = require('net');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

const path=require('path');
const { json } = require('stream/consumers');
let htm_pat=path.join(__dirname,"/index.html");
let playwf=path.join(__dirname,"/Views/playwf.html");
let gamer1;
let gamer2;
let gamer1_name;
let gamer2_name;

let gameno=0;
let totalplayers=0;
//arr[0]={namee:"nishan", add:12};

app.get("/",(req,res)=>{
    res.sendFile(htm_pat);
});
app.get("/playwf",(req,res)=>{
    res.sendFile(playwf);
   
});


var players=[];
var numbers_of_players=0;
var waiting_player;
var room_id=0;

io.on('connection',Socket=>{
Socket.on("i-pn-s",(name)=>{
players.push(Socket.id);   
numbers_of_players++;    

if(numbers_of_players%2===0){
    Socket.emit(Socket.id,waiting_player,room_id.toString(),2);
 Socket.broadcast.emit(players[numbers_of_players-=2],name,room_id.toString(),1);
  //Socket.on(room_id.toString(),player_no,position=>{
    Socket.on("0", (xx) =>{
        // console.log(player_no + "     " + position);
        console.log(xx);
      
       });       
}else{
waiting_player=name;
}
Socket.on("0", (xx) =>{
  // console.log(player_no + "     " + position);
  console.log(xx);

 });
 



});



}
)

http.listen(8000,()=>{
    console.log('server started');
})