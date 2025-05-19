class ClickableCircle {
    constructor(x, y, r, strokeCol, fillCol) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.strokeCol = strokeCol;
        this.fillCol = fillCol;
    }

    setFunction(fun) {
        this.fun = fun;
    }

    tryClick() {
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