// 직소 퍼즐 게임 - Pointer Events 지원 (마우스/터치 공통)
// 기본 이미지
// 오프라인 대응을 위해 기본 이미지를 프로젝트 내부 파일로 변경
const DEFAULT_IMAGE = '/static/default.jpg';

const boardEl = document.getElementById('board');
const previewImg = document.getElementById('preview');
const shuffleBtn = document.getElementById('shuffle');
const resetBtn = document.getElementById('reset');
const peekBtn = document.getElementById('peek');
const difficultySel = document.getElementById('difficulty');
const movesEl = document.getElementById('moves');
const timeEl = document.getElementById('time');
const imgUrlInput = document.getElementById('imgUrl');
const loadImgBtn = document.getElementById('loadImg');

let grid = 4; // default 4x4
let tileSize = 80; // px, 화면 크기에 따라 동적으로 조정
let imgURL = DEFAULT_IMAGE;
let tiles = []; // DOM 요소 리스트
let positions = []; // 각 인덱스의 현재 위치 (0..n-1)
let timerId = null;
let seconds = 0;
let moves = 0;
let dragging = null; // {el, startX, startY, fromIndex}
let snapping = 8; // 스냅 임계값(px)

function pad(n){return String(n).padStart(2,'0');}
function fmtTime(s){const m = Math.floor(s/60); const r = s%60; return `${pad(m)}:${pad(r)}`}
function startTimer(){ if(timerId) return; timerId = setInterval(()=>{seconds++; timeEl.textContent = fmtTime(seconds)},1000)}
function stopTimer(){ if(timerId){clearInterval(timerId); timerId=null} }
function resetStats(){ seconds=0; timeEl.textContent=fmtTime(0); moves=0; movesEl.textContent='0'; }

function createBoard(autoShuffle=false){
  // 화면 크기에 맞게 타일 크기 계산
  const maxBoard = Math.min(window.innerWidth*0.92, 640);
  tileSize = Math.floor(maxBoard / grid);

  boardEl.innerHTML=''; tiles=[]; positions=[];
  const n = grid*grid;
  boardEl.style.setProperty('--grid', grid);
  boardEl.style.width = `${grid*tileSize}px`;
  boardEl.style.height = `${grid*tileSize}px`;

  previewImg.src = imgURL;
  previewImg.onload = ()=>{
    // 타일 생성
    for(let i=0;i<n;i++){
      const x = i % grid;
      const y = Math.floor(i / grid);
      const el = document.createElement('div');
      el.className = 'tile';
      el.style.width = `${tileSize}px`;
      el.style.height = `${tileSize}px`;
      // 배경 이미지의 위치 계산
      const bgX = -x*tileSize;
      const bgY = -y*tileSize;
      el.style.backgroundImage = `url(${imgURL})`;
      el.style.backgroundSize = `${grid*tileSize}px ${grid*tileSize}px`;
      el.style.backgroundPosition = `${bgX}px ${bgY}px`;
      // 정답 인덱스를 data에 저장
      el.dataset.index = String(i);
      // 이벤트 바인딩
      bindDragEvents(el);
      boardEl.appendChild(el);
      tiles.push(el);
      positions.push(i);
    }
    layoutTiles();
    if (autoShuffle) {
      // 레이아웃 직후 즉시 섞고 타이머 시작
      shuffle();
    }
  };
}

function layoutTiles(){
  for(let i=0;i<tiles.length;i++){
    const posIndex = positions[i]; // i번째 타일이 놓인 칸 인덱스
    const x = posIndex % grid;
    const y = Math.floor(posIndex / grid);
    tiles[i].style.transform = `translate(${x*tileSize}px, ${y*tileSize}px)`;
  }
}

