import React, { ReactNode } from 'react'

interface IDocumentLayout {
    children: ReactNode
}

export default function layout({children}: IDocumentLayout) {
  return (
    <div>
        <p>document navbar</p>
        <div>{children}</div>
    </div>
  )
}
