import { useEffect, useState } from "react"

function App() {

  const [datalink, setDatalink] = useState();

  const [cameras, setCameras] = useState<Array<object>>();

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('/cameras/cameras')
      .then(res => res.json())
      .then(data => setCameras(data))
  }, [])

  useEffect(() => {
    fetch('/avionics/telemachus/datalink?alt=v.altitude&pe=o.PeA&ap=o.ApA')
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
      <p>wawa {datalink?.alt}</p>

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
