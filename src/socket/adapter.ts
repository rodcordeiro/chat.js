import socket from 'socket.io-client'

const URL = "https://chat-server--jajoosam.repl.co"

export const adapter = socket(URL);
