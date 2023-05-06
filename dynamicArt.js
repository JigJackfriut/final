const baseUrl = 'http://3.15.139.27:5005';
const url = baseUrl + '/dynamicArt/getEmotionPercentages/';

window.onload = function() {
  const canvas = document.getElementById('word-cloud');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    fetchData().then(emotionData => {
      const words = createWordData(emotionData);
      createWordCloud(words, ctx);
    });
  }
};

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createWordData(emotionData) {
  const words = [];
  for (const emotion in emotionData) {
    const count = emotionData[emotion];
    for (let i = 0; i < count; i++) {
      words.push(emotion);
    }
  }
  return words;
}

function createWordCloud(words, ctx) {
  const cloud = d3.layout.cloud().size([ctx.canvas.width, ctx.canvas.height])
    .words(words.map(function(d) { return {text: d, size: Math.random() * 50 + 20}; }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size; })
    .on('end', draw);

  cloud.start();

  function draw(words) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    words.forEach(function(d) {
      ctx.font = d.size + 'px Arial';
      ctx.fillStyle = getRandomColor();
      ctx.fillText(d.text, d.x, d.y);
    });
  }
}

function getRandomColor() {
  const colors = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];
  return colors[Math.floor(Math.random() * colors.length)];
}

