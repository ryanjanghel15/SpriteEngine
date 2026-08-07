//On Page Elements //
const stage = document.getElementById("stage")
const stageRect = stage.getBoundingClientRect();
const debugMenu = document.getElementById("debugMenu");

//Debug Indicators //
const keypressIndicator = document.getElementById('keypressIndicator');
const PlayerCordsIndicator = document.getElementById("PlayerCordsIndicator");
const WaterMrkIndiacator = document.getElementById("WaterMrkIndiacatorImg")

//JUst Vatribles 👍//
let debugMenuShow = false;
export let keydown = "";
let controlKeys = []
let AllotControlanimationId = null;

// Import Data //
import {
    MapData
} from './MapBuilder.js'
//
console.log(MapData);

// Function Area //
export function IncializeGame() {
    document.title = `SpriteEngine | ${MapData.NameOfMap}`
    let IconLink = document.createElement("link");
    IconLink.setAttribute("rel", "icon");
    IconLink.setAttribute("href", MapData.TabCover);
    document.querySelector("head").appendChild(IconLink);
    debugMenuShow = false;
    DebugMenuShow()
    keydown = "";
    WaterMrkIndiacator.src = MapData.WaterMark

}

export function RetainControl() {
    if (AllotControlanimationId !== null) {
        cancelAnimationFrame(AllotControlanimationId);
        AllotControlanimationId = null;
    }
}

export function GameLoop() {

}

export function BuildMap() {
    stage.style.height = MapData.stageDimentions[1] + "px"
    stage.style.width = MapData.stageDimentions[0] + "px"
    const tileWidth = MapData.stageDimentions[0] / MapData.XtoYratio[0];
    const tileHeight = MapData.stageDimentions[1] / MapData.XtoYratio[1];
    stage.style.gridTemplateColumns = `repeat(${MapData.XtoYratio[0]}, 1fr)`;
    MapData.plot.forEach(Plot => {
        const tile = document.createElement("div");
        const tileDataIndicator = document.createElement("p");
        tile.className = "Obsicles";
        tile.dataset.type = Plot;
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;
        tileDataIndicator.classList.add("tileDataIndicator")
        tileDataIndicator.textContent = Plot;
        tile.appendChild(tileDataIndicator);
        stage.appendChild(tile);
    });
}
export function DebugMenuShow() {
    if (debugMenuShow) {
        debugMenu.style.opacity = 1;
        document.querySelectorAll(".tileDataIndicator").forEach(tile => {
            tile.style.opacity = 1;
        })
    }
    else {
        debugMenu.style.opacity = 0;
        document.querySelectorAll(".tileDataIndicator").forEach(tile => {
            tile.style.opacity = 0;
        })
    }
    console.log(`debugMenuShow = ${debugMenuShow};`);
    console.log(`debugMenu.style.opacity = ${debugMenu.style.opacity}`);

}

export function CreateEntity(name, sprite, pose) {

    let Entity = document.createElement("div");
    Entity.classList.add("Entity");

    if (typeof sprite === "string") {
        let Sprite = document.createElement("img");
        Sprite.setAttribute("src", sprite);
        Sprite.style.width = "30px"
        Entity.appendChild(Sprite);
    }
    else if (typeof sprite === "boolean") {
        if (sprite) {
            Entity.style.backgroundColor = "red"
        }
        else {
            Entity.style.backgroundColor = "red"
            Entity.style.borderRadius = "100%"
        }
    }
    Entity.style.left = `${pose[0]}px`
    Entity.style.top = `${pose[1]}px`
    Entity.style.position = "absolute";
    Entity.setAttribute("name", name);

    stage.appendChild(Entity);
}

export function AllotControl(Player, speed) {
    let player = document.querySelector(`[name="${Player}"]`);
    let playerSpeed = speed;
    let playerX = player.offsetLeft
    let playerY = player.offsetTop
    console.log(playerSpeed);
    if (controlKeys.includes("w") && playerY >= playerSpeed) {
        playerY -= playerSpeed;
    }
    if (controlKeys.includes("s") && playerY <= (stage.clientHeight - 4 * playerSpeed)) {
        playerY += playerSpeed;
    }
    if (controlKeys.includes("a") && playerX >= playerSpeed) {
        playerX -= playerSpeed;
    }
    if (controlKeys.includes("d") && playerX <= (stage.clientWidth - 4 * playerSpeed)) {
        playerX += playerSpeed;
    }
    document.getElementById('PlayerCordsIndicator').textContent = `Player : ${playerX}, ${playerY}`
    player.style.top = playerY + "px"
    player.style.left = playerX + "px"
    AllotControlanimationId = requestAnimationFrame(() => AllotControl(Player, speed));

}

//

// Key Detection
addEventListener("keydown", (e) => {
    keydown = e.key
    keypressIndicator.textContent = `Key Pressed :${keydown}`
    switch (e.key) {
        case "`":
            debugMenuShow = !debugMenuShow;
            DebugMenuShow()
            break;
    }

});
window.addEventListener("keydown", (e) => {
    if (["w", "a", "s", "d"].includes(e.key) && !controlKeys.includes(e.key)) {
        controlKeys.push(e.key);
    }
});

window.addEventListener("keyup", (e) => {
    const index = controlKeys.indexOf(e.key);
    if (index !== -1) {
        controlKeys.splice(index, 1);
    }
});
//
