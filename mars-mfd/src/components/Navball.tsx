import { useEffect, useState } from "react";

function Navball() {

    type downlinkedNav = {
        "heading": number,
        "pitch": number,
        "roll": number,
    }

    const [datalink, setDatalink] = useState<downlinkedNav>();

    const [counter, setCounter] = useState<string>();

    useEffect(()=>{
            const intervalSlow = setInterval(() => {
                setCounter("" + new Date().getTime())
            }, 150);
    
            return () => clearInterval(intervalSlow)
        }, [counter])

    useEffect(() => {
        fetch(
            '/avcs/telemachus/datalink?' +
            'heading=n.heading&' +
            'pitch=n.pitch&' +
            'roll=n.roll&' +
            'major=o.sma&'
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))
    }, [counter]);

    return(
        <>
            <div className="box-body">
                <div style={{textAlign: "left", marginLeft: "1rem"}}>
                    <p>{datalink?.heading}</p>
                    <p>{datalink?.pitch}</p>
                    <p>{datalink?.roll}</p>
                </div>
            </div>
        </>
  )
}

export default Navball