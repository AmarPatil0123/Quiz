import React from 'react'
import { OrbitProgress } from "react-loading-indicators";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", backgroundColor:"white", zIndex: "1000" }}>
        <OrbitProgress color="black" size="medium" text="" textColor="" />
    </div>
  )
}

export default Loading;