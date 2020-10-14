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
}

class Particle {
	constructor(iniVel = new Vector(), iniPos = new Vector()) {
		this.pos = iniPos;
		this.vel = iniVel;


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
