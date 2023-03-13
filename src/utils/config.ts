import Configstore from "configstore";
import { resolve } from "path";
import { readFileSync } from "fs";
import { config as env } from "dotenv";
env();

const pkg: File.Package = JSON.parse(
  readFileSync(resolve(__dirname, "..", "..", "package.json"), "utf8")
);

// Create a Configstore instance.
const config = new Configstore(pkg.name, {
  version: pkg.version,
  url:
    process.env.NODE_ENV !== "development"
      ? "https://socket-io-server-j1ay.onrender.com"
      : "http://localhost:3333",
});

export default config;
