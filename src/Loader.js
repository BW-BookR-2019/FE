import React from 'react'
import { PushSpinner } from "react-spinners-kit";

const Loader = () => {
  return(
    <div style={{width: '8%', position: 'absolute', top: '50%', left: '46%'}}>
      <PushSpinner
      size={50}
      color="#fff"

      // loading={loading}
      />
    </div>
  )
}

export default Loader;