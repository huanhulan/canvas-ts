import Particle from './particle';
import Strategy from './strategy';
import * as Interface from './interface';


class Renderer extends Interface.AbstractRender {
    protected PARTICLE_COUNT = 5000;
    protected PARTICLE_RADIUS = 0.5;
    protected MAX_ROTATION_ANGLE = Math.PI / 60;
    protected TRANSLATION_COUNT = 500;// countdown

    constructor() {
        super();
        this.setParameters();
        this.createParticles();
        this.setupFigure();
        this.reconstructMethod();
        this.bindEvent();
        this.drawFigure();
    }

    setParameters() {
        this.$window = document.documentElement;
        this.$container = document.getElementById('container');
        this.width = this.$container.offsetWidth;
        this.height = this.$container.offsetHeight;

        this.$canvas = document.createElement('canvas');
        this.$canvas.setAttribute('width', this.width.toString());
        this.$canvas.setAttribute('height', this.height.toString());
        this.$container.appendChild(this.$canvas);
        this.context = this.$canvas.getContext('2d');

        this.center = {x: this.width / 2, y: this.height / 2};

        this.rotationX = this.MAX_ROTATION_ANGLE;
        this.rotationY = this.MAX_ROTATION_ANGLE;
        this.strategyIndex = 0;
        this.translationCount = 0;
        this.theta = 0;

        this.strategies = new Strategy().strategies;
        this.particles = [];
    }

    createParticles() {
        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            this.particles.push(new Particle(this.center));
        }
    }

    reconstructMethod() {
        this.setupFigure = this.setupFigure.bind(this);
        this.drawFigure = this.drawFigure.bind(this);
        this.changeAngle = this.changeAngle.bind(this);
    }

    bindEvent() {
        this.$container.addEventListener('click', this.setupFigure);
        this.$container.addEventListener('mousemove', this.changeAngle);
    }

    changeAngle(event: Interface.evt) {
        let x = event.clientX - this.$container.offsetLeft + this.$window.scrollLeft,
            y = event.clientY - this.$container.offsetTop + this.$window.scrollTop;

        this.rotationX = (this.center.y - y) / this.center.y * this.MAX_ROTATION_ANGLE;
        this.rotationY = (this.center.x - x) / this.center.x * this.MAX_ROTATION_ANGLE;
    }

    setupFigure() {
        for (let i = 0, length = this.particles.length; i < length; i++) {
            this.particles[i].setAxis(this.strategies[this.strategyIndex]());
        }
        if (++this.strategyIndex == this.strategies.length) {
            this.strategyIndex = 0;
        }
        this.translationCount = 0;
    }

    drawFigure() {
        requestAnimationFrame(this.drawFigure);
        this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.context.fillRect(0, 0, this.width, this.height);

        for (let i = 0, length = this.particles.length; i < length; i++) {
            let axis = this.particles[i].getAxis2D(this.theta);
            this.context.beginPath();
            this.context.fillStyle = axis.color;
            this.context.arc(axis.x, axis.y, this.PARTICLE_RADIUS, 0, Math.PI * 2, false);
            this.context.fill();
        }
        this.theta++;
        this.theta %= 360;

        for (let i = 0, length = this.particles.length; i < length; i++) {
            this.particles[i].rotateX(this.rotationX);
            this.particles[i].rotateY(this.rotationY);
        }
        this.translationCount++;
        this.translationCount %= this.TRANSLATION_COUNT;

        if (this.translationCount === 0) {
            this.setupFigure();
        }
    }
}

export default Renderer;