function shuffle(){
  // 피셔-예이츠 셔플로 위치 배열만 섞기
  const n = positions.length;
  for(let i=n-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  moves=0; movesEl.textContent='0'; resetTimer(); startTimer();
  layoutTiles();
}

function reset(){
  positions = positions.map((_,i)=>i);
  resetTimer();
  layoutTiles();
}

function resetTimer(){ stopTimer(); seconds=0; timeEl.textContent=fmtTime(0); }

function checkSolved(){
  for(let i=0;i<positions.length;i++){
    if(positions[i]!==i) return false;
  }
  return true;
}

function onSolved(){
  stopTimer();
  setTimeout(()=>{
    alert(`클리어! 시간 ${fmtTime(seconds)}, 이동 ${moves}회`);
  }, 100);
}

function bindDragEvents(el){
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    startTimer();
    const rect = boardEl.getBoundingClientRect();
    const fromTileIndex = tiles.indexOf(el);
    const fromPosIndex = positions[fromTileIndex];
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    const x0 = (fromPosIndex % grid) * tileSize;
    const y0 = Math.floor(fromPosIndex / grid) * tileSize;
    dragging = { el, startX, startY, fromIndex: fromTileIndex, x0, y0 };
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
  });

  el.addEventListener('pointermove', (e)=>{
    if(!dragging || dragging.el!==el) return;
    const rect = boardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - dragging.startX;
    const dy = y - dragging.startY;
    const fromPosIndex = positions[dragging.fromIndex];
    const x0 = (fromPosIndex % grid) * tileSize;
    const y0 = Math.floor(fromPosIndex / grid) * tileSize;
    el.style.transform = `translate(${x0+dx}px, ${y0+dy}px)`;
  });

  el.addEventListener('pointerup', (e)=>{
    if(!dragging || dragging.el!==el) return;
    el.releasePointerCapture(e.pointerId);
    el.classList.remove('dragging');

    const rect = boardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 드롭된 칸 계산
    const col = Math.max(0, Math.min(grid-1, Math.round((x)/tileSize-0.5)));
    const row = Math.max(0, Math.min(grid-1, Math.round((y)/tileSize-0.5)));
    const targetPosIndex = row*grid + col;

    // 현재 드래그 중이던 타일이 차지하던 위치
    const fromTileIndex = dragging.fromIndex;
    const fromPosIndex = positions[fromTileIndex];

    // 그 위치에 이미 어떤 타일이 있는지 찾아 스왑
    const otherTileIndex = positions.findIndex(p=>p===targetPosIndex);
    if(otherTileIndex!==-1){
      [positions[fromTileIndex], positions[otherTileIndex]] = [positions[otherTileIndex], positions[fromTileIndex]];
      moves++; movesEl.textContent = String(moves);
      layoutTiles();
      if(checkSolved()) onSolved();
    } else {
      // 스냅해서 제자리로
      layoutTiles();
    }

    dragging=null;
  });
}

function applyImage(url){
  imgURL = url || DEFAULT_IMAGE;
  previewImg.src = imgURL;
  // 타일 배경 갱신
  tiles.forEach((el)=>{
    el.style.backgroundImage = `url(${imgURL})`;
  });
}

function changeDifficulty(v, autoShuffle=false){
  grid = parseInt(v,10) || 4;
  resetStats();
  createBoard(autoShuffle);
}

shuffleBtn?.addEventListener('click', shuffle);
resetBtn?.addEventListener('click', reset);
peekBtn?.addEventListener('click', ()=>{
  document.body.classList.toggle('show-preview');
});

difficultySel?.addEventListener('change', (e)=>{
  changeDifficulty(e.target.value);
});

loadImgBtn?.addEventListener('click', ()=>{
  const url = imgUrlInput.value.trim();
  if(url) applyImage(url);
});

// 초기화 및 서비스워커 등록
window.addEventListener('load', ()=>{
  imgUrlInput.value = DEFAULT_IMAGE;
  // 서비스워커 등록(PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  }
  // 최초 진입 시 자동 섞기 + 즉시 플레이 가능
  changeDifficulty(difficultySel?.value || '4', true);
});
