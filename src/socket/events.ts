import { adapter } from "@/socket/adapter";

adapter.on("connect",(socket:any)=>{
console.info(socket)

  }