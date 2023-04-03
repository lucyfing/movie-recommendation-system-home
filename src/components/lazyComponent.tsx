import { Spin } from 'antd'
import React, { Suspense }from 'react'

const lazyComponent = (children: any) => {
    return (
        <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'40rem'}}><Spin/></div>}>
            {children}
        </Suspense>
    )
}

export default lazyComponent