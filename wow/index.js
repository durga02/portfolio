var c = document.querySelector("#my-canvas");
var ctx = c.getContext("2d");

let imagePath = (frameNumber, animation) => {
	return `images/${animation}/${frameNumber}.png`;
};

let loadImage = (src, callback) => {
	let img = document.createElement("img");
	img.onload = () => callback(img);
	img.src = src;
};

var frames = {
	"block" : [1, 2, 3, 4, 5, 6, 7, 8, 9],
	"idle" : [1, 2, 3, 4, 5, 6, 7, 8],
	"kick" : [1, 2, 3, 4, 5, 6, 7],
	"punch" : [1, 2, 3, 4, 5, 6, 7],
	"forward" : [1, 2, 3, 4, 5, 6],
	"backward" : [1, 2, 3, 4, 5, 6]
}

let loadImages = (callback) => {
	let images = { "idle": [], "kick": [], "punch": [], "block": [], "forward": [], "backward":[] };
	let imagesToLoad = 0
	let animations = ["idle", "kick", "punch", "block", "forward", "backward"]
	animations.forEach(animation => {
		let animationFrames = frames[animation]
		imagesToLoad = imagesToLoad + animationFrames.length
		animationFrames.forEach((frameNumber) => {
			let path = imagePath(frameNumber, animation);
			loadImage(path, (image) => {
				images[animation][frameNumber - 1] = image;
				imagesToLoad = imagesToLoad - 1;
				if (imagesToLoad === 0) {
					callback(images);
				}
			});
	});
	})
};

let animate = (ctx, images, animation, callback) => {
	console.log(images);
	images[animation].forEach((image, index) => {
		setTimeout(() => {
			ctx.clearRect(0, 0, 500, 500)
			ctx.drawImage(image, 0, 0, 500, 500)
		}, index * 100)
	})
	setTimeout(callback, images[animation].length * 100)
}

loadImages((images) => {
	let queAnimation = []
	let aux = () => {
		let selectedAnimation;
		if (queAnimation.length === 0) {
			selectedAnimation = "idle"
		} else {
			selectedAnimation = queAnimation.shift()
		}
		animate(ctx, images, selectedAnimation, aux)
	}
	aux()
	document.getElementById("punch").onclick = () => {
		queAnimation.push("punch")
	}
	document.getElementById("kick").onclick = () => {
		queAnimation.push("kick")
	}
	document.getElementById("forward").onclick = () => {
		queAnimation.push("forward")
	}
	document.getElementById("backward").onclick = () => {
		queAnimation.push("backward")
	}
	document.getElementById("block").onclick = () => {
		queAnimation.push("block")
	}
	document.addEventListener("keyup", (event) => {
		const key = event.key;
		if (key === "ArrowLeft") {
			queAnimation.push("kick")
		}
		else if (key === "ArrowRight") {
			queAnimation.push("punch")
		}
		else if (key === "ArrowUp") {
			queAnimation.push("forward")
		}
		else if (key === "ArrowDown") {
			queAnimation.push("backward")
		}
		else if (key === " ") {
			queAnimation.push("block")
		}
	})

});
