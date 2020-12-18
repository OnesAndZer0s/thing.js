//https://github.com/liabru/matter-attractors/blob/master/docs/examples/gravity.js
//https://github.com/liabru/matter-attractors/blob/master/index.js

var Example = Example || {};

Example.gravity = function() {
    var Engine2D = Matter.Engine2D,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Attractors = Matter.Attractors;

    // create engine
    var engine = Engine2D.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, 1024),
            height: Math.min(document.documentElement.clientHeight, 1024)
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    world.bodies = [];
    world.gravity.scale = 0;

    engine.timing.timeScale = 1.5;

    for (var i = 0; i < 150; i += 1) {
        var radius = Common.random(6, 10);

        var body = Bodies.circle(
            Common.random(10, render.options.width),
            Common.random(10, render.options.height),
            radius, {
                mass: Common.random(10, 15),
                frictionAir: 0,
                attractors: [
                    Body.gravity
                ],
                wrap: {
                    min: { x: 0, y: 0 },
                    max: { x: render.options.width, y: render.options.height }
                }

            }
        );

        var speed = 5;

        Body.setVelocity(body, {
            x: Common.random(-speed, speed),
            y: Common.random(-speed, speed)
        });

        World.add(world, body);
    }

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

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