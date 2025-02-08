const express=require('express');
const { SocketAddress } = require('net');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

const path=require('path');
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
var waiting_sockiet;

io.on('connection',Socket=>{
Socket.on("i-pn-s",(name)=>{
players.push(Socket.id);   console.log("socket id = " + players[numbers_of_players]);
numbers_of_players++;    console.log(numbers_of_players);

if(numbers_of_players%2===0){
    Socket.emit(Socket.id,waiting_player);
 //   Socket.emit(players[numbers_of_players-=2],name);
 //   console.log(players[numbers_of_players-1]);
 Socket.broadcast.emit(waiting_sockiet,name);
 console.log(waiting_sockiet);

}else{
waiting_player=name;
waiting_sockiet=Socket.id;
}




});



}

    Socket.on('pwr-page-r',(namee)=>{
       
      
    });
    Socket.on('p-w-r',(nam)=>{
     //true = matchmaking sucessfull  
      console.log("                         ",Socket.id);
    var matchmaking_status=matchmaking(nam,Socket.id);
       if(matchmaking_status===true){
       // console.log(gamer1_name,gamer2_name);
       // console.log(Socket.id);
         Socket.broadcast.emit(gamer1,gamer2_name,gamer1);
         Socket.broadcast.emit(Socket.id,gamer1_name,gameno);
       }
            // Socket.on(gamer1+"name1",(nam)=>{
            //     console.log(nam);
            //     Socket.broadcast.emit(gamer1+"name1rec",nam);
            // });
    });  

);


function matchmaking(a,soID){
if(totalplayers%2 === 1){
    gamer2=soID;
    gamer2_name=a;
    console.log(gamer1, gamer2);
    gameno++;
    totalplayers++;
    return true;
}else{
    gamer1=soID;
    gamer1_name=a;
    console.log(gamer1, gamer2);
    totalplayers++;
    return false;
}

}


http.listen(8000,()=>{
    console.log('server started');
})