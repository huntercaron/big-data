function runCanvasHearts() {
	let canvas = document.getElementById("heart-canvas");
	let ctx = canvas.getContext("2d");

	let width  = window.innerWidth;
	let height = window.innerHeight;
	let inc = 0;
	let hearts = [];
	let h = 0;

	class Heart {
		constructor(x, y, size, speed, style) {
			this.intX = x;
			this.intY = y;
			this.hInc = this.intY;
			this.style = style;
			this.size = size;
			this.speed = speed;
			this.anim(x, y, speed);
		}

		anim() {
			this.draw(this.intX, this.hInc, this.size);

			this.hInc = this.hInc + (1*this.speed);

			if ((this.hInc) > height+40)
				this.hInc = -30;
		}

		draw(x, y, size) {
			ctx.strokeStyle = this.style;

			ctx.beginPath();
			ctx.moveTo(x+1*size,y);
			ctx.lineTo(x+2*size,y+1*size);
			ctx.lineTo(x+3*size,y);
			ctx.lineTo(x+4*size,y+1*size);
			ctx.lineTo(x+2*size,y+3*size);
			ctx.lineTo(x,y+1*size);
			ctx.lineTo(x+1*size,y);
			ctx.closePath();
			ctx.stroke();
		}
	}

	for (var i = 0; i < 30; i++) {

			let posX = Math.floor(Math.random() * (width - 0 + 1));
			let posY = Math.floor(Math.random() * (height - 0 + 1));
			h = null;
			h = new Heart(posX, posY,
				Math.floor(Math.random() * (10 - 2 + 1) + 4),
				0.2,
				"rgba(234,65,65,0." +
				Math.floor(Math.random() * (3 - 0 + 1)) +")");

			hearts.push(h);
	}

	function init() {
		ctx.globalCompositeOperation = 'destination-over';
		ctx.canvas.width = width;
		ctx.canvas.height = height;

		window.requestAnimationFrame(draw)
	}

	function draw() {
		ctx.clearRect(0,0, width, height);
		inc++;

		for (let i of hearts)
			i.anim();

		window.requestAnimationFrame(draw)
	}

	init();
}

