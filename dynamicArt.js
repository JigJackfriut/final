const baseUrl = 'http://54.198.38.17:5005';
const url = baseUrl + '/dynamicArt/getEmotionPercentages/';
const artid= 'StockArt';
window.onload = function() {
  const canvas = document.getElementById('word-cloud');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    setInterval(() => {
      fetchData().then(emotionData => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const words = Object.keys(emotionData);
        const maxCount = Math.max(...Object.values(emotionData));
        const minSize = 30;
        const maxSize = 80;
        const height = canvas.height / (words.length + 1);
        const fontSizeFactor = (maxSize - minSize) / maxCount;

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const count = emotionData[word];
          let size = minSize + count * fontSizeFactor;
          let x = canvas.width / 2;
          let y = (i + 1) * height;
          ctx.font = `${size}px Arial`;
          ctx.fillStyle = getRandomColor();
          ctx.textAlign = 'center';
          ctx.fillText(word, x, y);
        }
      });
    }, 1000);
  }
};

async function fetchData() {
  
  const response = await fetch(url+artid);
  const data = await response.json();
  return data;
 
}



function getRandomColor() {
  const colors = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];
  return colors[Math.floor(Math.random() * colors.length)];
}
