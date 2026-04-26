import { Link } from "react-router-dom"

import "./Styles.css"

function MainMenu() {

  return (
    <>
      <div className="box-body">
        <div style={{textAlign: "left", marginLeft: "1rem"}}>
          <p>- <Link to="/nav">Navigation</Link></p>
          <br />
          <p>- <Link to="/stby">Standby</Link></p>
          <br />
          <p>- <a href="http://192.168.20.73:8086">Cameras</a></p>
        </div>
      </div>
    </>
  )
}

export default MainMenu
