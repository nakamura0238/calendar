// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Birth = {
  date: string
  yyyy: number
  mmdd: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Birth[]>
) {
  res.status(200).json([
    {date : "1971-9-18", yyyy : 1971, mmdd : "9-18"} // カップヌードル
    , {date : "2007-6-29", yyyy : 2007, mmdd : "6-29"} // iPhone
    , {date : "1985-11-6", yyyy : 2021, mmdd : "11-6"} // Windows
    , {date : "1998-9-4", yyyy : 1998, mmdd : "9-4"} // Google
    , {date : "1886-5-8", yyyy : 1886, mmdd : "5-8"} // コカ・コーラ
    , {date : "1998-1-8", yyyy : 1998, mmdd : "1-8"} // 私
  ])
}
