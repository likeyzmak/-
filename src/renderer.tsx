import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>직소 퍼즐</title>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}
        <script type="module" src="/static/app.js"></script>
      </body>
    </html>
  )
})
