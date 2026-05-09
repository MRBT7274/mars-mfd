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

                <div style={{
                    textAlign: "center",
                    position: "absolute",
                    top: "20%",
                    left: "35vw",
                    transform: "translate(-0%, -0%)",
                    transformOrigin: "center",
                    rotate: datalink?.roll + "deg"
                }}>
                    <div style={{position: "relative", overflowY: "clip", transform: "translate(0%, "+ datalink?.pitch +"%)"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "column-reverse", textAlign: "left"}}>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 90</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column-reverse", textAlign: "right"}}>
                                <br /><br /><p>-</p>
                                <br /><br /><p>30 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>60 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>90 -</p>
                            </div>
                        </div>
                    </div>

                    <hr style={{width: "30vw"}} />

                    

                    <div style={{position: "relative", overflowY: "clip", transform: "translate(0%, "+ datalink?.pitch +"%)"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 90</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}>
                                <br /><br /><p>-</p>
                                <br /><br /><p>30 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>60 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>90 -</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Navball