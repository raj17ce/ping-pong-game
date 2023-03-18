const SPEED = 0.01;

export default class Paddle{
    constructor(paddleElm) {
        this.paddleElm = paddleElm;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElm).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleElm.style.setProperty("--position", value);
    }

    rect() {
        return this.paddleElm.getBoundingClientRect();
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballY) {
        this.position += SPEED * delta * (ballY - this.position);
    }
}