class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	get mag() { return Math.sqrt(this.x * this.x + this.y * this.y) }

	get deg() { return Math.atan(this.y / this.x) }

	add(v) { return new Vector(v.x + this.x, v.y + this.x) }

	sub(v) { return new Vector(v.x - this.x, v.y - this.x) }

	mul(n) { return new Vector(this.x * n, this.y * n) }

	div(n) { return this.mul(1 / n) }

	static fromTrig(theta, mag) { return new Vector(mag * Math.cos(theta), mag * Math.sin(theta)) }
}

class Particle {
	constructor(iniVel = new Vector(), iniPos = new Vector()) {
		this.iniPos = iniPos;
		this.iniVel = iniVel;

		this.forces = [];
	}

	addForce(f) {
		this.forces.push(f)
		this.updateAcc();
	}

	updateAcc() {
		var acc = new Vector();
		this.forces.forEach(vec => acc.add(vec));
		return acc;
	}

}

window.onload = () => {

	function createVectorInput(name) {
		var vectorInput = $($('#template-vector-input').html().trim().replace(/{{name}}/ig, name))
		$('#vector-inputs').append(vectorInput);
		return vectorInput;
	}

	function getVector(el) {
		var xCom = el.children('input[name="xCom"]');
		console.log(xCom);
	}

	var iniPos = createVectorInput("Initial Position");
	var iniVel = createVectorInput("Initial Velocity");

}
