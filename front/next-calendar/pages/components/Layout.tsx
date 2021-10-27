import { ReactNode, useRef } from 'react'
import { css } from "@emotion/react"

const header = css`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 10px 0;
`


type Props = {
  children: ReactNode;
}


export const Layout = ({ children, ...props }: Props) => {

  return (
    <>
      <header css={header} {...props}>
      </header>
        {children}
    </>
  )
}
