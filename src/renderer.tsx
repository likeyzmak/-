import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>귀여운 강아지 초코&송이 직소퍼즐</title>
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}
        <script type="module" src="/static/app.js"></script>
      </body>
    </html>
  )
})
