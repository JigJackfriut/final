var baseUrl = 'http://54.198.38.17:5005';

const url = baseUrl + '/dynamicArt/getEmotionPercentages/';



const colr = {
  "Happiness": "yellow",
  "Surprise": "pink",
  "Disgust": "green",
  "Fear": "red",
  "Sadness": "blue",
  "Calm": "white" // corrected the capitalization of "Calm"
};

window.onload = function() {
  const canvas = document.getElementById('word-cloud');

  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  fetch(baseUrl+'/dynamicArt/getEmotionPercentages/', {
    method: 'get'
  })
   .then(response => response.json())
  .then(emotionData => { // corrected the variable name to emotionData
    const word_attr = createWordData(emotionData);

    function animation() {
      for (let i = 0; i < word_attr.length; i++) {
        const word = word_attr[i];
        ctx.font = word.font;
        ctx.fillStyle = word.color;
        ctx.fillText(word.text, word.x, word.y);
        word.width = ctx.measureText(word.text).width;
        ctx.stroke();
      }
      move();
    }

    function move() {
      for (let i = 0; i < word_attr.length; i++) {
        const word = word_attr[i];
        if (word.x > w) {
          word.x = -word.width;
          word.y = Math.random() * h;
        } else {
          word.x += word.speed;
        }
      }
    }
        setInterval(function() {
      ctx.clearRect(0, 0, w, h);
      animation();
    }, 24);

    function createWordData(emotionData) {
       const total = Object.values(emotionData).reduce((acc, val) => acc + val);
      const words = [];
      for (const emotion in emotionData) {
        const count = emotionData[emotion];
        for (let i = 0; i < count; i++) {
          const word = criteria(emotion, total);
          if (!overlapping(word.x, word.y, word.width, words)) {
            words.push(word);
          }
        }
      }
      return words;
    }

    function criteria(key,total) {
      const word = {};
      word.text = key;
      word.x = Math.random() * w;
      word.y = Math.random() * h;
      const percentage = emotionData[key]/ total;
      const count = Math.round(percentage * 100);
      word.font = count * 2+ 'px Arial';
      word.color = colr[key];
      word.width = 0;
      return word;
         return word;
    }

    function overlapping(x, y, size, placedWords) {
      for (let i = 0; i < placedWords.length; i++) {
        const word = placedWords[i];
        const distance = Math.sqrt((x - word.x) ** 2 + (y - word.y) ** 2);
        if (distance < (size + word.width) / 2) {
          return true;
        }
      }
      return false;
    }
  });
};




