const baseUrl = 'http://3.15.139.27';
const url = baseUrl + '/dynamicArt/getEmotionPercentages/';

const colr = {
  "Happiness": "yellow",
  "Suprise": "pink",
  "Disgust": "green",
  "Fear": "purple",
  "Sadness": "blue",
  "Anger": "red"
};

window.onload = function() {
  const canvas = document.getElementById('word-cloud');
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  function check() {
    fetchData().then((emotionData) => {
      const word_attr = createWordData(emotionData);
      animation(word_attr);
    });
  }

  function animation(word_attr) {
    for (let i = 0; i < word_attr.length; i++) {
      const word = word_attr[i];
      ctx.font = word.font;
      ctx.fillStyle = word.color;
      ctx.fillText(word.text, word.x, word.y);
      word.width = ctx.measureText(word.text).width;
      ctx.stroke();
    }
    move(word_attr);
  }

  function move(word_attr) {
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
    check();
  }, 3000);

  function createWordData(emotionData) {
    const words = [];
    for (const emotion in emotionData) {
      const count = emotionData[emotion];
      for (let i = 0; i < count; i++) {
        const word = criteria(emotion);
        if (!overlapping(word.x, word.y, word.width, words)) {
          words.push(word);
        }
      }
    }
    return words;
  }

  function criteria(key) {
    const word = {};
    word.text = key;
    word.x = Math.random() * w;
    word.y = Math.random() * h;
    word.font = emotionData[key] * 5 + 'px Arial';
    word.speed = emotionData[key] / 10;
    word.color = colr[key];
    word.width = 0;
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
};

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}




function getRandomColor() {
  const colors = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];
  return colors[Math.floor(Math.random() * colors.length)];
}
