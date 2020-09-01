import React, {useState, useEffect} from "react"
import queryString from "query-string"
import io from "socket.io-client"

import "./Chat.css"

import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"

let socket


const Chat = ({location}) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const ENDPOINT = "https://react-node-chat-learning.herokuapp.com/"

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit("join", { name, room }, () => {

        })

        return () => {
            socket.emit("diconnect")
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages(msgs => [...msgs, message])
        })

        console.log("USE EFFECT")
        socket.on("roomData", (user) => {
            console.log("ON ROOMDATA")
            setUsers(user.users)
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if(message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    console.log(message, messages)
    console.log("Users: ", users)

    return (
        <div className="outerContainer">
            <div className="container">
                {/*<input 
                value={message} 
                onChange={(event) => setMessage(event.target.value)} 
                onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
                />*/}
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat