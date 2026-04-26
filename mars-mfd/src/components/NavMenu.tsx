import { Link } from "react-router-dom"

import "./Styles.css"

function NavMenu() {

  return (
    <>
      <div className="box-body">
        <div style={{textAlign: "left", marginLeft: "1rem"}}>
          <p>- <Link to="/nav/navball">Navball</Link></p>
          <br />
          <p>- <Link to="/nav/orbit">Orbit</Link></p>
          <br />
        </div>
      </div>
    </>
  )
}

export default NavMenu