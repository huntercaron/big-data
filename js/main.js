function runCanvasHearts() {
	let canvas = document.getElementById("canvas");
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
				Math.floor(Math.random() * (2 - 0 + 1)) +")");

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

function runDataVis() {

    var width = 414;
    var height = 500;

    var s = Snap("#data-vis");
    var g = s.group();

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

    var levels = [{color: "red"}, {color: "pink"}, {color: "teal"}, {color: "blue"}, {color: "orange"}, {color: "purple"}];
    var cLevel = 0;

    var rects = generateGrid(500, 15, 19, levels[cLevel].color, {x: 0, y: 0});

    s.rect(20, height-60, 40, 40, 6).attr({ fill: "pink"}).node.onclick = function () {
    	animateLevelDown(rects);
    };

    s.rect(width-60, height-60, 40, 40, 6).attr({ fill: "limegreen"}).node.onclick = function () {
    	holderPrime(rects, width/2-10, 450);
    	setTimeout(function() { animateLevelUp(rects) }, 400);
    };

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
    }


    function collapseGrid(list) {
    	for (let r of list) {
    		TweenLite.to(r.node, 0.8, {
    			ease: Expo.easeInOut,
    			delay: ((r.intX + r.intY)*0.0004)+(Math.max(r.intX,r.intY)*0.004),
    			//delay: (r.intX + r.intY)*0.0004,
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
}

runCanvasHearts();
runDataVis();

window.onresize = runCanvasHearts;
