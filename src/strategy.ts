import * as Interface from './interface';

class Strategy {
    private _SCATTER_RADIUS = 150;
    private _CONE_ASPECT_RATIO = 1.5;
    public strategies: Array<() => Interface.Axis>;

    constructor() {
        this.strategies = this.getStrategies();
    }

    getStrategies(): Array<() => Interface.Axis> {
        let strategies = [],
            fArray = ['createSphere', 'createTorus', 'createCone', 'createVase'];
        for (let i in this) {
            if (fArray.indexOf(i) === -1 || typeof this[i] !== 'function') {
                continue;
            }
            let f = this[i];
            // @ts-ignore
            strategies.push(f.bind(this));
        }
        return strategies;
    }

    // 球
    createSphere(): Interface.Axis {
        let cosTheta = Math.random() * 2 - 1,
            sinTheta = Math.sqrt(1 - cosTheta * cosTheta),
            phi = Math.random() * 2 * Math.PI;

        return {
            x: this._SCATTER_RADIUS * sinTheta * Math.cos(phi),
            y: this._SCATTER_RADIUS * sinTheta * Math.sin(phi),
            z: this._SCATTER_RADIUS * cosTheta,
            hue: Math.round(phi / Math.PI * 30)
        };
    }

    // 圆环
    createTorus(): Interface.Axis {
        let theta = Math.random() * Math.PI * 2,
            x = this._SCATTER_RADIUS + this._SCATTER_RADIUS / 6 * Math.cos(theta),
            y = this._SCATTER_RADIUS / 6 * Math.sin(theta),
            phi = Math.random() * Math.PI * 2;

        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }

    // 圆锥体
    createCone(): Interface.Axis {
        let status = Math.random() > 1 / 3,
            x,
            y,
            phi = Math.random() * Math.PI * 2,
            rate = Math.tan(30 / 180 * Math.PI) / this._CONE_ASPECT_RATIO;

        if (status) {
            y = this._SCATTER_RADIUS * (1 - Math.random() * 2);
            x = (this._SCATTER_RADIUS - y) * rate;
        } else {
            y = -this._SCATTER_RADIUS;
            x = this._SCATTER_RADIUS * 2 * rate * Math.random();
        }
        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }

    // 瓶
    createVase(): Interface.Axis {
        let theta = Math.random() * Math.PI,
            x = Math.abs(this._SCATTER_RADIUS * Math.cos(theta) / 2) + this._SCATTER_RADIUS / 8,
            y = this._SCATTER_RADIUS * Math.cos(theta) * 1.2,
            phi = Math.random() * Math.PI * 2;
        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }
}


export default Strategy;