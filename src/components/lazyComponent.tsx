import React, { Suspense }from 'react'

const lazyComponent = (children: any) => {
    return (
        <Suspense fallback="loading">
            {children}
        </Suspense>
    )
}

export default lazyComponent