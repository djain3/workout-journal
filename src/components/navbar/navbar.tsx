import Image from "next/image"
import Logo from "./../../img/logo.png"

export default function Navbar() {
    return <>
        <div className="Navbar static h-18 w-full bg-neutral-900 px-2">
            <div className="flex items-center">
                <Image className="size-16 mr-2" src={Logo} alt="logo"/>
                <span className="font-bold">Workout Journal</span>
            </div>
        </div>
    </>
}