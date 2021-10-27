import { useState } from "react"
import { css } from "@emotion/react"
import { Layout } from "./components/Layout"
import { Calendar } from "./calendar/calender"


/**
 * スタイル定義
 */

// メディアクエリ
const breakPoints = [640, 768, 1024, 1280]
const mq = breakPoints.map(
  bp => `@media (min-width: ${bp}px)`
)

const btnContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 10px 0;
  ${mq[0]} {

  }
`

const btnPrevNext = css`
  padding: 8px 20px;
  border-radius: 3px;
  font-weight: 500;
  text-transform: uppercase;
  color: #FFFFFF;
  background-color: #333333;
`

const yearMonth = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin: 10px 0;
  font-size: 2rem;
  /* font-family: 'Lato', sans-serif; */
  font-family: 'Open Sans', sans-serif;
  text-align: center;
`


/**
 * 関数定義
 */

export default function Home() {

  const [dateState, setDateState] = useState<Date>(new Date())

  /** 先月へ */
  const prev = () => {
    let prevDate = new Date(dateState)
    prevDate.setMonth(dateState.getMonth() - 1)
    setDateState(prevDate)
  }

  /** 今月へ */
  const thisMonth = () => {
    setDateState(new Date())
  }

  /** 来月へ */
  const next = () => {
    let nextDate = new Date(dateState)
    nextDate.setMonth(dateState.getMonth() + 1)
    setDateState(nextDate)
  }


  return (
    <>
      <Layout>
        <div css={btnContainer}>
          <button css={btnPrevNext} onClick={prev}>prev</button>

          <p css={ yearMonth }>{ dateState.getFullYear() } / { String(dateState.getMonth() + 1).length == 1 ? "0" + (dateState.getMonth() + 1) : (dateState.getMonth() + 1) }</p>
          <button css={btnPrevNext} onClick={thisMonth}>reset</button>
          <button css={btnPrevNext} onClick={next}>next</button>
        </div>

          <Calendar css={css`flex-basis: 60%;`} dateprops={dateState} />
      </Layout>
    </>
  )
}

/**
 * 必要な機能
 * ・カレンダー
 * ・予定表示（今日の一覧、月の一覧）
 * ・予定追加
 * ・
 * ・
 */