// https://github.com/dxu/matter-collision-events/blob/master/docs/examples/basic.js
// https://github.com/dxu/matter-collision-events/blob/master/src/entry.js

Example.collisionEvents = function() {
    // module aliases
    var Engine2D = Matter.Engine2D,
        Events = Matter.Events,
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
            width: Math.min(document.documentElement.clientWidth, 1024),
            height: Math.min(document.documentElement.clientHeight, 1024),
            wireframes: false
        }
    });

    // create runner
    var runner = Runner.create();

    Runner.run(runner, engine);
    Render.run(render);
    var colors = ['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'];

    // create demo scene
    var boxA = Bodies.rectangle(400, 200, 80, 80, {
        velocity: {
            x: 12,
            y: 10,
        }
    });

    var boxB = Bodies.rectangle(450, 50, 80, 80);

    boxA.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    boxB.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];

    boxB.onCollide(function(pair) {
        console.log('BoxB got hit!', pair);
        pair.bodyA.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        pair.bodyB.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });

    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    window.basicBodies = [boxA, boxB, ground];


    // return a context for MatterDemo to control
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