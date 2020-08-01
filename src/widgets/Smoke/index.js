import React from "react";
import SmokeMachine from "@bijection/smoke";
import "./style.scss";

const color = [255, 255, 255];

function getSmokePosition(w) {
  let smokeWidth = 600;
  return {
    leftWidth: smokeWidth,
    rightWidth: w - smokeWidth
  };
}

const sideSmoke = (canvas, side) => {
  const ctx = canvas.getContext("2d");
  const machine = SmokeMachine(ctx, color);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  getSmokePosition(w, h);
  machine.start();
  setTimeout(() => {
    machine.setPreDrawCallback(() => {
      machine.addSmoke(getSmokePosition(w, h)[side + "Width"], h, 0.02);
      canvas.width = w;
      canvas.height = h;
    });
  }, 2500);
  return machine;
};

const middleSmoke = (canvas, coef) => {
  const ctx = canvas.getContext("2d");
  const machine = SmokeMachine(ctx, color);
  machine.start();
  setTimeout(() => {
    machine.setPreDrawCallback(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      machine.addSmoke(w * coef, h - 200, 0.02);
      canvas.width = w;
      canvas.height = h;
    });
  }, 2500);
  return machine;
};

class SmokeWidget extends React.Component {
  componentDidMount() {
    const repro = document.getElementById("repro");
    const canvasMiddle1 = document.getElementById("canvasMiddle1");
    const canvasMiddle2 = document.getElementById("canvasMiddle2");
    const canvasMiddle3 = document.getElementById("canvasMiddle3");
    const canvasLeft = document.getElementById("canvasLeft");
    const canvasRight = document.getElementById("canvasRight");
    sideSmoke(canvasLeft, "left");
    sideSmoke(canvasRight, "right");
    // middleSmoke(canvasMiddle1, 0.2);
    middleSmoke(canvasMiddle2, 0.5);
    // middleSmoke(canvasMiddle3, 0.8);
  }

  render() {
    return (
      <div className="smoke">
        <div id="repro">
          <canvas id="canvasLeft" />
          <canvas id="canvasRight" />
          <canvas id="canvasMiddle1" />
          <canvas id="canvasMiddle2" />
          <canvas id="canvasMiddle3" />
        </div>
      </div>
    );
  }
}

export { SmokeWidget };
