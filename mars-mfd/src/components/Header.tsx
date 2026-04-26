import { useEffect, useState } from 'react';
import './Styles.css'

function Header() {

    type downlinkedHeader = {
        "charge": number,
        "chargeMax": number,
        "commConnect": boolean,
        "commStrength": number,
        "missionTime": string
    }

    const [datalink, setDatalink] = useState<downlinkedHeader>();

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
            'charge=r.resource[ElectricCharge]&' +
            'chargeMax=r.resourceMax[ElectricCharge]&' +

            'commConnect=comm.connected&' +
            'commStrength=comm.signalStrength&' +

            "missionTime=v.missionTimeString"
        )
            .then(res => res.json())
            .catch(() => {})
            .then(data => setDatalink(data))

    }, [counter]);


    return(
        <>
            <div className="box-header">
                <div style={{color: "yellow", textAlign: "left", margin: "0.5rem"}}>
                    <span style={{fontSize: "20px"}}>↯</span>
                    <span> {datalink?.charge == undefined ? "N/A" : Math.floor(datalink?.charge * 100 / datalink?.chargeMax * 10) / 10}%</span>
                </div>

                <div style={{color: "gray"}}>
                    {datalink?.missionTime == undefined ? "N/A" : datalink?.missionTime}
                </div>

                <div style={{
                    textAlign: "right", margin: "0.5rem", 
                    color: datalink?.commConnect == undefined ? "gray" : datalink.commConnect == false ? "red" : datalink.commStrength < 0.25 ? "red" : 'green'
                }}>
                    {
                        datalink?.commConnect == undefined ? "N/A" : 
                            datalink?.commConnect == false ? "--- --%" :
                                datalink?.commStrength > 0.75 ? "/// " + Math.floor(datalink?.commStrength * 100) + "%" : 
                                    datalink?.commStrength > 0.5 ? "-// " + Math.floor(datalink?.commStrength * 100) + "%" : 
                                        datalink?.commStrength > 0.25 ? "--/ " + Math.floor(datalink?.commStrength * 100) + "%":
                                            "--- " + Math.floor(datalink?.commStrength * 100) + "%"
                    }
                </div>
            </div>
        </>
    )
}

export default Header