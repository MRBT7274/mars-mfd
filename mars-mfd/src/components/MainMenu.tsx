import { Link } from "react-router-dom"

function MainMenu() {

  return (
    <>
      <div style={{textAlign: "left", marginLeft: "1rem"}}>
        - <Link to="/stby">Standby</Link>
      </div>
    </>
  )
}

export default MainMenu
