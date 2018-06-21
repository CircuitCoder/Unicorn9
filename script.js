const MAX_CORRECTION_DELAY = 500;
const MAX_ITERATION_DELAY = 1000;

const FAULTY_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-=`~!@#$%^*()_+[]\\{}|;\':",./?';
let targetSet;

function replaceAt(str, ind, chr) {
  return str.substr(0, ind) + chr + str.substr(ind + 1);
}

function bootAnimation() {
  const delay = Math.random() * MAX_ITERATION_DELAY;
  const correction = Math.random() * MAX_CORRECTION_DELAY;
  const target = targetSet[Math.floor(Math.random() * targetSet.length)];

  if(!target.occupiedSet) target.occupiedSet = new Set();

  setTimeout(() => {
    bootAnimation();

    const targetLen = target.innerHTML.length;
    const slot = Math.floor(Math.random() * targetLen);
    if(target.occupiedSet.has(slot)) return; // Silently ignores
    target.occupiedSet.add(slot);
    const pickedChar = FAULTY_CHARS[Math.floor(FAULTY_CHARS.length * Math.random())];

    const original = target.innerHTML[slot];
    target.innerHTML = replaceAt(target.innerHTML, slot, pickedChar);

    setTimeout(() => {
      target.innerHTML = replaceAt(target.innerHTML, slot, original);
      target.occupiedSet.delete(slot);
    }, correction);
  }, delay)
}

function init() {
  // After initial paint
  setTimeout(() => {
    document.body.classList.remove('waiting')
  });

  targetSet = document.querySelectorAll('.randomize');

  bootAnimation();
}

function refresh() {
  window.location.href = window.location.href;
}

function report() {
  const date = (new Date()).toISOString();
  const filename = `report-${date}.txt`;

  const anchor = document.getElementById('tracefile');
  anchor.download = filename;

  anchor.click();

  const fns = document.getElementsByClassName('filename');
  for(const e of fns)
    e.innerHTML = filename;
  
  mask();
}

function mask() {
  const backdrop = document.getElementsByClassName('overlay-backdrop')[0];
  backdrop.classList.add('rendered');
  setTimeout(() => {
    backdrop.classList.add('shown');
  }, 500);
}

function unmask() {
  const backdrop = document.getElementsByClassName('overlay-backdrop')[0];
  backdrop.classList.remove('shown');
  setTimeout(() => {
    backdrop.classList.remove('rendered');
  }, 500);
}