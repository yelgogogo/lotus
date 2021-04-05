import React from 'react'
import { imgPath } from '../lib/util.js'

const Img = (props) => {
  return (
    <img
      {...props} 
      src={props.src ? imgPath(props.src) : "http://hbimg.huabanimg.com/02fb6a8380c21c9b352bcbcb56eed48befa2d428ebe1e-pKK74E_fw658/format/webp"}
      lazySrc={props.lazySrc ? imgPath(props.lazySrc) : ""}
      alt={props.alt ? props.alt : ""}
    />
  )
}

export default Img