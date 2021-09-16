/* tslint:disable:no-consecutive-blank-lines */

import Logger from "core/logger/Logger";

const logger: Logger = Logger.Of("Logger");

interface Shape {

    color: string;

    square(): number;
    draw?(): void;
}




abstract class BaseShape implements Shape {

    public color: string;
    private readonly _id: number;
    private _relatedShape: Shape;

    protected constructor(id: number, color: string = "#FF0000") {
        this._id = id;
        this.color = color;
    }

    public abstract square(): number;

    protected get id(): number {
        return this._id;
    }

    public get relatedShape(): Shape {
        return this._relatedShape;
    }

    public set relatedShape(shape: Shape) {
        this._relatedShape = shape;
    }
}




class Rectangle extends BaseShape {

    private readonly _width: number;
    private readonly _height: number;

    public constructor(id: number, width: number, height: number, color?: string) {
        super(id, color);
        this._width = width;
        this._height = height;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public draw(): void {
        logger.debug("Draw Rectangle. Id: " + this.id);
    }

    public square(): number {
        return this._width * this._height;
    }
}




class Circle extends BaseShape {

    private readonly _radius: number;

    public constructor(id: number, radius: number, color?: string) {
        super(id, color);
        this._radius = radius;
    }

    public radius(): number {
        return this._radius;
    }

    public draw(): void {
        logger.debug("Draw Circle. Id: " + this.id);
    }

    public square(): number {
        return Math.PI * Math.pow(this._radius, 2);
    }
}




const testShapes = () => {
    logger.debug("-------- Start test shapes --------");
    const shapes: Shape[] = [
        new Rectangle(0, 10, 20),
        new Rectangle(1, 15, 5, "#00FF00"),
        new Circle(2, 6),
        new Circle(2, 3, "#0000FF")
    ];
    shapes.forEach((shape: Shape) => {
        shape.draw();
        logger.debug("Shape square: ", shape.square());
    });
    logger.debug("-------- Finish test shapes --------");
};

testShapes();




const testCustomShapes = () => {
    logger.debug("-------- Start test custom shapes --------");
    const rectangle: Rectangle = new Rectangle(0, 15, 5, "#00FF00");
    const circle: Circle = new Circle(1, 3, "#0000FF");

    const customShape: Shape = new (class CustomShape implements Shape {
        public color: string = "#FFFF00";
        public draw(): void {
            logger.debug("Draw CustomShape");
        }
        public square(): number {
            return -1;
        }
    })();

    const anotherShape: BaseShape = new (class AnotherShape extends BaseShape {
        public constructor() {
            super(3);
        }
        public draw(): void {
            logger.debug("Draw AnotherShape. Id: " + this.id);
        }
        public square(): number {
            return -2;
        }
    })();

    rectangle.relatedShape = circle;
    circle.relatedShape = customShape;
    anotherShape.relatedShape = rectangle;

    const shapes: Shape[] = [
        rectangle,
        circle,
        customShape,
        anotherShape
    ];

    shapes.forEach((shape: Shape) => {
        shape.draw();
        logger.debug("Shape square: " + shape.square());

        if (shape instanceof BaseShape) {
            const baseShape: BaseShape = (shape as BaseShape);
            const relatedShape: Shape = baseShape.relatedShape;
            if (relatedShape !== null && relatedShape !== undefined) {
                if (relatedShape instanceof BaseShape) {
                    logger.debug("Related shape Id: " + (relatedShape as BaseShape).square());
                } else {
                    logger.debug("Related shape square: " + relatedShape.square());
                }
            }
        }
    });
    logger.debug("-------- Finish test custom shapes --------");
};

testCustomShapes();

process.exit();
