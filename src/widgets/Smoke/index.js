import React from 'react';
import SmokeMachine from '@bijection/smoke'
import './style.scss';

const color = [255,255,255];

function getSmokePosition(w) {
    let smokeWidth = 600;
    return {
        leftWidth: smokeWidth,
        rightWidth: w - smokeWidth,
    }
}

const sideSmoke = (canvas, side) => {
    const ctx = canvas.getContext('2d');
    const machine = SmokeMachine(ctx, color);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    getSmokePosition(w, h);
    machine.start();
    setTimeout(() => {
        machine.setPreDrawCallback(() => {
            machine.addSmoke(getSmokePosition(w, h)[side + 'Width'], h, 0.05);
            canvas.width = w;
            canvas.height = h;
        });
    }, 2500);
    return machine;
};


const middleSmoke = (canvas) => {
    const ctx = canvas.getContext('2d');
    const machine = SmokeMachine(ctx, color);
    machine.start();
    setTimeout(() => {
        machine.setPreDrawCallback(() => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            machine.addSmoke(w/2, h - 300, 0.05);
            canvas.width = w;
            canvas.height = h;
        });
    }, 2500);
    return machine;
}


class SmokeWidget extends React.Component {
    componentDidMount() {
        const repro = document.getElementById('repro');
        const canvasMiddle = document.getElementById('canvasMiddle');
        const canvasLeft = document.getElementById('canvasLeft');
        const canvasRight = document.getElementById('canvasRight');
        sideSmoke(canvasLeft, 'left');
        sideSmoke(canvasRight, 'right');
        const middleSmokeMachine = middleSmoke(canvasMiddle);
    }

    render() {
        return (
            <div className="smoke">
                <div id="repro">
                    <canvas id="canvasLeft" />
                    <canvas id="canvasRight" />
                    <canvas id="canvasMiddle" />
                </div>
            </div>
        )
    }
}

export { SmokeWidget };