import { useEffect, useState } from "react"
import axios from "axios"
import { css } from "@emotion/react"
import { Grid } from "./grid"


/**
 * スタイル定義
 */

// メディアクエリ
const breakPoints = [640, 768, 1024, 1280]
const mq = breakPoints.map(
  bp => `@media (min-width: ${bp}px)`
)

const colorGridLine = "#bbbbbb"

const calendarContainer = css`
  display: flex;
  flex-direction: column;
  flex: 1 0 ;
  min-width: 300px;
  height: calc(100vh - 135px);
  border-bottom: 1px solid ${colorGridLine};
  border-left: 1px solid ${colorGridLine};
  box-sizing: content-box;
  font-family: 'Open Sans', sans-serif;
`

const rowFlex = css`
  display: flex;
  flex-direction: row;
`

const weekItem = css`
  width: 100%;
  height: 30px;
  padding: 5px 0 5px 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
  border-top: 1px solid ${colorGridLine};
  border-right: 1px solid ${colorGridLine};
  background-color: #FFFFFF;
`


/**
 * オブジェクト定義
 */

type Props = {
  dateprops: Date
}

type DateType = {
  date: string
  yyyy: number
  mmdd: string
}

type GridProps = {
  dayProps: Date
  birth: boolean
  anniv: boolean
  except: boolean
}


/**
 * 関数定義
 */

export const Calendar = ({dateprops}: Props) => {

  const toDay = new Date()
  const [birthList, setBirthList] = useState<DateType[]>([])
  const [annivList, setAnnivList] = useState<DateType[]>([])

  /** 初期データ取得 */
    useEffect(() => {
      /** 誕生日取得 */
        const getBirth = async () => {
          await axios.get<DateType[]>('/api/birth')
          .then(res => {
            setBirthList(res.data)
          })
        }
        getBirth()

      /** 記念日取得 */
        const getAnniv = async () => {
          await axios.get<DateType[]>('/api/anniv')
          .then(res => {
            setAnnivList(res.data)
          })
        }
        getAnniv()
    },[])

  /** カレンダー生成 */
  let date = dateprops

  // const week = ["日", "月", "火", "水", "木", "金", "土"]
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  let weekCount: number = 0

  let row1: GridProps[] = []
  let row2: GridProps[] = []
  let row3: GridProps[] = []
  let row4: GridProps[] = []
  let row5: GridProps[] = []
  let row6: GridProps[] = []

  let year = date.getFullYear() // 年を取得
  let month = date.getMonth() + 1 // 月は "0~11" のため "＋1" をする


  ///先月末日取得
  let beforeLastDate = new Date(year, month - 1, 0)

  // 月始取得
  let startDate = new Date(year, month - 1, 1) // 日付取得
  let startDay = startDate.getDay(); // 曜日取得

  // 月終取得
  let lastDate = new Date(year, month, 0) // 日付取得
  let lastDay = lastDate.getDay(); // 曜日取得

  // 日付グリッド数カウント
  let dummyCount = 0;


  // 日付を配列に配置
  const pushList = (date: Date, birth: boolean, anniv: boolean, except: boolean, count: number) => {
    switch (count) {
      case 1:
        row1.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
      case 2:
        row2.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
      case 3:
        row3.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
      case 4:
        row4.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
      case 5:
        row5.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
      case 6:
        row6.push({dayProps : date, birth : birth, anniv: anniv, except: except})
        break
    }
  }

  // 月始が日曜日でなければ
  if (startDay != 0 ) {
    // console.log("月始、日曜日に在らず")
    for (let i = 0; i < startDay; i++) {
      dummyCount++
      if (dummyCount % 7 == 1) {
        weekCount++
      }

      let weekDay = beforeLastDate.getDate() - startDay + 1 + i

      let mmdd: string = ((month - 1) > 0 ? (month - 1) : 12) + "-" + weekDay
      let birth: boolean = birthList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
      let anniv: boolean = annivList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
      let except: boolean = true

      pushList(new Date(year, month - 2, weekDay), birth, anniv, except, weekCount)
    }
  }
  
  // 今月の日付
  for (let i = 1; i <= lastDate.getDate(); i++) {
    dummyCount++
    if (dummyCount % 7 == 1) {
      weekCount++
    }

    let mmdd: string = month + "-" + i
    let birth: boolean = birthList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
    let anniv: boolean = annivList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
    let except: boolean = false

    pushList(new Date(year, month - 1, i), birth, anniv, except, weekCount)
  }

  // カレンダーの最終調整↓
  // 月終が土曜日でなければ、またカレンダーが6行でなければ
  if (lastDay != 6 || dummyCount / 7 != 6) {
    // console.log("月終、土曜日に在らず")
    let i = 1 //日付カウント変数
    for (i; i < 7 - lastDay; i++) {
      dummyCount++
      if (dummyCount % 7 == 1) {
        weekCount++
      }

      let mmdd: string = ((month + 1) > 12 ? 1 : (month + 1)) + "-" + i
      let birth: boolean = birthList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
      let anniv: boolean = annivList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
      let except: boolean = true

      pushList(new Date(year, month, i), birth, anniv, except,weekCount)
    }
    // カレンダーが6行になるようにグリッドを追加
    if (dummyCount / 7 != 6) {
      for (let j = 0; j < 14; j++) {
        dummyCount++
        if (dummyCount % 7 == 1) {
          weekCount++
        }

        let mmdd: string = ((month + 1) > 12 ? 1 : (month + 1)) + "-" + i
        let birth: boolean = birthList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
        let anniv: boolean = annivList.some(d => (d.yyyy <= year) && (d.mmdd == mmdd))
        let except: boolean = true

        pushList(new Date(year, month, i), birth, anniv, except,weekCount)
        i++
        if (dummyCount / 7 == 6) {
          break
        }
      }
    } 
  }

  /**
   * 判定している要素
   * ・誕生日 && 誕生日表示が生まれ年以降か
   * ・ユーザー設定記念日
   * ・今月ではない
   */

  // 行表示関数
  const createRow = (arr: GridProps[]) => {
    return (
      arr.map((value, i) => (
        <Grid key={i} date={value['dayProps']}
                      birth={value['birth']}
                      anniv={value['anniv']} 
                      except={value['except']}></Grid>
      )) 
    )
  }


  return (
    <>
      <div css={calendarContainer}>
        <div css={rowFlex}>{ week.map((value, i) => (<p key={i} css={weekItem}>{value}</p>)) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row1) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row2) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row3) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row4) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row5) }</div>
        <div css={[rowFlex, css`height: 100%;`]}>{ createRow(row6) }</div>
      </div>
    </>
  )
}