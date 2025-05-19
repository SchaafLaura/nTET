class String {
    static col = "#969cd1";
    constructor(x0, y0, x1, y1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.fretClickables = [];
        for (let i = 0; i < fretPositions.length; i++) {
            let p = fretPositions[i];
            if (i > 0) {
                let prev = fretPositions[i - 1];
                let d = p - prev;
                p = p - d * 0.2;
            }
            this.fretClickables.push(
                new ClickableCircle(p, y0, 30, fretClickableStroke, fretClickableFill)
            );
        }
    }

    display() {
        stroke(String.col);
        strokeWeight(3);
        line(this.x0, this.y0, this.x1, this.y1);
        for (let i = 0; i < this.fretClickables.length; i++) {
            strokeWeight(1);
            this.fretClickables[i].display();
        }
    }
}