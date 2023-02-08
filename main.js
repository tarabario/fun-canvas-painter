const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawMode = false;
let startX;
let startY;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let hue = 0;
let growLineWidth = true;

const draw = (e) => {
	if (!drawMode) return;
	
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[startX, startY] = [e.offsetX, e.offsetY];
	
	if (hue >= 360) {
		hue = 0;
	} else {
		hue++;
	}

	if (ctx.lineWidth === 1 || ctx.lineWidth === 50) {
		growLineWidth = !growLineWidth;
	}

	if (growLineWidth) {
		ctx.lineWidth++;
	} else if (!growLineWidth) {
		ctx.lineWidth--;
	}
}

canvas.addEventListener('mousedown', (e) => {
	drawMode = true;
	[startX, startY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

['mouseup', 'mouseleave'].forEach(evtName => {
	canvas.addEventListener(evtName, () => drawMode = false);
});