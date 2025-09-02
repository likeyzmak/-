import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <main class="container">
      <header class="top">
        <h1>직소 퍼즐</h1>
        <div class="controls">
          <label>
            난이도
            <select id="difficulty">
              <option value="3">3 × 3</option>
              <option value="4" selected>4 × 4</option>
              <option value="6">6 × 6</option>
              <option value="8">8 × 8</option>
            </select>
          </label>
          <button id="shuffle">섞기</button>
          <button id="peek">원본 보기</button>
          <button id="reset">리셋</button>
        </div>
        <div class="stats">
          <span>시간: <b id="time">00:00</b></span>
          <span>이동: <b id="moves">0</b></span>
        </div>
      </header>

      <section class="boards">
        <div class="board" id="board"></div>
        <div class="preview">
          <img id="preview" alt="원본" />
        </div>
      </section>

      <footer class="bottom">
        <label class="imgurl">
          이미지 URL
          <input type="url" id="imgUrl" placeholder="이미지 주소 붙여넣기" />
          <button id="loadImg">불러오기</button>
        </label>
      </footer>
    </main>
  )
})

export default app
