import { useEffect, useState } from "react"

function App() {

  const [datalink, setDatalink] = useState();

  useEffect(() => {
    fetch('/api/telemachus/datalink?alt=v.altitude&pe=o.PeA&ap=o.ApA')
      .then(res => res.json())
      .then(data => setDatalink(data))
    
  });

  return (
    <>
      wawa {datalink?.alt}
    </>
  )
}

export default App
