import { adapter } from "./socket/adapter";

console.log("con")
adapter.on("connect",(socket: any)=>{
    console.log(socket);
  }
)

// connect to socket.io
// validate user
// manage messages
// 
// 
// 
// 
// 