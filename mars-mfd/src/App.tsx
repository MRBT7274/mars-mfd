import { Link, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import MainMenu from "./components/MainMenu"
import Standby from "./components/Standby"

function App() {

  
  return (
    <>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Header/>

        <Routes>
          <Route path="/" element={
            <><div className="dir"><span>root /</span><Link to="/"></Link></div><MainMenu/></>
          } />
          <Route path="/stby" element={
            <><div className="dir"><span>root / stby</span><Link to="/">←</Link></div><Standby/></>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App
