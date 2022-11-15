import React, { useEffect, useState } from 'react'
import socketIo from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { user } from './Join';
import Message from './Message';
import "../styles/Chat.css";


let socket;
const ENDPOINT = "http://localhost:4500/";
// const ENDPOINT = "https://ichat-app-server.herokuapp.com/";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit("message", { message, id });
        document.getElementById('chatInput').value = "";
    }
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setId(socket.id);
        })
        socket.emit('joined', { user })

        return () => {
            // socket.emit('disconnected');
            socket.off();
        }

    }, [])

    useEffect(()=>{
        // set message for users/client/self
        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        })

        // set message for other users
        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        })
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
        })
        return()=>{
            // socket.emit('disconnected');
            socket.off();
        }
    },[messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Chat app</h2>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} key={i} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        onKeyPress={(event) => event.key === 'Enter' ? send() : null}
                        type="text"
                        id="chatInput"
                        placeholder='Type a message'
                        autoComplete='off'
                    />
                    <button onClick={send} className="sendBtn">send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
