import { useState, useEffect } from "react";

import './OrbitStyles.css'

function NavOrbit() {

    type downlinkedOrbit = {
        "apoapsis": number,
        "periapsis": number,
        "refbody": string,
        "sit": string
    }

    type bodyCount = {
        "bodynum": number;
    }

    type body = {
        "id": number;
        "name": string;
    }
    
    const [datalink, setDatalink] = useState<downlinkedOrbit>();

    const [counter, setCounter] = useState<string>();

    const [totalBodies, setTotalBodies] = useState<bodyCount>();

    //let bodyList = {}

    useEffect(()=>{
        fetch('/avcs/telemachus/datalink?bodynum=b.number')
            .then(res => res.json())
            .catch(() => {})
            .then((data) => setTotalBodies(data))
    },[])

    useEffect(()=>{
        if(totalBodies != undefined) {
            let bodyRequest = "/avcs/telemachus/datalink?"
            for(let i = 0; i < totalBodies?.bodynum; i++) {
                bodyRequest = bodyRequest + "body" + i + "=b.name[" + i + "]&" 
            }
            console.log(bodyRequest)

            
        }
    },[totalBodies])

    useEffect(()=>{
        const intervalSlow = setInterval(() => {
            setCounter("" + new Date().getTime())
        }, 1000);

        return () => clearInterval(intervalSlow)
    }, [counter])

    useEffect(() => {
        fetch(
            '/avcs/telemachus/datalink?' +
            'refbody=o.referenceBody&' +
            'apoapsis=o.ApA&' +
            'periapsis=o.PeA&' +
            'sit=v.situation&'
            
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))
        

    }, [counter]);


    return(
        <>
            <div className="box-body" style={{justifyContent: "flex-start"}}>
                {/* <div style={{width: "200px", height: "100px", backgroundColor: "white", borderColor: "white",
                    clipPath: "ellipse(50% 30%)", borderWidth: "1px", borderStyle: "solid"
                }}>
                    <div style={{width: "200px", height: "100px", backgroundColor: "black",
                        clipPath: "ellipse(50% 30%)"
                    }}></div>

                </div> */}
                <div style={{textAlign: "left"}}>
                    <p>ApA: {datalink?.apoapsis == undefined? "N/A" : datalink.apoapsis}</p>
                    <p>PeA: {datalink?.periapsis == undefined? "N/A" : datalink.periapsis}</p>
                    <p>{datalink?.sit}</p>
                    <p>{totalBodies == undefined ? "N/A" : totalBodies.bodynum}</p>
                </div>
                

                <div style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "200px",
                    height: "200px",
                    backgroundColor: "white",
                    clipPath: "ellipse(50% 30%)"
                }}></div>

                {/* <div style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "199px",
                    height: "199px",
                    backgroundColor: "black",
                    clipPath: "ellipse(50% 30%)"
                }}></div> */}


                <div style={{position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100px",
                    height: "100px",
                    backgroundColor: "black",
                    borderColor: "green",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderRadius: "50%"
                }}>
                    <div>
                        <p className="refBody">{datalink?.refbody == undefined? "N/A" : datalink.refbody}</p>
                        <p>*</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NavOrbit