function runCircleCanvas() {
	let canvas = document.getElementById("circle-canvas");
	let ctx = canvas.getContext("2d");

	let width  = 850;
	let height = 850;
	let inc = 0;
	let pul = 0;
	let pulseUp = true;
	let ids = [];
	let often = 0;
	let offsets = [];

	function makeId(len) {
    	var text = "";
   		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  		for(let i = 0; i < len; i++)
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;
	}


	for (let i = 0; i < 91; i++) {
		offsets.push(Math.floor(Math.random()*11+3));
	}

	for (let i = 0; i < 20; i++) {
		ids.push(makeId(Math.floor(Math.random()*15+3)));
	}

	function init() {

		ctx.globalCompositeOperation = 'destination-over';
		ctx.canvas.width = width;
		ctx.canvas.height = height;

		window.requestAnimationFrame(drawCircles);
	}

	function drawCircles() {
		if (inc%60 == 0) {
			often = Math.floor(Math.random() * 15 +3);
		}
		if (inc == 1440)	{
			inc = 0;
		}
		inc++;
		if (pulseUp) {
			if (pul == 360) {
				pulseUp = false;
			} else {
				pul++;
			}
		} else {
			if (pul == 0) {
				pulseUp = true;
			} else {
				pul--;
			}
		}


		ctx.save();
		ctx.fillStyle = "rgba(245,245,245," + (0.6) + ")";
   		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#111111";

		ctx.translate(width/2,height/2);
		ctx.rotate((Math.PI/180)*inc*0.25);


		for (let i = 0; i <= 89; i++) {
			ctx.rotate((Math.PI/180)*4);
			ctx.fillRect(0, 0, 60, 20);
			ctx.strokeRect(0, 70+(pul*0.04), 2.5, 20+offsets[i]);
			ctx.fillRect(0,200+(offsets[i]*3), 2.5, 3-offsets[i]+pul*0.1);

			ctx.save();
			ctx.rotate(-1*(Math.PI/180)*inc*0.35);
			for (let x = 0; x < Math.floor(offsets[i]/2); x++) {
				ctx.beginPath();
				ctx.arc(0,180-(x*6)+offsets[x],2,0,2*Math.PI);
				ctx.stroke();
			}
			ctx.restore();

			ctx.beginPath();
			if (!(i > 50 && i < 56)) {
				ctx.save();
				ctx.rotate(-1*(Math.PI/180)*inc*0.2);
				ctx.arc(200,250,3,0,2*Math.PI);
				ctx.stroke();
				ctx.restore();

			}


			if (i > 50) {
				ctx.save();
				ctx.rotate(-1*(Math.PI/180)*inc*0.1);
				ctx.beginPath();
				ctx.arc(0,360-offsets[i]*4,offsets[i]*0.6,0,2*Math.PI);
				ctx.stroke();
				ctx.restore();
			}

			if (i%offsets[i] == 0 && i%2 == 0) {
				ctx.beginPath();
				ctx.moveTo(Math.pow(offsets[i+1], 2)+100+(pul*0.2), Math.pow(offsets[i], 2));
				ctx.lineTo(Math.pow(offsets[i+1], 2)+200+(pul*0.2),Math.pow(offsets[i+1], 2));
				ctx.lineTo(Math.pow(offsets[i+2], 2)+200,Math.pow(offsets[i+2], 2));
				ctx.closePath();
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(200,270+pul*0.02+(offsets[i]*2),2,0,2*Math.PI);
				ctx.fill();
			}

			if (i%offsets[i] == 0 || (300-i)%offsets[i] == 0) {
				ctx.beginPath();
				ctx.arc(0,150+offsets[i]*30-150,(pul)*0.0004*offsets[i]*5,0,2*Math.PI);
				ctx.fill();
			}

			if (i%8) {
				ctx.beginPath();
				ctx.arc(0,50+offsets[i]*30-150,(pul)*0.0004*offsets[i],0,2*Math.PI);
				ctx.fill();
			}


		}
		ctx.translate(-width/2,-height/2);

		ctx.stroke();
		ctx.restore();


		//ctx.restore();
		//ctx.clearRect(0, 0, width, height);
		if (circleRender)
			window.requestAnimationFrame(drawCircles)
	}

	init();
}

var width = 414;
var height = 500;

var s = Snap("#data-vis");
var g = s.group();
var currentTotal = 500;
var prevTotal = 0;
var dataUnits = ["megabytes", "gigabytes", "terabytes", "petabytes", "exabytes", "zettabyte", "yottabyte"];
var currentUnit = 0;
var currentTotalScaled = 500;

var toggle = true;

function generateGrid(quantity, size, padding, color, holder) {
	let grid = [];
	let rows = Math.floor(Math.sqrt(quantity));
    s.width = rows*padding;
	grid.rows = rows;
	grid.pad = padding;
	grid.size = size;
	let hold = s.rect(holder.x, holder.y, size, size, 2).attr({ fill: color, opacity: 0 });
    g.add(hold);
    grid.holder = hold;
	grid.holder.intX = Math.floor(rows/2)*padding;
	grid.holder.intY = 0;


	for (let x = 0; x < rows; x++ ) {
		for (let y = 0; y < rows; y++) {
			let r = null;
			r = s.rect((x*padding), (y*padding), size, size, 2).attr({
					fill: color
			});
			r.pad = padding;
			r.intX = x;
			r.intY = y;
			r.intColor = color;
			grid.push(r);
            g.add(r);
		}
	}
    g.attr("transform", "translate(" + 0 + ", 0)");
	return grid;
}

