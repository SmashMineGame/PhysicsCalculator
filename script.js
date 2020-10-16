class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	get mag() { return Math.sqrt(this.x * this.x + this.y * this.y) }

	get deg() { return Math.atan(this.y / this.x) }

	add(v) { return new Vector(v.x + this.x, v.y + this.y) }

	sub(v) { return new Vector(v.x - this.x, v.y - this.y) }

	mul(n) { return new Vector(this.x * n, this.y * n) }

	div(n) { return this.mul(1 / n) }

	static fromTrig(theta, mag) { return new Vector(mag * Math.cos(theta), mag * Math.sin(theta)) }
}

class Particle {
	constructor(iniPos = new Vector(), iniVel = new Vector()) {
		this.iniPos = iniPos;
		this.iniVel = iniVel;

		this.forces = [];
		this.acc = new Vector();
	}

	addForce(f) {
		this.forces.push(f)
		this.updateAcc();
	}

	updateAcc() {
		var acc = new Vector();
		this.forces.forEach(vec => acc = acc.add(vec));
		this.acc = acc;
	}

	vel(t) {
		return this.iniVel.add(this.acc.mul(t));
	}

	pos(t) {
		var a = this.iniPos;
		var b = this.iniVel.mul(t);
		var c = this.acc.mul(t * t / 2);

		return c.add(b.add(a));
	}

	maxHeightTime() {
		return -this.iniVel.y / this.acc.y;
	}
}

function getVector(el) {
	var xCom = el.children("div.comp").children("input[name='Xcomp']").val();
	var yCom = el.children("div.comp").children("input[name='Ycomp']").val();

	var aTri = el.children("div.trig").children("input[name='Atrig']").val();
	var mTri = el.children("div.trig").children("input[name='Mtrig']").val();

	if (!(xCom == "" || yCom == "")) return new Vector(xCom == "" ? 0 : +xCom, yCom == "" ? 0 : +yCom);
	else if (!(aTri == "" || mTri == "")) return Vector.fromTrig(aTri == "" ? 0 : +aTri, mTri == "" ? 1 : +mTri);
	else return new Vector();
}

var iniPosEl, iniVelEl, forces = [];

function createVectorInput(name, force = false) {
	var vectorInput = $($('#template-vector-input').html().trim().replace(/{{name}}/ig, name))
	$(force ? "#force-vector-inputs" : "#init-vector-inputs").append(vectorInput);
	if (!force) $("#init-vector-inputs").append(vectorInput);
	else $("#force-vector-inputs button").before(vectorInput);
	return vectorInput;
}

function newForce() {
	forces.push(createVectorInput("Force #" + (forces.length + 1), true));
}

function calculate() {
	iniPos = getVector(iniPosEl);
	iniVel = getVector(iniVelEl);

	forceVectors = [];
	forces.forEach(el => forceVectors.push(getVector(el)));

	var particle = new Particle(iniPos, iniVel);
	forceVectors.forEach(vec => particle.addForce(vec));

	var output = {
		maxHeightTime: particle.maxHeightTime(),
		maxHeightPos: particle.pos(particle.maxHeightTime())
	}

	console.log(particle);
	$('#output').empty().append(JSON.stringify(output));
}

$(() => {

	iniPosEl = createVectorInput("Initial Position");
	iniVelEl = createVectorInput("Initial Velocity");
	newForce();

});
