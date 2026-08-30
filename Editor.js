import { Engine } from './engine.js';

Engine.IncializeGame();

Engine.DebugMenuShow();

const stage1 = new Engine.Stage(
    "Stage1",
    document.body,
    "/MapData/Map.json"
);

console.log(stage1);

Engine.DebugMenu.WaterMrk(
    "Media/Sprite/Sprite.jpg",
    "By"
);

Engine.Page.SetTitle("BallRun", true);
Engine.Page.SetTabIcon(false);

await stage1.ready;

let player = new Engine.Entity(
    "Entity1",
    false,
    [102, 202],
    stage1
);

let enemy = new Engine.Entity(
    "Entity2",
    true,
    [150, 200],
    stage1
);
Engine.SetEngineLoop(()=>{
    console.log("hello")
})
player.AllotControl(10);
player.AddCollisionDetection();
player.AddCollisionBehavior(`.Obsicles[data-type = "1"]`)
enemy.Entity.classList.add("Enemy")
player.AddCollisionBehavior(`.Enemy`)

Engine.DebugMenu.AddDebugIndicator(
    () => Engine.keydown,
    "keypressS"
);