var levels = [{color: "#4f94e2"}, {color: "#ffc952"}, {color: "#e94e77"}, {color: "#8CD790"}, {color: "#6C49B8"}, {color: "#2b90d9"}];
var cLevel = 0;

var rects = generateGrid(500, 15, 19, levels[cLevel].color, {x: 0, y: 0});

function animateLevelDown(list) {
	cLevel--;
	fadeGrid(list, 0)
	collapseGrid(list);
	setTimeout(function() { holderDive(list, levels[cLevel].color); }, 600);
	setTimeout(function() { expandGrid(list, levels[cLevel].color); }, 650);

}


function animateLevelUp(list) {
	collapseGrid(list);
	holderPop(list, levels[cLevel+1].color)
	setTimeout(function() { fadeGrid(list, 0) }, 400);
	setTimeout(function() { holderCorner(list); }, 2000);
	cLevel++;
	setTimeout(function() {
		populateGrid(list, levels[cLevel].color);
		if (cLevel+1 == levels.length)
			cLevel = 0;
	}, 2480);

}

function holderDive(list, color) {
	TweenLite.to(list.holder.node, 0.5, {attr: { fill: "rgba(0,0,0,0)" }});
	TweenLite.to(list.holder.node, 1.5, {
		ease: Expo.easeOut,
		transformOrigin: "10% 10%",
		scale: 1.05,
		x: -10,
		y: -10,
		attr: {
			fill: "rgba(0,0,0,0)",
			width: list.rows*list.pad,
			height: list.rows*list.pad
		}
	});

	TweenLite.to(list.holder.node, 0.35, {
		ease: Expo.easeOut,
		opacity: 0,
		delay: 1.5,
		onComplete: function() {
			TweenLite.to(list.holder.node, 0, {
				transformOrigin: "0 0",
				scale: 1,
				x: 0,
				y: 0,
				opacity: 1,
				attr: {
					fill: color,
					"stroke-width": 0,
					width: list.size,
					height: list.size
				}
			});
		}
	});
}

function fadeGrid(list, d) {
	let delay = d || 0.25;

	for (let r of list) {
		TweenLite.to(r.node, delay, { opacity: 0 });
	}
}

function holderCorner(list) {
	TweenLite.to(list.holder.node, 0.5, {
		attr: {
			ease: Expo.easeInOut,
			y: 0,
			x: 0,
			rx: "2",
			ry: "2"
		}
	});
}

function holderPrime(list, x, y) {
	TweenLite.to(list.holder.node, 0, {
		opacity: 0,
		transformOrigin: "50% 50%",
		attr: {
			y: y,
			x: x,
			fill: "white",
			"stroke-linecap": "round",
			stroke: "#ccc"
		}
	});
	TweenLite.to(list.holder.node, 0.6, {
		delay: 0.1,
		ease: Expo.easeOut,
		opacity: 1,
		scale: 1.1,
		transformOrigin: "50% 50%",
		attr: {
			rx: "2",
			"stroke-width": 1,
			ry: "2"
		}
	});
}

function holderPop(list, color) {
	list.holder.paper.append(list.holder);
	TweenMax.to(list.holder.node, 0.6, {
		delay: 0.58,
		scale: 2.5,
		transformOrigin: "50% 50%",
		repeat:1,
		ease: Expo.easeOut,
		yoyo: true,
		attr: {
			rx: "2",
			ry: "2",
		}
	});

	TweenLite.to(list.holder.node, 1, {
		delay: 1,
		scale: 1,
		attr: {
			"stroke-width": 0,
			fill: color
		}
	});

}

