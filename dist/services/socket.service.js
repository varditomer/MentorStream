"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../services/logger.service');
function setupSocketAPI(http) {
    const gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    });
    gIo.on('connection', (socket) => {
        // When the socket connection is established
        logger.info(`New client connected with id`, socket.id);
        // When a user joins a CodeBlock room
        socket.on('join-room', (codeBlockId) => {
            // Add the user to the CodeBlock room
            socket.join(codeBlockId);
            // Emit a 'initial-permission' event to the client to tell it whether the user has view-only or edit permissions
            const room = gIo.sockets.adapter.rooms.get(codeBlockId);
            const numClients = room ? room.size : 0;
            const hasEditPermissions = (numClients > 1);
            socket.emit('initial-permission', hasEditPermissions);
        });
        // When the socket is disconnected, remove the user from all rooms
        socket.on('leave-room', ({ roomId, myPermission }) => __awaiter(this, void 0, void 0, function* () {
            // If the user who left the room didn't has a permission to edit ->
            // check if room size is bigger than 2
            // then emit to the 2nd user deny of his permission to edit. so he will become the mentor now 
            // and the other will leave there permissions to edit
            if (!myPermission) {
                const room = gIo.sockets.adapter.rooms.get(roomId);
                const numClients = room ? room.size : 0;
                console.log(`Room ${roomId} has ${numClients} clients`);
                if (numClients > 2) {
                    const roomClients = Array.from(room);
                    gIo.to(roomClients[1]).emit('update-permission', false);
                }
            }
            socket.leave(roomId);
        }));
        socket.on('update-code', (codeBlock) => {
            // broadcast the updated code block to all clients except the sender
            socket.broadcast.emit('codeUpdated', codeBlock);
        });
        socket.on("disconnecting", () => {
            console.log(socket.rooms); // the Set contains at least the socket ID
        });
        socket.on('disconnect', () => {
            console.log(`Client disconnected with id ${socket.id}`);
        });
    });
}
module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
};
