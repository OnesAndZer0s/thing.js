// https://github.com/dxu/matter-collision-events/blob/master/docs/examples/basic.js
// https://github.com/dxu/matter-collision-events/blob/master/src/entry.js


Example.collisionEvents = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events,
        Body = Matter.Body;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false,
            background: '#111'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // define our categories (as bit fields, there are up to 32 available)
    var defaultCategory = 0x0001,
        redCategory = 0x0002,
        greenCategory = 0x0004,
        blueCategory = 0x0008;

    var colors = ['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'];

    // add floor
    World.add(world, Bodies.rectangle(400, 600, 900, 50, {
        label: "floor",
        isStatic: true
    }));

    var bod1 = Bodies.rectangle(300, 40, 60, 60, {
        label: "left",
        render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)]
        }
    });
    Events.on(bod1, "collideStart", function(pair) {
        bod1.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });
    World.add(world, bod1);
    var bod2 = Bodies.rectangle(400, 40, 60, 60, {
        label: "middle",
        render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)]
        }
    });
    Events.on(bod2, "collideActive", function(pair) {
        bod2.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });

    World.add(world, bod2);
    var bod3 = Bodies.rectangle(500, 40, 60, 60, {
        label: "right",
        render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)]
        }
    });
    Events.on(bod3, "collideEnd", function(pair) {
        bod3.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });
    World.add(world, bod3);
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

    // red category objects should not be draggable with the mouse
    mouseConstraint.collisionFilter.mask = defaultCategory | blueCategory | greenCategory;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

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