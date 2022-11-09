import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./component/pages/Join";
import Chat from "./component/pages/Chat";

const ENDPOINT = "http://localhost:4500/";
const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

function App() {
  // socket.on("connect", () => {
  //   console.log("new connection client");
  // })
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
