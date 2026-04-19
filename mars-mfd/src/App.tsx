import { useEffect, useState } from "react"

function App() {

  type downlinked = {
    "altitude": number,
    "periapsis": number,
    "apoapsis": number
  }

  type camera = {
    "id": number,
    "name": string,
    "streaming": boolean,
    "snapshotUrl": string,
    "streamUrl": string,
  }

  const [datalink, setDatalink] = useState<downlinked>();

  const [cameras, setCameras] = useState<Array<camera>>();

  const [counterQuick, setCounterQuick] = useState(0);
  const [counterSlow, setCounterSlow] = useState(0);

  useEffect(() => {
    fetch('/cameras/cameras')
      .then(res => res.json())
      .then(data => setCameras(data))
  }, [counterSlow])

  useEffect(() => {
    console.log(cameras);
  }, [cameras])

  useEffect(() => {
    fetch('/avionics/telemachus/datalink?altitude=v.altitude&periapsis=o.PeA&apoapsis=o.ApA')
      .then(res => res.json())
      .then(data => setDatalink(data))
  }, [counterQuick]);

  // QUICK UPDATES
  useEffect(()=>{
    const intervalQuick = setInterval(() => {
      if(counterQuick == 0) {
        setCounterQuick(1);
      } else {
        setCounterQuick(0);
      }
    }, 50);

    return () => clearInterval(intervalQuick)
  }, [counterQuick])

  // SLOW UPDATES
  useEffect(()=>{
    const intervalSlow = setInterval(() => {
      if(counterSlow == 0) {
        setCounterSlow(1);
      } else {
        setCounterSlow(0);
      }
    }, 3000);

    return () => clearInterval(intervalSlow)
  }, [counterSlow])

  return (
    <>
      <p>wawa {datalink?.altitude}</p>

      {cameras?.map((cam, key) => 
        <div key={key}>
          /{cam.id}
        </div>
      )}

      <p>{counterQuick}</p>
      <p>{counterSlow}</p>
    </>
  )
}

export default App
