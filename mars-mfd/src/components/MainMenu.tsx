import { Link } from "react-router-dom"

import "./Styles.css"

function MainMenu() {

  return (
    <>
      <div className="box-body">
        <div style={{textAlign: "left", marginLeft: "1rem"}}>
          - <Link to="/stby">Standby</Link>
        </div>
      </div>
    </>
  )
}

export default MainMenu
