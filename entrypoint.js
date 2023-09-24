#!/usr/bin/env node

// handle signals in container
import { server as app } from "./index.js";

function shutdownGracefully() {
    console.log("Shutting down server ...");
    app.server.close();
}

process.on("SIGINT", shutdownGracefully);
process.on("SIGTERM", shutdownGracefully);