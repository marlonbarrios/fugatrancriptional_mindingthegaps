// Minimal working version
console.log('Script loaded');

const sketch = p => {
  console.log('Sketch function called');
  
  p.setup = function() {
    console.log('Setup called');
    p.createCanvas(800, 600);
    console.log('Canvas created:', p.width, 'x', p.height);
  };
  
  p.draw = function() {
    // Simple background
    p.background(50, 50, 100);
    
    // Test shapes
    p.fill(255, 0, 0);
    p.rect(100, 100, 200, 100);
    
    p.fill(0, 255, 0);
    p.ellipse(400, 300, 150, 150);
    
    p.fill(255);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('WORKING!', p.width/2, p.height/2);
    
    // Moving element
    p.fill(255, 255, 0);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};

function initMinimal() {
  console.log('Init minimal called');
  const mainElt = document.querySelector('main');
  console.log('Main element:', mainElt);
  
  if (mainElt) {
    new p5(sketch, mainElt);
    console.log('p5 instance created');
  } else {
    console.error('Main element not found');
  }
}

// Initialize when ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initMinimal();
} else {
  document.addEventListener('DOMContentLoaded', initMinimal);
}
