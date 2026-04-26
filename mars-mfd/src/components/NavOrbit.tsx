
function NavOrbit() {

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
        clipPath: "ellipse(50% 30%)"
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
                <div style={planetoid}></div>
                <div style={ellipse}></div>

            </div>
        </>
    )
}

export default NavOrbit