import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: '입찰 사정률 추천기',
  description: '입찰 경쟁률 분석 기반 추천 시스템',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
