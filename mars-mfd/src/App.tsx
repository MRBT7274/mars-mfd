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

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('/cameras/cameras')
      .then(res => res.json())
      .then(data => setCameras(data))
  }, [])

  useEffect(() => {
    console.log(cameras);
  }, [cameras])

  useEffect(() => {
    fetch('/avionics/telemachus/datalink?altitude=v.altitude&periapsis=o.PeA&apoapsis=o.ApA')
      .then(res => res.json())
      .then(data => setDatalink(data))
  }, [counter]);

  useEffect(()=>{
    const interval = setInterval(() => {
      setCounter(counter + 1)
    }, 50);

    return () => clearInterval(interval)
  }, [counter])

  return (
    <>
      <p>wawa {datalink?.altitude}</p>

      {cameras?.map((cam, key) => 
        <div key={key}>
          /{cam.id}
        </div>
      )}

      <p>{counter}</p>
    </>
  )
}

export default App
