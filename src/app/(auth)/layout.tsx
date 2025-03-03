import React, { ReactNode } from 'react'

interface IAuthLayoutProps{
    children: ReactNode;
  
}

export default function layout({children}:IAuthLayoutProps) {
  return (
    <div>
        <p>Authentication</p>
        <div>{children}</div>
    </div>
  )
}
