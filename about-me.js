const chalkAnimation = require('chalk-animation');
 
const anim = chalkAnimation.rainbow('',0.2);

const fullText = "Producing bug free code since... [Object object]"

function loop(t) {
  let lastIndex = Math.floor(t / 100)
  const replaceText = fullText.slice(0, lastIndex)
  anim.replace(replaceText);

  if (lastIndex >= fullText.length) {
    clearInterval(interval)
    const timeout = setTimeout(()=>{
      anim.replace('')
      console.clear()
      chalkAnimation.glitch(fullText)
      setTimeout(()=>{
        clearTimeout(timeout)
      }, 2000)
    }, 1000)
  }
}

const start = Date.now()

const interval = setInterval(()=>{
  loop(Date.now() - start)
}, 100)
console.clear()
loop(0)