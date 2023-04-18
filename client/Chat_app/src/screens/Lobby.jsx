import React, { useCallback, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Lobby = () => {
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");
  const socket = useSocket();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log( 'Form data ', { email, room });
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handlejoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
      console.log(`You joined room ${room} from lobby `, {email, room});
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handlejoinRoom);
    return () => {
      socket.off("room:join", handlejoinRoom);
    };
  }, [socket, handlejoinRoom]); 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          value={room}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default Lobby;
