import { useEffect, useState } from "react"

function MainMenu() {

  type downlinked = {
    "altitude": number,
    "periapsis": number,
    "apoapsis": number
  }

  const [datalink, setDatalink] = useState<downlinked>();

  const [counterQuick, setCounterQuick] = useState<string>();
  const [counterSlow, setCounterSlow] = useState<string>();

  useEffect(() => {

  }, [counterSlow])

  useEffect(() => {
    fetch('/avcs/telemachus/datalink?altitude=v.altitude&periapsis=o.PeA&apoapsis=o.ApA')
      .then(res => res.json())
      .catch(() => {})
      .then(data => setDatalink(data))
  }, [counterQuick]);

  // QUICK UPDATES
  useEffect(()=>{
    const intervalQuick = setInterval(() => {
      setCounterQuick("" + new Date().getTime())
    }, 50);

    return () => clearInterval(intervalQuick)
  }, [counterQuick])

  // SLOW UPDATES
  useEffect(()=>{
    const intervalSlow = setInterval(() => {
      setCounterSlow("" + new Date().getTime())
    }, 1000);

    return () => clearInterval(intervalSlow)
  }, [counterSlow])

  return (
    <>
      <p>wawa {datalink?.altitude}</p>

      <p>{counterQuick}</p>
      <p>{counterSlow}</p>
    </>
  )
}

export default MainMenu
