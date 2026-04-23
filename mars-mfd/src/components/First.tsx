import { useEffect, useState } from "react"

function First() {

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
  const [camState, setCamState] = useState<number>(0);

  const [counterQuick, setCounterQuick] = useState<string>();
  const [counterSlow, setCounterSlow] = useState<string>();

  const handleCameraReq = async () => {
    
    setCamState(0);
    setCameras([]);
    fetch('/cams/cameras').then(res => res.json()).then(data => setCameras(data)).then(() => setCamState(1)).catch(() => {console.log("no server connection")});
    console.log(cameras); 

  }

  useEffect(() => {

    if(camState == 1) {
      fetch('/cams/cameras').then(res => res.json()).then(data => setCameras(data));
    }
    //fetch('/cams/cameras').then(res => res.json()).catch(error => {if(error.code === 'ECONNREFUSED') {console.log("YES")}}).then(data => setCameras(data))
  }, [counterSlow, camState])

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
      <button onClick={() => handleCameraReq()}>show cameras</button>
      <div>{camState}</div>

      {cameras?.map((cam, key) => 
        <div key={key}>
          {cam.id}
          <img src={"/cams" + cam.snapshotUrl + "?" + counterSlow} style={{width: "100%"}} onError={() => handleCameraReq()} alt={"view" + key} />
        </div>
      )}

      <p>{counterQuick}</p>
      <p>{counterSlow}</p>
    </>
  )
}

export default First
