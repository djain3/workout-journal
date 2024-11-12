"use client"
import { useContext } from "react"
import { Button } from "@mui/material"
import { ScreenStateContext } from "../body"


export default function CreateSet() {
    const {setScreenState} = useContext(ScreenStateContext)
    return <>
        <div className="container mx-auto my-5 text-center">
            <Button variant="contained" onClick={() => { setScreenState({status: 2}) }}>Create Default Set</Button>
        </div>
    </>
}