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
                    top: window.innerHeight / 2 + "px",
                    left: "35vw",
                    transform: "translate(-0%, -0%)",
                    margin: -window.innerWidth / 20 - window.innerHeight / 3 + "px 0%",
                    transformOrigin: "center",
                    rotate: datalink?.roll + "deg"
                }}>
                    <div style={{position: "relative", overflowY: "clip", transform: "translate(0%, "+ datalink?.pitch +"%)", color: "cyan"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "column-reverse", textAlign: "left"}}>
                                <br /><p>-</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>-</p>
                                <br /><br /><div>- 90</div>
                            </div>

                            <div style={{display: "flex", flexDirection: "column-reverse", textAlign: "right"}}>
                                <br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><p>▷ ◁</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column-reverse", textAlign: "right"}}>
                                <br /><p>-</p>
                                <br /><br /><p>30 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>60 -</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>90 -</p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderColor: "gray", borderWidth: "2px", borderStyle: "solid", width: "6.5rem"
                    }}>{datalink?.roll == undefined? "N/A" : "roll: " + Math.floor(datalink.roll) + " ↻"}</div>

                    <hr style={{width: "30vw"}} />

                    <div style={{
                        borderColor: "gray", borderWidth: "2px", borderStyle: "solid", width: "6.5rem"
                    }}>{datalink?.pitch == undefined? "N/A" : "pitch: " + Math.floor(datalink.pitch) + " ⇕"}</div>

                    <div style={{position: "relative", overflowY: "clip", transform: "translate(0%, "+ datalink?.pitch +"%)", color: "chocolate"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                                <br /><p>-</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>-</p>
                                <br /><br /><p>- 90</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", textAlign: "right", width: "55%"}}>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                    <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                </div>
                                <br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><p style={{display: "flex", justifyContent: "space-around"}}>X</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}>
                                <br /><p>-</p>
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