import { useEffect, useState } from "react";

function Navball() {

    type downlinkedNav = {
        "heading": number,
        "pitch": number,
        "roll": number,
        "ovelx": number
    }

    const [datalink, setDatalink] = useState<downlinkedNav>({
        heading: 30,
        pitch: 12,
        roll: 20,
        ovelx: 0
    });

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
            'ovelx=v.angleToPrograde&'
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))
    }, [counter]);

    return(
        <>
            <div className="box-body">

                {datalink?.ovelx}

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
                                <br /><p>━</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>━</p>
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
                                <br /><p>━</p>
                                <br /><br /><p>30 -</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>60 -</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>90 -</p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderColor: "gray", borderWidth: "2px", borderStyle: "solid", width: "6.5rem", textAlign: "left",
                        zIndex: "1", position: "relative",
                        backgroundColor: "rgba(0, 0 , 0, 0.6)"
                    }}>{datalink?.roll == undefined? "N/A" : "roll: " + Math.floor(datalink.roll) + " ↻"}</div>

                    <hr style={{width: "35vw", borderWidth: "1.5px", zIndex: "1", position: "relative"}} />

                    <div style={{
                        borderColor: "gray", borderWidth: "2px", borderStyle: "solid", width: "6.5rem", textAlign: "left",
                        zIndex: "1", position: "relative",
                        backgroundColor: "rgba(0, 0 , 0, 0.6)"
                    }}>{datalink?.pitch == undefined? "N/A" : "pitch: " + Math.floor(datalink.pitch) + " ⇕"}</div>

                    <div style={{position: "relative", overflowY: "clip", transform: "translate(0%, "+ datalink?.pitch +"%)", color: "chocolate"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                                <br /><p>━</p>
                                <br /><br /><p>- 30</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>- 60</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>- 90</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", textAlign: "right", width: "55%"}}>
                                <div style={{backgroundColor: "rgba(123,63,0, 0.5)"}}>
                                    <hr style={{width: "100%", borderColor: "chocolate", margin: "0 0"}} />
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                        <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <div>\</div> <div>\</div> <div>\</div> <div>\</div> <div>\</div>
                                        <div>\</div> <div>\</div> <div>\</div> <div>\</div> <div>\</div>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                        <div>/</div> <div>/</div> <div>/</div> <div>/</div> <div>/</div>
                                    </div>
                                </div>
                                <br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><br />
                                <br /><br /><p style={{display: "flex", justifyContent: "space-around"}}>X</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}>
                                <br /><p>━</p>
                                <br /><br /><p>30 -</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>60 -</p>
                                <br /><br /><p>━</p>
                                <br /><br /><p>90 -</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    position: "absolute",
                    top: "20vh",
                    left: "30px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}>
                    <div style={{
                        borderColor: "gray", borderWidth: "2px", borderStyle: "solid", borderRadius: "10rem",
                        width: "10rem", height: "10rem"
                    }}>
                        <div style={{
                            position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between",
                            height: "9.7rem"
                        }}>
                            <div>
                                <p>|</p>
                                <p style={{color: "red"}}>N</p>
                            </div>
                            <div>
                                <p>180</p>
                                <p>|</p>
                            </div>
                        </div>

                        <div style={{
                            position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between",
                            width: "10rem", top: "-55%"
                        }}>
                            <p>━ 270</p>
                            <p>90 ━</p>
                        </div>
                        
                        <div style={{
                            borderColor: "gray", borderWidth: "2px", borderStyle: "solid", width: "100%", textAlign: "left"
                        }}>{datalink?.heading == undefined? "N/A" : "hdg: " + Math.floor(datalink.heading) + " ⇔"}</div>
                    </div>

                    {/*HEADING ARROW*/}
                    <div style={{position: "relative", bottom: "5.8rem", rotate: datalink?.heading - 90 + "deg", textAlign: "right"}}>
                        <p style={{color: "red", fontWeight: "900"}}>━▷━━ ━</p>
                    </div>

                </div>
            </div>
        </>
  )
}

export default Navball