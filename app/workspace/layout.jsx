import React from 'react'
import Workspaceprovider from './provider'

function Workspacelayout({children}) {
  return (
    <Workspaceprovider>
        {children}
    </Workspaceprovider>
  )
}

export default Workspacelayout