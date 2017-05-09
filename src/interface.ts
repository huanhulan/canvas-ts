export interface Coordinate {
    x: number,
    y: number,
    color?: string
}

export interface Axis {
    x: number
    y: number
    z: number
    hue: number
}
export interface evt {
    target: object
    clientX: number;
    clientY: number;
}

export abstract class AbstractRender {
    protected PARTICLE_COUNT: number;
    protected PARTICLE_RADIUS: number;
    protected MAX_ROTATION_ANGLE: number;
    protected TRANSLATION_COUNT: number;
    public $window: HTMLElement;
    public $container: HTMLElement;
    public $canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public rotationX: number;
    public rotationY: number;
    public theta: number;
    public strategies: Array<() => Axis>;
    public particles: Array<AbstractParticle>;
    public strategyIndex: number;
    public translationCount: number;
    public center: Coordinate;
}

export abstract class AbstractParticle {
    // 弹性系数
    readonly SPRING = 0.01;
    // 衰减
    readonly FRICTION = 0.9;
    // 原始观测距离
    readonly FOCUS_POSITION = 300;
    readonly COLOR = 'hsl(%hue, 100%, 70%)';

    protected init(): void {
    };

    public setAxis(axis: Axis): void {
    };

    public rotateX(angle: number): void {
    };

    public rotateY(angle: number): void {
    };

    public rotateZ(angle: number): void {
    };

    public getAxis3D(): Coordinate {
        return
    };

    public getAxis2D(theta: number): Coordinate {
        return
    };

    protected constructor(center: Coordinate) {
    }

    x: number;
    y: number;
    z: number;
    nextX: number;
    nextY: number;
    nextZ: number;
    vx: number;
    vy: number;
    vz: number;
    translating: boolean;
    hue: number;
    center: Coordinate;
}