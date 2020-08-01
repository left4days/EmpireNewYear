import React from 'react';
import { Vector } from "./vector";
import { Lightning } from "./lightning";
import './style.scss';

const timings = {
    drawDuration: 5,
    drawTimeout: 350,
    animationTimeout: 1000,
};

// const timings = {
//     drawDuration: 5,
//     drawTimeout: 5000,
//     animationTimeout: 10000,
// };

const config = {
    Alpha: "1",
    Blur: "4",
    BlurColor: "#FF5102",
    Color: "white",
    GlowAlpha: "5",
    GlowBlur: "5",
    GlowColor: "#FF5102",
    GlowWidth: "5",
    Segments: "20",
    Threshold: "1",
    Width: "1"
};

function runLighter(target) {
    let canvas, ctx, lt, animationId, points = [];
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    function buildLighter() {
        lt = new Lightning(config);
    }

    function loop() {
        animationId = undefined;
        ctx.shadowBlur = 0;
        ctx.shadowColor = null;
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        points.forEach(p => {
            lt.Cast(ctx, p, target);
        });
    }

    function stop(timerId) {
        clearInterval(timerId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.cancelAnimationFrame(animationId);
    }

    function start() {
        if (!animationId) {
            let timerId = setInterval(() =>  animationId = window.requestAnimationFrame(loop),  timings.drawDuration);
            setTimeout(() => { stop(timerId)}, timings.drawTimeout);

        }
    }

    points.push(new Vector(0, 0, canvas.width / 2, canvas.height / 2));
    points.push(new Vector(0, 0, 20, 20));
    points.push(new Vector(0, 0, canvas.width / 2, 20));
    points.push(new Vector(0, 0, canvas.width - 20, 20));
    points.push(new Vector(0, 0, 20, canvas.height - 20));
    points.push(new Vector(0, 0, canvas.width / 2, canvas.height - 20));
    points.push(new Vector(0, 0, canvas.width - 20, canvas.height - 20));

    buildLighter();
    start();
};

function getRandomInRange() {
    let numberLength = 2;
    const min = 0;
    const max = 900;
    let result = [];
    for (let i = 0; i < numberLength; i++) {
        result.push((Math.floor(Math.random() * (max - min + 1)) + min).toString());
    }
    return result;
}

class LightningWidget extends React.Component {
    state = { intervalId: 0 };
    componentDidMount() {
        let intervalId = setInterval(this.timer, timings.animationTimeout);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    };

    timer = () => {
        let targetValues = getRandomInRange();
        let target = new Vector(0, 0, Number(targetValues[0]), Number(targetValues[1]));
        runLighter(target);
    };

    render() {
        return (
            <div className="lightning">
                <canvas id="board" width="1920" height="900" />
            </div>
        )
    }
}

export { LightningWidget };