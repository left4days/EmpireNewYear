class Vector {
    constructor(x, y, x1, y1) {
        this.X = x;
        this.Y = y;
        this.X1 = x1;
        this.Y1 = y1;
    }

    dX() {
        return this.X1 - this.X;
    }
    dY() {
        return this.Y1 - this.Y;
    }
    Length() {
        return Math.sqrt(Math.pow(this.dX(), 2) + Math.pow(this.dY(), 2));
    }

    Multiply(n) {
        return new Vector(this.X, this.Y, this.X + this.dX() * n, this.Y + this.dY() * n);
    }
}

export { Vector };