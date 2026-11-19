// One-dimensional equal-mass token physics, independent of SVG and Three.js.
// Positions are in rail units.
export class CounterPhysics {
  left = -3.12;
  right = 3.12;
  // Must match the SVG token's horizontal span.
  diameter = 0.288;
  x: number[];
  v: number[];
  drag = -1;
  target = 0;

  constructor(count = 11) {
    this.x = Array.from({ length: count }, (_, i) =>
      i < count - 2
        ? this.left + i * this.diameter
        : this.right - (count - 1 - i) * this.diameter,
    );
    this.v = Array(count).fill(0);
  }

  // Advance by seconds, subdividing to keep collisions stable across frame rates.
  step(dt: number) {
    const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / steps;
    for (let n = 0; n < steps; n++) {
      for (let i = 0; i < this.x.length; i++) {
        if (i === this.drag) {
          this.v[i] = Math.max(
            -18,
            Math.min(
              18,
              this.v[i] +
                ((this.target - this.x[i]) * 1400 - this.v[i] * 64) * h,
            ),
          );
        } else {
          this.v[i] *= Math.exp(-1.6 * h);
          const friction = 0.65 * h;
          this.v[i] =
            Math.sign(this.v[i]) * Math.max(0, Math.abs(this.v[i]) - friction);
          if (Math.abs(this.v[i]) < 0.012) this.v[i] = 0;
        }
        this.x[i] += this.v[i] * h;
      }
      for (let iteration = 0; iteration < 14; iteration++) {
        for (let i = 0; i < this.x.length - 1; i++) {
          const j = i + 1;
          const overlap = this.diameter - (this.x[j] - this.x[i]);
          if (overlap < 0) continue;
          const a = i === this.drag ? 0 : 1;
          const b = j === this.drag ? 0 : 1;
          const total = a + b;
          this.x[i] -= (overlap * a) / total;
          this.x[j] += (overlap * b) / total;
          const relative = this.v[j] - this.v[i];
          if (relative < 0) {
            const impulse = (-(1 + 0.46) * relative) / total;
            this.v[i] -= impulse * a;
            this.v[j] += impulse * b;
          }
        }
        for (let i = 0; i < this.x.length; i++) {
          if (this.x[i] < this.left) {
            this.x[i] = this.left;
            if (this.v[i] < 0) this.v[i] *= -0.24;
          }
          if (this.x[i] > this.right) {
            this.x[i] = this.right;
            if (this.v[i] > 0) this.v[i] *= -0.24;
          }
        }
      }
    }
  }

  // True while inertia or an active drag requires another rendered frame.
  moving() {
    return (
      this.v.some((v) => Math.abs(v) > 0.012) ||
      (this.drag >= 0 && Math.abs(this.target - this.x[this.drag]) > 0.0005)
    );
  }
}
