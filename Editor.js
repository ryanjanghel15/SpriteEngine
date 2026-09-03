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
Engine.Page.SetTabIcon(true);

await stage1.ready;

let player = new Engine.Entity(
    "Entity1",
    false,
    [117, 202],
    stage1
);
/*
let enemy = new Engine.Entity(
    "Entity2",
    true,
    [150, 200],
    stage1
);
*/
Engine.SetEngineLoop(() => {
    console.log("hello")
})
player.AllotControl(10);
player.AddCollisionDetection();
player.AddCollisionBehavior(`.Obsicles[data-type = "1"]`);
/*
enemy.Entity.classList.add("Enemy");
player.AddCollisionBehavior(`.Enemy`);
*/
Engine.DebugMenu.AddDebugIndicator("KeyPress", () => { return Engine.keydown })
Engine.DebugMenu.AddDebugIndicator("Player Cords", () => { return `${player.X},${player.Y}` });
console.log(Engine.Entity.EntityList)
player.Friction = 0.05
player.AddForce(10,10)
Engine.DebugMenu.AddDebugIndicator("Forces",()=>{return `${Math.round(player.Xforce)},${Math.round(player.Yforce)}`})

Engine.SetEngineLoop(() => {
    if (Engine.keydown == "p") {
        player.RetainCollisionBehavior(`.Obsicles[data-type = "1"]`)
    }
    else {
        if (Engine.keydown == "n") {
            player.AddCollisionBehavior(`.Obsicles[data-type = "1"]`);
        }
    }
})
