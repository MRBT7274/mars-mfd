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

  const [counterQuick, setCounterQuick] = useState<string>();
  const [counterSlow, setCounterSlow] = useState<string>();

  useEffect(() => {
    // const fetchCameras = async () => {
    //   try {
    //   let res = await fetch("/cams/cameras");
    //     console.log(res);
    //   } catch (error) {
    //     console.log();
    //   }
    // }

    // fetchCameras()
    fetch('/cams/cameras').then(res => res.json()).catch(error => {if(error.code === 'ECONNREFUSED') {console.log("YES")}}).then(data => setCameras(data))
  }, [counterSlow])

  useEffect(() => {
    fetch('/avcs/telemachus/datalink?altitude=v.altitude&periapsis=o.PeA&apoapsis=o.ApA')
      .then(res => res.json())
      .then(data => setDatalink(data))
  }, [counterQuick]);

  // QUICK UPDATES
  useEffect(()=>{
    const intervalQuick = setInterval(() => {
      setCounterQuick("" + new Date().getTime())
    }, 1000);

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

      {cameras?.map((cam, key) => 
        <div key={key}>
          {cam.id}
          <img src={"/cams" + cam.snapshotUrl + "?" + counterSlow} alt="" />
        </div>
      )}

      <p>{counterQuick}</p>
      <p>{counterSlow}</p>
    </>
  )
}

export default App
