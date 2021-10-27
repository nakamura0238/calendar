import {useState} from "react"
import axios from "axios"
import { css } from "@emotion/react"

/**
 * スタイル定義
 */

// メディアクエリ
const breakPoints = [640, 768, 1024, 1280]
const mq = breakPoints.map(
  bp => `@media (min-width: ${bp}px)`
)

const colorGridLine = "#bbbbbb"

const dayGrid = css`
  width: 100%;
  height: 100%;
  min-height: 55px;
  margin: 0;
  border-top: 1px solid ${colorGridLine};
  border-right: 1px solid ${colorGridLine};
  background-color: #FFFFFF;
  ${mq[0]} {
    min-height: 85px;
  }
`

const exceptGrid = css`
  color: #aaaaaa;
  background-color: #eeeeee;
`

const gridContent = css`
  padding: 5px;
  text-align: center;
`

const dayOfBirth = css `
  margin: 4px;
  padding: 4px;
  border-radius: 3px;
  text-align: center;
  color: #FFFFFF;
  background-color: #FF7777;
  &:hover {
    cursor: default;
  }
  &:before{
    content: "";
  }
  ${mq[0]} {
    &:before{
      content: "誕生日";
    }
  }
`

const anniversary = css `
  margin: 4px;
  padding: 4px;
  border-radius: 3px;
  text-align: center;
  color: #FFFFFF;
  background-color: #4488FF;
  &:hover {
    cursor: default;
  }
  &:before{
    content: "";
  }
  ${mq[0]} {
    &:before{
      content: "記念日";
    }
  }
`
const modalContainer = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`
const overray = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`

const modalContent =css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
`

const modalInner = css`
  position: relative;
  padding: 15px;
`

const closeBtn = css`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 6px 18px;
  border-radius: 3px;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #333333;
`

type GridProps = {
  date: Date
  birth: Boolean
  anniv: Boolean
  except :Boolean
}

type DateType = {
  date: string
  yyyy: number
  mmdd: string
}

export const Grid = ({date, birth, anniv, except} : GridProps) => {

  const [switchModal, setSwitchModal] = useState(false)
  const [Item, setItem] = useState<DateType[]>([])

  const openModal = () => {
    // ajax 処理
    const getItem = async() => {
      await axios.get<DateType[]>('/api/birth')
        .then(res => {
          let year = date.getFullYear()
          let mmdd = (date.getMonth() + 1) + '-' + date.getDate()
          setItem(res.data.filter(d => (d.yyyy <= year) && (d.mmdd == mmdd)))
        })
    }
    getItem()
    setSwitchModal(true)
  }

  const closeModal = () => {
    setSwitchModal(false)
  }

  return (
    <>
      <div css={[dayGrid, except ? exceptGrid : undefined]} onClick={openModal}>
        <p css={gridContent}>{date.getDate()}</p>
        { birth ? <p css={dayOfBirth}></p> : undefined }
        { anniv ? <p css={anniversary}></p> : undefined }
      </div>
    
      {switchModal ?
        <div css={modalContainer}>
          <div css={overray} onClick={closeModal}></div>
          <div css={modalContent}>
            <div css={modalInner}>
              <p>{date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}</p>
              {Item.map((d, i) => <p key={i}>{d.date}</p>)}
            </div><button css={closeBtn} onClick={closeModal}>close</button>
          </div>
        </div>
      : <></>
      }
    </>
  )
}

export const DummyGrid = ({date} : GridProps) => {
  return (
    <>
      <div css={[dayGrid, css`color: #aaaaaa; background-color: #eeeeee;`]}>
        <p css={gridContent}>{date.getDate()}</p>
      </div>
    </>
  )
}