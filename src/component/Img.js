import React from 'react'
export const imgPath = (path) => {
  return path.replace(/.*uploads/, 'http://localhost:8090/uploads')
}

const Img = (props) => {
  return (
    <img
      {...props} 
      src={props.src ? imgPath(props.src) : ""}
      lazySrc={props.lazySrc ? imgPath(props.lazySrc) : ""}
      alt={props.alt ? props.alt : ""}
    />
  )
}

export default Img