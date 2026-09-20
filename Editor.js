import { Engine } from './engine.js';
Engine.ExperimentalPrtection = false
Engine.DebugMenu.Show();

const stage1 = new Engine.Stage(
    "Stage1",
    document.body,
    "/MapData/Map.json"
);


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
    [200, 100],
    stage1
);

let enemy = new Engine.Entity(
    "Entity2",
    true,
    [200, 200],
    stage1
);

let PlayerLine = new Engine.Geometry.Line("justLine",stage1,[1,1],[player.X,player.Y],10);
Engine.SetEngineLoop(()=>{
    PlayerLine.ChangePosition([0,0],[player.X,player.Y])
});
new Engine.DebugMenu.DebugEle(PlayerLine.Line,0.7)

player.AllotControl(10);
player.AddCollisionDetection();
player.AddCollisionBehavior(`.Obsicles[data-type = "1"]`);

enemy.Entity.classList.add("Enemy");
player.AddCollisionBehavior(`.Enemy`);

Engine.DebugMenu.AddDebugIndicator("KeyPress", () => { return Engine.keydown });
Engine.DebugMenu.AddDebugIndicator("Player Cords", () => { return `${player.X},${player.Y}` });;
Engine.DebugMenu.AddDebugIndicator("Distance",()=>{return PlayerLine.length});
Engine.DebugMenu.AddDebugIndicator("Collide Top",()=>{return player.moveList.Up});
Engine.DebugMenu.AddDebugIndicator("Collide Bottom",()=>{return  player.moveList.Down});
Engine.DebugMenu.AddDebugIndicator("Collide Left",()=>{return  player.moveList.Left});
Engine.DebugMenu.AddDebugIndicator("Collide Right",()=>{return  player.moveList.Right});

console.log(Engine.Entity.EntityList);
player.Friction = 0.5;
//player.AddForce(100,100);
player.Move.Up = true;
Engine.DebugMenu.AddDebugIndicator("Forces",()=>{return `${Math.round(player.Xforce)},${Math.round(player.Yforce)}`});

Engine.SetEngineLoop(() => {
    if (Engine.keydown == "p") {
        player.RetainCollisionBehavior(`.Obsicles[data-type = "1"]`);
    }
    
    else {
        if (Engine.keydown == "n") {
            player.AddCollisionBehavior(`.Obsicles[data-type = "1"]`);
        }
    }
console.log(player);

})
