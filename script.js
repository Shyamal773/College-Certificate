const canvas = document.getElementById('cert-canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

img.onload = function() {
  canvas.width  = img.naturalWidth;
  canvas.height = img.naturalHeight;
  renderCert();
};

img.src = 'fairwell.jpg';

document.getElementById('nameInput').addEventListener('input', renderCert);

function renderCert() {
  var name = document.getElementById('nameInput').value.toUpperCase().trim();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  if (!name) return;

  var w = canvas.width;
  var h = canvas.height;

  var fontSize = Math.round(w * 0.018);
  ctx.font = 'bold ' + fontSize + 'px "Times New Roman", Times, serif';
  ctx.fillStyle = '#1a1a1a';
  ctx.textBaseline = 'top';

  var leftX = w * 0.125;
  var nameY = h * 0.295;

  ctx.fillText(name, leftX, nameY);
}

function downloadCert() {
  var name = document.getElementById('nameInput').value.toUpperCase().trim();
  if (!name) {
    alert('Please enter a student name first.');
    return;
  }

  renderCert();

  setTimeout(function() {
    var dataURL = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'Farewell_Certificate_' + name.replace(/\s+/g, '_') + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 200);
}