import './style.css';
import OpenAI from 'openai';

console.log('Sketch.js loaded');

const openAIKey = import.meta.env.VITE_OPENAI_KEY;
let openai;

// Simple state
let currentLanguage = 'English';
let scrollingText = "Transcriptional Fugue: Minding the Gaps • Dark Enlightenment Installation";
let isLoading = false;

// 5 European languages
const LANGUAGES = {
  'English': 'english',
  'German': 'german', 
  'French': 'french',
  'Italian': 'italian',
  'Spanish': 'spanish'
};

// Simple color schemes
const COLORS = {
  'English': ['#3498db', '#2980b9', '#1abc9c'],
  'German': ['#95a5a6', '#7f8c8d', '#34495e'],
  'French': ['#9b59b6', '#8e44ad', '#e74c3c'],
  'Italian': ['#27ae60', '#2ecc71', '#e74c3c'],
  'Spanish': ['#e67e22', '#d35400', '#f39c12']
};

const sketch = p => {
  console.log('Sketch function initialized');
  
  p.setup = function() {
    console.log('Setup starting...');
    p.createCanvas(p.windowWidth, p.windowHeight);
    console.log('Canvas created:', p.width, 'x', p.height);
    
    p.textFont('Helvetica');
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = function() {
    // Background color based on language
    const colors = COLORS[currentLanguage] || COLORS['English'];
    p.background(colors[0]);
    
    // Draw 3 horizontal bands
    p.noStroke();
    for (let i = 0; i < 3; i++) {
      p.fill(colors[i % colors.length]);
      const bandHeight = p.height / 3;
      p.rect(0, i * bandHeight, p.width, bandHeight);
    }
    
    // Draw scrolling text
    p.fill(255);
    p.textSize(24);
    p.text(scrollingText, p.width/2, p.height/2);
    
    // Language indicator
    p.textSize(16);
    p.text(`Language: ${currentLanguage}`, p.width/2, p.height - 50);
    
    // Instructions
    p.textSize(12);
    p.text('Press L to change language • Press SPACE for auto-cycle', p.width/2, p.height - 20);
  };
  
  p.keyPressed = function() {
    if (p.keyCode === 76) { // L key
      const languages = Object.keys(LANGUAGES);
      const currentIndex = languages.indexOf(currentLanguage);
      const nextIndex = (currentIndex + 1) % languages.length;
      currentLanguage = languages[nextIndex];
      console.log('Language changed to:', currentLanguage);
    }
  };
  
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

function onReady() {
  console.log('OnReady called');
  
  // Initialize OpenAI if key available
  if (openAIKey) {
    openai = new OpenAI({
      apiKey: openAIKey,
      dangerouslyAllowBrowser: true
    });
    console.log('OpenAI initialized');
  } else {
    console.log('No OpenAI key, using fallback');
  }
  
  // Create p5 instance
  const mainElt = document.querySelector('main');
  console.log('Main element:', mainElt);
  
  if (mainElt) {
    new p5(sketch, mainElt);
    console.log('p5 instance created successfully');
  } else {
    console.error('Main element not found!');
  }
}

// Initialize
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}

console.log('Script end reached');