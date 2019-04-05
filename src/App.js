import React, { useState, useRef, useEffect } from 'react';
const WIDTH = 900;
const HEIGHT = 600;
const w = 20;
let ctx;

function App() {
  const canvas = useRef(null);
  const randomArray = [...Array(WIDTH / w)].map(() => Math.random() * HEIGHT);

  useEffect(() => {
    ctx = canvas.current.getContext('2d');

    drawArray(ctx, randomArray);
    quickSort(randomArray, 0, randomArray.length - 1);
  })

  return (
    <div style={center}>
      <canvas ref={canvas} style={canvasStyle} width={WIDTH} height={HEIGHT} />
    </div>
  )
};

function drawArray(ctx, array) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  array.map((value, index) => {
    rect(ctx, index * w, HEIGHT - value, w, value);
  })
}

function rect(ctx, x, y, w, h) {
  ctx.fillStyle = '#08B69F';
  ctx.fillRect(x, y, w, h);
  ctx.stroke();
}

async function quickSort(arr, start, end) {
  if (start >= end) return;

  const index = await partition(arr, start, end);
  drawArray(ctx, arr);

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ])
}

async function partition(arr, start, end) {
  const pivot = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);
  return pivotIndex;
}

async function swap(arr, a, b) {
  await sleep(50);
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const center = { textAlign: 'center' };
const canvasStyle = { backgroundColor: 'black' }

export default App;
