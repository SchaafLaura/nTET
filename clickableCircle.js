class ClickableCircle {
    constructor(x, y, r, strokeCol, fillCol, altCol) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.strokeCol = strokeCol;
        this.fillCol = fillCol;
        this.toggle = false;
        this.altCol = altCol;
    }

    setFunction(fun) {
        this.fun = fun;
    }

    tryClick() {
        if (this.fun == null)
            return;
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let d = dx * dx + dy * dy;
        if (d < this.r * this.r * 0.25)
            this.fun();
    }

    display() {
        stroke(this.strokeCol);
        fill(this.fillCol);

        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let d = dx * dx + dy * dy;
        if (d < this.r * this.r * 0.25)
            fill(fretClickableHighlight);
        circle(this.x, this.y, this.r);
    }
}