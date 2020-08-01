import { Vector } from "./vector";

class Lightning {
  constructor(c) {
    this.config = c;
  }

  Cast(context, from, to) {
    if (!from || !to) {
      return;
    }
    //Main vector
    let v = new Vector(from.X1, from.Y1, to.X1, to.Y1);
    //skip cas if not close enough
    if (
      this.config.Threshold &&
      v.Length() > context.canvas.width * this.config.Threshold
    ) {
      return;
    }
    let vLen = v.Length();
    let refv = from;
    let lR = vLen / context.canvas.width;
    //count of segments
    let segments = Math.floor(this.config.Segments * lR);
    //length of each
    let l = vLen / segments;

    for (let i = 1; i <= segments; i++) {
      //position in the main vector
      let dv = v.Multiply((1 / segments) * i);

      //add position noise
      if (i !== segments) {
        dv.Y1 += l * Math.random();
        dv.X1 += l * Math.random();
      }

      //new vector for segment
      let r = new Vector(refv.X1, refv.Y1, dv.X1, dv.Y1);

      //background blur
      Lightning.Line(context, r, {
        Color: this.config.GlowColor,
        With: this.config.GlowWidth * lR,
        Blur: this.config.GlowBlur * lR,
        BlurColor: this.config.GlowColor,
        Alpha:
          Lightning.Random(this.config.GlowAlpha, this.config.GlowAlpha * 2) /
          100
      });

      //main line
      Lightning.Line(context, r, {
        Color: this.config.Color,
        With: this.config.Width,
        Blur: this.config.Blur,
        BlurColor: this.config.BlurColor,
        Alpha: this.config.Alpha
      });
      refv = r;
    }

    Lightning.Circle(context, to, lR);
    Lightning.Circle(context, from, lR);
  }

  static Circle(context, p, lR) {
    context.beginPath();
    context.arc(
      p.X1 + Math.random() * 10 * lR,
      p.Y1 + Math.random() * 10 * lR,
      5,
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = "transparent";
    context.shadowBlur = 100;
    context.shadowColor = "#2319FF";
    context.fill();
  }

  static Line(context, v, c) {
    context.beginPath();
    context.strokeStyle = c.Color;
    context.lineWidth = c.With;
    context.moveTo(v.X, v.Y);
    context.lineTo(v.X1, v.Y1);
    context.globalAlpha = c.Alpha;
    context.shadowBlur = c.Blur;
    context.shadowColor = c.BlurColor;
    context.stroke();
  }

  static Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export { Lightning };