function populateGrid(list, colorChange) {
	let color = colorChange || "black";

	for (let r of list) {
		TweenLite.to(r.node, 0, {
			scale: 0.1,
			opacity: 0,
			attr: {
				fill: color,
				x: r.intX*r.pad,
				y: r.intY*r.pad
			}
		});

		TweenLite.to(r.node, 0.8, {
			delay: Math.max(r.intX,r.intY)*0.015,
			ease: Expo.easeInOut,
			opacity: 1,
			scale: 1,
			attr: {
				x: r.intX*r.pad,
				y: r.intY*r.pad
			}
		});
	}

	prevTotal = currentTotalScaled;
	currentTotal = currentTotal*500;
	currentTotalScaled = currentTotalScaled*500;

	if (currentTotalScaled > 1000) {
		currentUnit++;
		currentTotalScaled = currentTotal/(Math.pow(1000, currentUnit));
	}

	animateValue("size", prevTotal/10, currentTotalScaled/10, 800);
	animateValue("profiles", prevTotal, currentTotal, 800);
	document.getElementById("dataUnit").innerHTML = dataUnits[currentUnit];
	//animateValue("facebook", currentTotal/1700000000*100, (currentTotal*500)/1700000000*100, 800);
	if (currentUnit == 4) {
		document.querySelector(".glitch-text").classList.add("fade-in");
	}

	if (currentUnit == 6) {
		document.querySelector(".scale-button").classList.add("disabled");
	}

}


function collapseGrid(list) {
	for (let r of list) {
		TweenLite.to(r.node, 0.8, {
			ease: Expo.easeInOut,
			delay: ((r.intX + r.intY)*0.0004)+(Math.max(r.intX,r.intY)*0.004),
			scale: 1,
			attr: {
				x: list.holder.attr("x"),
				y: list.holder.attr("y")
			}
		});
	}
}

function expandGrid(list, color) {
	for (let r of list) {
		TweenLite.to(r.node, 0.8, {
			delay: ((r.intX + r.intY)*0.0002)+(Math.max(r.intX,r.intY)*0.004),
			//delay: Math.max(r.intX,r.intY)*0.004,
			ease: Expo.easeInOut,
			opacity: 1,
			scale: 1,
			attr: {
				x: r.intX*r.pad,
				y: r.intY*r.pad,
				fill: color
			}
		});
	}
}

function animateValue(id, start, end, duration) {
    var obj = document.getElementById(id);
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round((end - (remaining * range)) * 10) / 10;
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    var timer = setInterval(run, stepTime);
    run();
}

function fullProcessUp() {
	holderPrime(rects, width/2-10, 450);
	setTimeout(function() { animateLevelUp(rects) }, 400);
}

function updateNameBreakdown() {
	console.log("no");
	let name = document.getElementById("name-input").value;
	let grid = "";
	let nameDiv = '<span class="divider">|</span>';

	if (name.length > 0) {
		if (!nameEntered) {
			document.querySelector(".name-chart").classList.add("show-name-chart");
		}

		for (let i = 0; i < name.length; i++) {
			nameDiv += name.charAt(i) + '<span class="divider">|</span>';
			grid += '<div class="byte"></div>';
		}

		document.getElementById("name-breakdown").innerHTML = nameDiv;
		document.querySelector(".byte-box").innerHTML = grid;
		animateValue("byte-count", 0, name.length, 400);


		nameEntered = true;
	}

}





runCanvasHearts();
runCircleCanvas();

let circleRender = true;
let nameEntered = false;

window.onresize = runCanvasHearts;
//$(".bottom-area").stick_in_parent({offset_top: (window.innerHeight-589)});
//$(".env-top-box").stick_in_parent({offset_top: (window.innerHeight-320)});



window.addEventListener('scroll', function(e) {

	if (window.pageYOffset >= (document.querySelector('.c-one').clientHeight + document.querySelector('.bottom-area').clientHeight - window.innerHeight-360)) {
		document.querySelector(".letter").classList.add("letter-lift");
	}
	else {
		document.querySelector(".letter").classList.remove("letter-lift");
	}

	if (window.pageYOffset > window.innerHeight*1.5) {
	}

	if (window.pageYOffset > window.innerHeight*1.5) {
		circleRender = false;
	} else {
		if (!circleRender) {
			circleRender = true;
			runCircleCanvas();
		}
	}
});
