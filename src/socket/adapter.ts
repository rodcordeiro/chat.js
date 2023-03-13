import socket from "socket.io-client";
import config from "../utils/config";

const URL = config.get("url");
const adapter = socket(URL);
export { adapter };
