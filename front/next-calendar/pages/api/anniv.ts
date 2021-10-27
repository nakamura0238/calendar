// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Anniv = {
  date: string
  yyyy: number
  mmdd: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Anniv[]>
) {
  res.status(200).json([
    {date : "1958-2-14", yyyy : 1958, mmdd : "2-14"} // バレンタイン
    , {date : "1978-3-14", yyyy : 1978, mmdd : "3-14"} // ホワイトデー
    , {date : "1564-4-1", yyyy : 1564, mmdd : "4-1"} // エイプリルフール
    , {date : "1890-5-1", yyyy : 1890, mmdd : "5-1"} // メーデー
    , {date : "2019-5-27", yyyy : 2019, mmdd : "5-27"} // ドラゴンクエストの日
    , {date : "1956-12-1", yyyy : 1956, mmdd : "12-1"} // 映画の日
  ])
}
