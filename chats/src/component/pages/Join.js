import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/Join.css";

let user;
const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
}
const Join = () => {
    const [name, setName] = useState("");
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>iChat</h1>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="joinInput"
                    placeholder='Enter your name'
                    autoComplete='off'
                />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat">
                    <button onClick={sendUser} className="joinbtn">Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
export { user }