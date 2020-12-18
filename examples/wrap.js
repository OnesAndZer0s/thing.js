// https://github.com/liabru/matter-wrap/blob/master/docs/examples/basic.js
// https://github.com/liabru/matter-wrap/blob/master/index.js

var Example = Example || {};

Example.wrap = function() {
    // module aliases
    var Engine2D = Matter.Engine2D,
        Runner = Matter.Runner,
        Render = Matter.Render,
        World = Matter.World,
        Body = Matter.Body,
        Mouse = Matter.Mouse,
        Common = Matter.Common,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine2D.create();

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: Math.min(document.body.clientWidth, 1024),
            height: Math.min(document.body.clientHeight, 1024),
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // create demo scene
    var world = engine.world;
    world.gravity.scale = 0;

    // add some random bodies
    for (var i = 0; i < 150; i += 1) {
        var body = Bodies.polygon(
            Common.random(0, render.options.width),
            Common.random(0, render.options.height),
            Common.random(1, 5),
            Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10), {
                friction: 0,
                frictionAir: 0,
                wrap: {
                    min: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: render.canvas.width,
                        y: render.canvas.height
                    }
                }

            }
        );

        Body.setVelocity(body, {
            x: Common.random(-3, 3) + 3,
            y: Common.random(-3, 3) + 3
        });

        World.add(world, body);
    }

    // add a composite
    var car = Matter.Composites.car(150, 100, 100, 30, 20);

    // set the composites's wrapping bounds
    car.wrap = {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: render.canvas.width,
            y: render.canvas.height
        }
    };

    for (i = 0; i < car.bodies.length; i += 1) {
        Body.setVelocity(car.bodies[i], {
            x: Common.random(-3, 3) + 3,
            y: Common.random(-3, 3) + 3
        });
    }

    World.add(world, car);

    // add mouse control
    var mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas),
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}