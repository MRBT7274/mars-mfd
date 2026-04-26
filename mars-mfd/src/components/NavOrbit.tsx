import { useState, useEffect } from "react";

function NavOrbit() {

    type downlinkedOrbit = {
            "apoapsis": number,
            "periapsis": number,
            "refbody": string
        }
    
    const [datalink, setDatalink] = useState<downlinkedOrbit>();

    const [counter, setCounter] = useState<string>();

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
            'periapsis=o.PeA'
            
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))

    }, [counter]);

    const planetoid = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100px",
        height: "100px",
        backgroundColor: "black",
        borderColor: "green",
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "50%"
    } as unknown as undefined

    const ellipse = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px",
        height: "200px",
        backgroundColor: "white",
        clipPath: "ellipse(50% 30%)",
    } as unknown as undefined

    return(
        <>
            <div className="box-body">
                {/* <div style={{width: "200px", height: "100px", backgroundColor: "white", borderColor: "white",
                    clipPath: "ellipse(50% 30%)", borderWidth: "1px", borderStyle: "solid"
                }}>
                    <div style={{width: "200px", height: "100px", backgroundColor: "black",
                        clipPath: "ellipse(50% 30%)"
                    }}></div>

                </div> */}
                <div style={ellipse}></div>
                <div style={planetoid}><p style={{color: "white"}}>{datalink?.refbody}</p></div>

            </div>
        </>
    )
}

export default NavOrbit