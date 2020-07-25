import React from 'react';
import { Vector } from "./vector";
import { Lightning } from "./lightning";
import './style.scss';

const timings = {
    drawDuration: 60,
    drawTimeout: 1000,
    animationTimeout: 2000,
};

function runLighter(target, draw) {
    let canvas, ctx, lt, animationId, points = [];
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    function buildLighter() {
        let opt = {
            Alpha: "1",
            Blur: "4",
            BlurColor: "#FF5102",
            Color: "white",
            GlowAlpha: "30",
            GlowBlur: "40",
            GlowColor: "#FF5102",
            GlowWidth: "5",
            Segments: "30",
            Threshold: "1",
            Width: "1"
        };
        lt = new Lightning(opt);
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

    function start() {
        if (!animationId) {
            let timerId = setInterval(() =>  animationId = window.requestAnimationFrame(loop),  timings.drawDuration);
            setTimeout(() => { clearInterval(timerId); ctx.clearRect(0, 0, canvas.width, canvas.height)}, timings.drawTimeout);

        }
    }

    function stop() {
        if (animationId) {
            window.cancelAnimationFrame(animationId);
            animationId = undefined;
        }
    }


    if(draw) {
        points.push(new Vector(0, 0, canvas.width / 2, canvas.height / 2));
        points.push(new Vector(0, 0, 20, 20));
        points.push(new Vector(0, 0, canvas.width / 2, 20));
        points.push(new Vector(0, 0, canvas.width - 20, 20));
        points.push(new Vector(0, 0, 20, canvas.height - 20));
        points.push(new Vector(0, 0, canvas.width / 2, canvas.height - 20));
        points.push(new Vector(0, 0, canvas.width - 20, canvas.height - 20));

        buildLighter();
        start();
    } else {
        stop();
    }
};

function getRandomInRange() {
    let numberLength = 2;
    const min = 0;
    const max = 999;
    let result = [];
    for (let i = 0; i < numberLength; i++) {
        result.push((Math.floor(Math.random() * (max - min + 1)) + min).toString());
    }
    return result;
}

class LightningWidget extends React.Component {
    state = { active: false, intervalId: 0 };
    componentDidMount() {
        let intervalId = setInterval(this.timer, timings.animationTimeout);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    };

    timer = () => {
        const { active } = this.state;
        this.setState({ active: !active });
        let targetValues = getRandomInRange();
        let target = new Vector(0, 0, Number(targetValues[0]), Number(targetValues[1]));
        runLighter(target, active);
    };

    render() {
        return (
            <div className="lightning">
                <canvas id="board" width="800" height="800" />
            </div>
        )
    }
}

export { LightningWidget };