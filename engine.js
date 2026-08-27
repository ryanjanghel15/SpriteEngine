//On Page Elements //\
const debugMenu = document.getElementById("debugMenu");

//Debug Indicators //
const keypressIndicator = document.getElementById('keypressIndicator');
const PlayerCordsIndicator = document.getElementById("PlayerCordsIndicator");
const WaterMrkIndiacator = document.getElementById("WaterMrkIndiacatorImg")
const RanDomIndicator = document.getElementById('RanDomIndicator');

//JUst Vatribles 👍//
let debugMenuShow = false;
let keydown = "";
let controlKeys = []
let AllotControlanimationId = null;
let EngineLoop = () => { }

// Import Data //

//



// Function Area //
function IncializeGame() {
    /*document.title = `SpriteEngine | ${MapData.NameOfMap}`
    let IconLink = document.createElement("link");
    IconLink.setAttribute("rel", "icon");
    IconLink.setAttribute("href", MapData.TabCover);
    document.querySelector("head").appendChild(IconLink);*/
    debugMenuShow = false;
    DebugMenuShow()
    keydown = "";


}

function RetainControl() {
    if (AllotControlanimationId !== null) {
        cancelAnimationFrame(AllotControlanimationId);
        AllotControlanimationId = null;
    }
}


function DebugMenuShow() {
    if (debugMenuShow) {
        debugMenu.style.opacity = 1;
        document.querySelectorAll(".tileDataIndicator").forEach(tile => {
            tile.style.opacity = 1;
        })
        document.querySelectorAll(".collisionBoxEle").forEach((box) => {
            box.style.opacity = 1;
        })
        document.querySelectorAll(".collisionBox").forEach((box) => {
            box.style.opacity = 0.4;
            console.log(`${box.style.opacity}`);
        })
    }
    else {
        debugMenu.style.opacity = 0;
        document.querySelectorAll(".tileDataIndicator").forEach(tile => {
            tile.style.opacity = 0;
        })
        document.querySelectorAll(".collisionBoxEle").forEach((box) => {
            box.style.opacity = 0;
        })
        document.querySelectorAll(".collisionBox").forEach((box) => {
            box.style.opacity = 0;
            console.log(`${box.style.opacity}`);
        })
    }
    console.log(`debugMenuShow = ${debugMenuShow};`);
    console.log(`debugMenu.style.opacity = ${debugMenu.style.opacity}`);


}
function Loop() { }
function SetEngineLoop(func) {
    EngineLoop = func;

    function Loop() {
        EngineLoop();
        requestAnimationFrame(Loop);
    }

    requestAnimationFrame(Loop);
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
class Page {
    static SetTitle(Title, SubAdd) {
        document.title = `${SubAdd ? "SpriteEngine | " : ""}${Title}`;
    }
    static SetTabIcon(url) {

        let LinkEle = document.createElement("link");
        LinkEle.setAttribute("rel", "icon");
        if (typeof url == "boolean" && url) {
            LinkEle.setAttribute("href", "Media/TabCover/TabCover-removebg-preview.png");
        }
        else {
            LinkEle.setAttribute("href", url);
        }
        document.head.appendChild(LinkEle);
    }
}

class DebugMenu {
    static WaterMrk(url, msg) {
        let WtMEle = document.createElement("div")
        WtMEle.setAttribute("id", "WaterMrkIndiacator")
        WtMEle.innerHTML = `<p>${msg}</p> <img src="${url}" id="WaterMrkIndiacatorImg">`
        debugMenu.appendChild(WtMEle)
    }
    static AddDebugIndicator(Func, IndName) {

        let pIndcator = document.createElement("p")
        pIndcator.setAttribute("id", `${IndName}Indicator`)
        pIndcator.setAttribute("class", `DebugInicator`)
        debugMenu.appendChild(pIndcator)
        SetEngineLoop(() => { pIndcator.textContent = Func() })
    }
}

class Stage {
    constructor(Name, AppendedElement, url) {
        this.Name = Name;
        this.AppendedElement = AppendedElement;
        this.MapData = null;
        this.EntityLayer
        this.PlotLayer


        this.stage = document.createElement("div");
        this.stage.classList.add("Stage");
        this.stage.setAttribute("name", this.Name);

        AppendedElement.appendChild(this.stage);

        this.ready = this.LoadMap(url);
    }

    async LoadMap(url) {
        this.MapData = await Stage.LoadMapData(url);
        this.BuildMap(this.MapData);
    }
    BuildMap(placeholder) {
        this.stage.style.width = `${placeholder.stageDimentions[0]}px`;
        this.stage.style.height = `${placeholder.stageDimentions[1]}px`;
        this.stage.style.position = "relative"
        this.EntityLayer = document.createElement("div")
        this.EntityLayer.classList.add("EntityLayer")
        this.EntityLayer.style.position = "absolute"
        this.EntityLayer.style.width = `${placeholder.stageDimentions[0]}px`;
        this.EntityLayer.style.height = `${placeholder.stageDimentions[1]}px`;
        this.stage.appendChild(this.EntityLayer);
        if (placeholder.plot != false) {
            this.PlotLayer = document.createElement("div")
            this.PlotLayer.style.position = "absolute"
            this.PlotLayer.classList.add("PlotLayer")
            this.PlotLayer.style.display = "grid";
            this.PlotLayer.style.gridTemplateColumns =
                `repeat(${placeholder.XtoYratio[0]}, 1fr)`;

            this.PlotLayer.style.gridTemplateRows =
                `repeat(${placeholder.XtoYratio[1]}, 1fr)`;

            placeholder.plot.forEach(Plot => {
                const tile = document.createElement("div");
                const tileDataIndicator = document.createElement("p");

                tile.className = "Obsicles";
                tile.dataset.type = Plot;

                tileDataIndicator.classList.add("tileDataIndicator");
                tileDataIndicator.textContent = Plot;

                tile.appendChild(tileDataIndicator);
                this.PlotLayer.appendChild(tile);
                tileDataIndicator.style.opacity = 0;
            });
            this.PlotLayer.style.width = `${placeholder.stageDimentions[0]}px`;
            this.PlotLayer.style.height = `${placeholder.stageDimentions[1]}px`;

            this.stage.appendChild(this.PlotLayer)
        }

    }
    static async LoadMapData(url) {

        const response = await fetch(url);
        const data = await response.json();

        // plot can either be false or an array
        if (data.plot !== false && !Array.isArray(data.plot)) {
            throw new Error("Error In Map Data: plot must be false or an array");
        }

        // If plot is an array, validate its size
        if (
            Array.isArray(data.plot) &&
            data.XtoYratio[0] * data.XtoYratio[1] !== data.plot.length
        ) {
            throw new Error("Error In Map Data: plot size does not match XtoYratio");
        }

        return data;
    }
}
class Entity {
    constructor(Name, Sprite, Pose, Stage) {
        this.Name = Name
        this.Entity
        this.Sprite = Sprite
        this.position = Pose
        this.speed
        this.X //READ ONLY
        this.Y //READ ONLY
        this.Stage = Stage.stage
        this.StageObj = Stage
        this.Xforce = 0
        this.Yforce = 0
        this.collisionBox = {
            TopCollisionBox: null,
            BottomCollisionBox: null,
            LeftCollisionBox: null,
            RightCollisionBox: null,
            TopLeftCollisionBox: null,
            TopRightCollisionBox: null,
            BottomLeftCollisionBox: null,
            BottomRightCollisionBox: null,
        }
        this.moveList = {
            Up: true,
            Down: true,
            Left: true,
            Right: true,
        };
        this.DetectCollisionList = []
        this.ColliderData = {
            top: [],
            bottom: [],
            left: [],
            right: [],
            topLeft: [],
            topRight: [],
            bottomLeft: [],
            bottomRight: []

        };

        let Entity = document.createElement("div");
        Entity.classList.add("Entity");
        Entity.style.position = "absolute";
        Entity.setAttribute("name", this.Name);

        console.log(this.Stage)
        this.StageObj.EntityLayer.appendChild(Entity);
        this.Entity = Entity
        this.UpdateSprite()
        this.UpdatePosition()
        this.X = this.Entity.offsetLeft
        this.Y = this.Entity.offsetTop
        this.UpdateCoordinates()
    }
    UpdateSprite() {
        let Entity = document.getElementsByName(this.Name)[0]
        Entity.innerHTML = ""
        Entity.style.borderRadius = "0%"
        Entity.style.backgroundColor = "";
        if (typeof this.Sprite === "string") {
            let sprite = document.createElement("img");
            sprite.setAttribute("src", this.Sprite);
            sprite.style.width = "30px"
            Entity.appendChild(sprite);
        }
        else if (typeof this.Sprite === "boolean") {
            if (this.Sprite) {
                Entity.style.backgroundColor = "red"
            }
            else {
                Entity.style.backgroundColor = "red"
                Entity.style.borderRadius = "100%"
            }
        }
    }
    SetSprite(Data) {
        this.Sprite = Data;

        let Entity = document.getElementsByName(this.Name)[0]
        Entity.innerHTML = ""
        Entity.style.borderRadius = "0%"
        Entity.style.backgroundColor = "";
        if (typeof this.Sprite === "string") {
            let sprite = document.createElement("img");
            sprite.setAttribute("src", this.Sprite);
            sprite.style.width = "30px"
            Entity.appendChild(sprite);
        }
        else if (typeof this.Sprite === "boolean") {
            if (this.Sprite) {
                Entity.style.backgroundColor = "red"
            }
            else {
                Entity.style.backgroundColor = "red"
                Entity.style.borderRadius = "100%"
            }
        }
    }
    UpdatePosition() {
        let Entity = document.getElementsByName(this.Name)[0]
        Entity.style.left = `${this.position[0]}px`
        Entity.style.top = `${this.position[1]}px`
    }
    UpdateCoordinates() {
        this.X = this.Entity.offsetLeft;
        this.Y = this.Entity.offsetTop;
        requestAnimationFrame(() => this.UpdateCoordinates());
    }
    AllotControl(speed) {
        let player = this.Entity
        let playerSpeed = speed;
        this.speed = speed
        let playerX = player.offsetLeft
        let playerY = player.offsetTop

        if (controlKeys.length > 1) {
            this.speed = speed / Math.sqrt(2)
        }
        if (controlKeys.includes("w") && playerY >= playerSpeed && !controlKeys.includes("s") && this.moveList.Up) {
            playerY -= playerSpeed;
        }
        if (controlKeys.includes("s") && playerY <= (this.Stage.clientHeight - 4 * playerSpeed) && !controlKeys.includes("w") && this.moveList.Down) {
            playerY += playerSpeed;
        }
        if (controlKeys.includes("a") && playerX >= playerSpeed && !controlKeys.includes("d") && this.moveList.Left) {
            playerX -= playerSpeed;
        }
        if (controlKeys.includes("d") && playerX <= (this.Stage.clientWidth - 4 * playerSpeed) && !controlKeys.includes("a") && this.moveList.Right) {
            playerX += playerSpeed;
        }

        if (!this.moveList.Up && !controlKeys.includes("s") && controlKeys.includes("w")) {
            playerY = this.ColliderData.top[0].offsetTop + this.ColliderData.top[0].offsetHeight
        }
        if (!this.moveList.Down && !controlKeys.includes("w") && controlKeys.includes("s")) {
            playerY = this.ColliderData.bottom[0].offsetTop - this.Entity.offsetHeight
            console.log("GG")
        }
        if (!this.moveList.Left && !controlKeys.includes("d") && controlKeys.includes("a")) {
            playerX = this.ColliderData.left[0].offsetLeft + this.ColliderData.left[0].offsetWidth
        }
        if (!this.moveList.Right && !controlKeys.includes("a") && controlKeys.includes("d")) {
            playerX = this.ColliderData.right[0].offsetLeft - this.Entity.offsetWidth
        }
        document.getElementById('PlayerCordsIndicator').textContent = `Player : ${playerX}, ${playerY}`
        player.style.top = playerY + "px"
        player.style.left = playerX + "px"
        AllotControlanimationId = requestAnimationFrame(() => this.AllotControl(speed));
    }

    AddCollisionDetection() {
        const CollisionDataList = ["top", "bottom", "left", "right", "topLeft", "topRight", "bottomLeft", "bottomRight"]
        CollisionDataList.forEach((listData) => {
            let Box = document.createElement('div');
            Box.classList.add("collisionBox");
            Box.dataset.forentity = this.Name;
            Box.dataset.collisionside = listData;
            this.StageObj.EntityLayer.appendChild(Box);
            Box.style.opacity = 0
        });
        this.UpdataCollisionBox()

    }
    AddCollisionBehavior(Collider) {
        this.DetectCollisionList.push(Collider);
        console.log(...this.DetectCollisionList)
        let AllcollisionBox = document.querySelectorAll(`.collisionBox[data-forentity="${this.Name}"]`);
        const CollisionLoop = () => {
            this.moveList = {
                Up: true,
                Down: true,
                Left: true,
                Right: true
            };
            this.ColliderData = {
                top: [],
                bottom: [],
                left: [],
                right: [],
                topLeft: [],
                topRight: [],
                bottomLeft: [],
                bottomRight: []

            };
            AllcollisionBox.forEach((Box) => {
                this.DetectCollisionList.forEach((Data) => {
                    document.querySelectorAll(`${Data}`).forEach((BoxB) => {
                        if (
                            Box.getBoundingClientRect().left < BoxB.getBoundingClientRect().right &&
                            Box.getBoundingClientRect().right > BoxB.getBoundingClientRect().left &&
                            Box.getBoundingClientRect().top < BoxB.getBoundingClientRect().bottom &&
                            Box.getBoundingClientRect().bottom > BoxB.getBoundingClientRect().top
                        ) {
                            this.ColliderData[Box.dataset.collisionside].push(BoxB);
                            //console.log(this.ColliderData);
                            //console.log("/")
                            switch (Box.dataset.collisionside) {

                                case "top":
                                    this.moveList.Up = false;
                                    break;

                                case "bottom":
                                    this.moveList.Down = false;
                                    break;

                                case "left":
                                    this.moveList.Left = false;
                                    break;

                                case "right":
                                    this.moveList.Right = false;
                                    break;
                            }

                        }
                        Object.entries(this.ColliderData).forEach((n) => {
                            //console.log(n)
                        })
                    })
                })
            })
            /*
        Object.entries(this.ColliderData).forEach((data) => {
            let collider = document.querySelectorAll(`${data[1].collider}`);
            Object.keys(data[1].collisions).forEach(side => {
                data[1].collisions[side] = null;
            });
            
        })
        */
            requestAnimationFrame(() => { CollisionLoop() });
        }
        CollisionLoop();
        /*
        let collider = document.querySelectorAll(`${Collider}`);
        
        AllcollisionBox.forEach((Box) => {
            this.collisionList[Box.dataset.collisionside] = null;
        });

        AllcollisionBox.forEach((Box) => {
            collider.forEach((BoxB) => {
                if (
                    Box.getBoundingClientRect().left < BoxB.getBoundingClientRect().right &&
                    Box.getBoundingClientRect().right > BoxB.getBoundingClientRect().left &&
                    Box.getBoundingClientRect().top < BoxB.getBoundingClientRect().bottom &&
                    Box.getBoundingClientRect().bottom > BoxB.getBoundingClientRect().top
                ) {
                    this.collisionList[Box.dataset.collisionside] = BoxB;
                }
                //console.log(this.collisionList.top);
            });
        });*/

    }
    UpdataCollisionBox() {

        let AllcollisionBox =
            document.querySelectorAll(
                `.collisionBox[data-forentity="${this.Name}"]`
            );

        AllcollisionBox.forEach((ele) => {

            switch (ele.dataset.collisionside) {

                // TOP
                case "top":

                    ele.style.top =
                        `${this.Entity.offsetTop - this.speed}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft}px`;

                    ele.style.width =
                        `${this.Entity.offsetWidth}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "red";
                    ele.style.position = "absolute";

                    break;


                // BOTTOM
                case "bottom":

                    ele.style.top =
                        `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft}px`;

                    ele.style.width =
                        `${this.Entity.offsetWidth}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "red";
                    ele.style.position = "absolute";

                    break;


                // LEFT
                case "left":

                    ele.style.top =
                        `${this.Entity.offsetTop}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft - this.speed}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.Entity.offsetHeight}px`;

                    ele.style.backgroundColor = "red";
                    ele.style.position = "absolute";

                    break;


                // RIGHT
                case "right":
                    ele.style.top =
                        `${this.Entity.offsetTop}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.Entity.offsetHeight}px`;

                    ele.style.backgroundColor = "red";
                    ele.style.position = "absolute";

                    break;


                // TOP LEFT
                case "topLeft":

                    ele.style.top =
                        `${this.Entity.offsetTop - this.speed}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft - this.speed}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "yellow";
                    ele.style.position = "absolute";

                    break;


                // TOP RIGHT
                case "topRight":

                    ele.style.top =
                        `${this.Entity.offsetTop - this.speed}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "yellow";
                    ele.style.position = "absolute";

                    break;


                // BOTTOM LEFT
                case "bottomLeft":

                    ele.style.top =
                        `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft - this.speed}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "yellow";
                    ele.style.position = "absolute";

                    break;


                // BOTTOM RIGHT
                case "bottomRight":

                    ele.style.top =
                        `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;

                    ele.style.left =
                        `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;

                    ele.style.width =
                        `${this.speed}px`;

                    ele.style.height =
                        `${this.speed}px`;

                    ele.style.backgroundColor = "yellow";
                    ele.style.position = "absolute";

                    break;
            }

        });

        requestAnimationFrame(() => {
            this.UpdataCollisionBox();
        });
    }
}

//Export Functions🫡 //
export const Engine = {
    IncializeGame,
    RetainControl,
    DebugMenuShow,
    SetEngineLoop,
    Entity,
    Stage,
    Page,
    DebugMenu,
    get keydown() {
        return keydown;
    }

}
//