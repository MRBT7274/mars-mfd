import { useState, useEffect } from "react";

import './OrbitStyles.css'

function NavOrbit() {

    type downlinkedOrbit = {
        "apoapsis": number,
        "periapsis": number,
        "major": number,
        "minor": number,
        "refbody": string,
        "eccentricity": number,
        "sit": string
    }

    type localPlanetData = {
        "radius": number,
        "surfacegee": number,
        "atmos": number
    }

    type bodyCount = {
        "bodynum": number
    }
    
    const [datalink, setDatalink] = useState<downlinkedOrbit>();

    const [currentPlanet, setCurrentPlanet] = useState<number>();

    const [refPlanetProps, setRefPlanetProps] = useState<localPlanetData>()

    const [counter, setCounter] = useState<string>();

    const [totalBodies, setTotalBodies] = useState<bodyCount>();

    const [bodyList, setBodyList] = useState<Array<string>>();

    // get total number of planets
    useEffect(()=>{
        fetch('/avcs/telemachus/datalink?bodynum=b.number')
            .then(res => res.json())
            .catch(() => {})
            .then((data) => setTotalBodies(data))
    },[])

    // create a request, and then ask for names of all planets in order of their ID's
    useEffect(()=>{
        if(totalBodies != undefined) {
            let bodyRequest = "/avcs/telemachus/datalink?"
            for(let i = 0; i < totalBodies?.bodynum; i++) {
                bodyRequest = bodyRequest + i + "=b.name[" + i + "]&";
            }
            //console.log(bodyRequest)

            fetch(bodyRequest)
                .then(res => res.json())
                .then((data) => setBodyList(data))
        }
    },[totalBodies])

    // compare current planet name to all names in the list to find ID of current planet
    useEffect(()=>{

        if(bodyList != undefined && datalink != undefined && totalBodies != undefined) {
            for(let i = 0; i < totalBodies?.bodynum; i ++) {
                if(datalink.refbody === bodyList[i]) {
                    // eslint-disable-next-line
                    setCurrentPlanet(i);
                }
            }
        }

    },[bodyList, datalink, totalBodies])

    // Fetch information about current planet speciefically
    useEffect(()=>{
        if(currentPlanet != undefined) {
            console.log("yes")
            fetch(
                '/avcs/telemachus/datalink?' +
                'radius=b.radius[' + currentPlanet + "]&" +
                'surfacegee=b.geeASL[' + currentPlanet + "]&" +
                'atmos=b.maxAtmosphere[' + currentPlanet + "]&" 
            )
                .then(res => res.json())
                .then(data => setRefPlanetProps(data))
        }

    },[currentPlanet])

    useEffect(()=>{
        const intervalSlow = setInterval(() => {
            setCounter("" + new Date().getTime())
        }, 300);

        return () => clearInterval(intervalSlow)
    }, [counter])

    useEffect(() => {
        fetch(
            '/avcs/telemachus/datalink?' +
            'refbody=o.referenceBody&' +
            'apoapsis=o.ApA&' +
            'periapsis=o.PeA&' +
            'major=o.sma&' +
            'minor=o.semiMinorAxis&' +
            'eccentricity=o.eccentricity&' +
            'sit=v.situation&'
            
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))
        

    }, [counter]);

    let scaleMultiplier
    if (datalink?.apoapsis && datalink?.eccentricity && datalink?.major && datalink?.minor && datalink?.periapsis && currentPlanet && refPlanetProps?.radius) {
        scaleMultiplier = (1 / (datalink?.major / window.innerHeight * 2.5));
    }
    else {
        scaleMultiplier = 1;
    }

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
                    <p>SMaA: {datalink?.major}</p>
                    <p>SMiA: {datalink?.minor}</p>
                    <p>State: {datalink?.sit}</p>
                    <p>total planets: {totalBodies == undefined ? "N/A" : totalBodies.bodynum}</p>
                    <p>planet ID: {currentPlanet}</p>
                    <p>planet radius: {refPlanetProps?.radius}m</p>
                    <p>eccentricity: {datalink?.eccentricity}</p>
                </div>

                <div style={{
                    position: "absolute",
                    top: "60%",
                    left: (innerWidth / 2) + "px",
                    transform: "translate(-50%, -50%)",
                    width: scaleMultiplier != 1? datalink!.major * scaleMultiplier + "px" : innerWidth / 2,
                    height: scaleMultiplier != 1? datalink!.minor * scaleMultiplier + "px" : innerWidth / 2,
                    backgroundColor: "white",
                    clipPath: "ellipse(50% 50%)"
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


                <div style={{
                    position: "absolute",
                    top: "60%",
                    left: scaleMultiplier != 1? ((innerWidth / 2) + (datalink!.major * scaleMultiplier * datalink!.eccentricity / -2)) + "px" : innerWidth / 2,
                    transform: "translate(-50%, -50%)",
                    width: scaleMultiplier != 1? refPlanetProps!.radius * scaleMultiplier + "px" : innerWidth / 3,
                    height: scaleMultiplier != 1? refPlanetProps!.radius * scaleMultiplier + "px" : innerWidth / 3,
                    backgroundColor: "rgba(0, 0, 0, 0)",
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