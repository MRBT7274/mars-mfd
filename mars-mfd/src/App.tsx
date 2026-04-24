import { Link, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import MainMenu from "./components/MainMenu"
import Standby from "./components/Standby"
import NavMenu from "./components/NavMenu"
import Navball from "./components/Navball"
import NavOrbit from "./components/NavOrbit"

function App() {

  
  return (
    <>
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Header/>

        <Routes>
          <Route path="/" element={
            <><div className="dir"><span>sys /</span><Link to="/"></Link></div><MainMenu/></>
          } />
          <Route path="/nav" element={
            <><div className="dir"><span>sys / navigation /</span><Link to="/">[ back ]</Link></div><NavMenu/></>
          } />
          <Route path="/nav/navball" element={
            <><div className="dir"><span>sys / navigation / navball</span><Link to="/nav">[ back ]</Link></div><Navball/></>
          } />
          <Route path="/nav/orbit" element={
            <><div className="dir"><span>sys / navigation / orbit</span><Link to="/nav">[ back ]</Link></div><NavOrbit/></>
          } />
          <Route path="/stby" element={
            <><div className="dir"><span>sys / stby</span><Link to="/">[ back ]</Link></div><Standby/></>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App
