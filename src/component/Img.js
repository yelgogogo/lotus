import React from 'react'
import { imgPath } from '../lib/util.js'
import defaultImg from '../images/default.jpg'

const Img = (props) => {
  return (
    <img
      {...props} 
      src={props.src ? imgPath(props.src) : defaultImg}
      lazysrc={props.lazysrc ? imgPath(props.lazysrc) : ""}
      alt={props.alt ? props.alt : ""}
    />
  )
}

export default Img