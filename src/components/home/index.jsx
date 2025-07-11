import React from "react"
import { SearchBar } from "../common/index.jsx"

const Home = () => {
    return (
        <div className="w-full h-full flex justify-center items-center md:justify-start md:items-end">
            <SearchBar />
        </div>
    )
}

export {
    Home
}