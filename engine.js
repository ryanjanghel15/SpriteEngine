//On Page Elements 🥹 //
const debugMenu = document.getElementById("debugMenu");

//JUst Vatribles 👍//
let debugMenuShow = false;
let keydown = "";
let controlKeys = []
let AllotControlanimationId = null;
let EngineLoopList = [];
let DisplayedWarn = false;


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
    EngineLoopList = []


}

function DiffOf(a, b) {
    return Math.max(a, b) - Math.min(a, b)
}


function SetEngineLoop(func) {
    EngineLoopList.push(func);
}

function EngineLoop() {
    EngineLoopList.forEach(func => {
        func()
    })
    requestAnimationFrame(EngineLoop)
}

function RetainControl() {
    if (AllotControlanimationId !== null) {
        cancelAnimationFrame(AllotControlanimationId);
        AllotControlanimationId = null;
    }
}


// Key Detection
addEventListener("keydown", (e) => {
    keydown = e.key
    switch (e.key) {
        case "`":
            debugMenuShow = !debugMenuShow;
            DebugMenu.Show();
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
    static DebugEle = class DebugEle{
        constructor(Ele,Opacity){
            Ele.classList.add("DebugEle")
            Ele.dataset.opacval = Opacity;
            Ele.style.opacity = 0;
        }
    }
    static Show() {
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
        })
        document.querySelectorAll(".DebugEle").forEach((Ele)=>{
            Ele.style.opacity = Ele.dataset.opacval;
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
        })
        document.querySelectorAll(".DebugEle").forEach((Ele)=>{
            Ele.style.opacity = 0;
        })
    }


}

    static WaterMrk(url, msg) {
        let WtMEle = document.createElement("div")
        WtMEle.setAttribute("id", "WaterMrkIndiacator")
        WtMEle.innerHTML = `<p>${msg}</p> <img src="${url}" id="WaterMrkIndiacatorImg">`
        debugMenu.appendChild(WtMEle)
    }
    static AddDebugIndicator(DisplayTitle, Value) {
        let PEle = document.createElement("p");
        PEle.setAttribute("id", `${DisplayTitle}`);
        PEle.classList.add("DebugInicator")
        debugMenu.appendChild(PEle);
        debugMenu.appendChild(document.createElement("br"));
        SetEngineLoop(() => {
            PEle.textContent = DisplayTitle + ":" + Value()
        })
    }
}

class Stage {
    constructor(Name, AppendedElement, url) {
        this.Name = Name;
        this.AppendedElement = AppendedElement;
        this.MapData = null;
        this.EntityLayer
        this.PlotLayer
        this.OtherLayer


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
        this.stage.style.width = `${placeholder.stageDimentions[0]}`;
        this.stage.style.height = `${placeholder.stageDimentions[1]}`;
        this.stage.style.position = "relative"
        //
        this.EntityLayer = document.createElement("div")
        this.EntityLayer.classList.add("EntityLayer")
        this.EntityLayer.style.position = "absolute"
        this.EntityLayer.style.width = `${placeholder.stageDimentions[0]}`;
        this.EntityLayer.style.height = `${placeholder.stageDimentions[1]}`;
        this.stage.appendChild(this.EntityLayer);
        //
        this.OtherLayer = document.createElement("div")
        this.OtherLayer.classList.add("OtherLayer")
        this.OtherLayer.style.zIndex = 10;
        this.OtherLayer.style.position = "absolute"
        this.OtherLayer.style.width = `${placeholder.stageDimentions[0]}`;
        this.OtherLayer.style.height = `${placeholder.stageDimentions[1]}`;
        this.stage.appendChild(this.OtherLayer);
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
            this.PlotLayer.style.width = `${placeholder.stageDimentions[0]}`;
            this.PlotLayer.style.height = `${placeholder.stageDimentions[1]}`;
            this.PlotLayer.style.top = "0px";
            this.PlotLayer.style.left = "0px";

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
class Geometry {
    static Line = class Line {
        constructor(Name, Stage, [x1, y1], [x2, y2], width) {
            this.Name = Name;
            this.Stage = Stage;
            this.Line;
            this.from = [x1, y1];
            this.to = [x2, y2];
            this.width = width;
            this.length;
            this.Line = document.createElement('div');
            this.Line.classList.add("line")
            this.Line.style.borderRadius = `${this.width/2}px`
            this.Line.style.backgroundColor = "black"
            this.Line.style.position = "absolute";
            this.ChangePosition(this.from,this.to);
            Stage.OtherLayer.appendChild(this.Line)
            this.Line.setAttribute("name", this.Name)
        }
        ChangePosition([x1, y1], [x2, y2]) {
            this.from = [x1, y1];
            this.to = [x2, y2];
            
            /*Who said CS don't have Math😭*/
            this.Line.style.height = `${this.width}px`;
            this.Line.style.width = `${Math.sqrt((DiffOf(x1, x2)) ** 2 + (DiffOf(y1, y2)) ** 2)}px`;
            this.length = Math.sqrt((DiffOf(x1, x2)) ** 2 + (DiffOf(y1, y2)) ** 2);
            let theta = Math.atan(DiffOf(y1, y2) / DiffOf(x1, x2)) * 180 / Math.PI;
            if (y1 > y2) {theta = -theta;}
            if (x1 > x2) {theta = 180 - theta;}
            this.Line.style.rotate = `${theta}deg`
            this.Line.style.top = `${y1}px`
            this.Line.style.left = `${x1}px`

        }
    }
    static DistanceOfEle(){}
}
class Entity {
    static EntityList = [];
    constructor(Name, Sprite, Pose, Stage) {
        this.Name = Name
        this.Entity
        this.Sprite = Sprite
        this.position = Pose
        this.speed
        this.Friction = 0;
        this.X //READ ONLY
        this.Y //READ ONLY
        this.DeltaX //Calc & Read ONLY
        this.DeltaY //Calc & Read ONLY
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
        this.Move = {
            Up: true,
            Down: true,
            Left: true,
            Right: true,
        }
        let EntityEle = document.createElement("div");
        EntityEle.classList.add("Entity");
        EntityEle.style.position = "absolute";
        EntityEle.setAttribute("name", this.Name);

        console.log(this.Stage)
        this.StageObj.EntityLayer.appendChild(EntityEle);
        this.Entity = EntityEle
        this.UpdateSprite()
        this.UpdatePosition()
        this.X = this.Entity.offsetLeft
        this.Y = this.Entity.offsetTop
        this.UpdateCoordinates()
        SetEngineLoop(() => { this.CollisionLoop() });
        this.ForceLoop()
        Entity.EntityList.push(this)
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
        SetEngineLoop(() => {
            let player = this.Entity
            let playerSpeed = speed;
            this.speed = speed
            let playerX = player.offsetLeft
            let playerY = player.offsetTop

            if (controlKeys.length > 1) {
                this.speed = speed / Math.sqrt(2)
            }
            if (controlKeys.includes("w") && playerY >= playerSpeed && !controlKeys.includes("s") && this.moveList.Up && this.Move.Up) {
                playerY -= playerSpeed;
            }
            if (controlKeys.includes("s") && playerY <= (this.Stage.offsetHeight - this.Entity.offsetHeight) && !controlKeys.includes("w") && this.moveList.Down && this.Move.Down) {
                playerY += playerSpeed;
            }
            if (controlKeys.includes("a") && playerX >= playerSpeed && !controlKeys.includes("d") && this.moveList.Left && this.Move.Left) {
                playerX -= playerSpeed;
            }
            if (controlKeys.includes("d") && playerX <= (this.Stage.offsetWidth - this.Entity.offsetWidth) && !controlKeys.includes("a") && this.moveList.Right && this.Move.Right) {
                playerX += playerSpeed;
            }
            //
            if (playerY <= playerSpeed && controlKeys.includes("w")) {
                playerY = 0
            }
            if (controlKeys.includes("s") && playerY >= (this.Stage.offsetHeight - this.Entity.offsetHeight)) {
                playerY = this.Stage.clientHeight - this.Entity.offsetHeight;
            }
            if (controlKeys.includes("a") && playerX <= playerSpeed) {
                playerX = 0;
            }
            if (controlKeys.includes("d") && playerX >= (this.Stage.offsetWidth - this.Entity.offsetWidth)) {
                playerX = this.Stage.clientWidth - this.Entity.clientWidth;
            }
            //
            if (!this.moveList.Up && !controlKeys.includes("s") && controlKeys.includes("w")) {
                playerY = this.ColliderData.top.at(-1).offsetTop + this.ColliderData.top[0].offsetHeight+0
            }
            if (!this.moveList.Down && !controlKeys.includes("w") && controlKeys.includes("s")) {
                playerY = this.ColliderData.bottom[0].offsetTop - this.Entity.offsetHeight-0
            }
            if (!this.moveList.Left && !controlKeys.includes("d") && controlKeys.includes("a")) {
                playerX = this.ColliderData.left.at(-1).offsetLeft + this.ColliderData.left[0].offsetWidth +0
            }
            if (!this.moveList.Right && !controlKeys.includes("a") && controlKeys.includes("d")) {
                playerX = this.ColliderData.right[0].offsetLeft - this.Entity.offsetWidth-0
            }

            player.style.top = playerY + "px"
            player.style.left = playerX + "px"
        })

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
        if (!this.DetectCollisionList.includes(Collider)) {
            this.DetectCollisionList.push(Collider);
            console.log(...this.DetectCollisionList)
        }
    }
    RetainCollisionBehavior(Collider) {
        if (this.DetectCollisionList.indexOf(Collider) !== -1) {
            this.DetectCollisionList.splice(this.DetectCollisionList.indexOf(Collider), 1)
        }
    }
    CollisionLoop() {
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
        let AllcollisionBox = document.querySelectorAll(`.collisionBox[data-forentity="${this.Name}"]`);
        AllcollisionBox.forEach((Box) => {
            switch (Box.dataset.collisionside) {

                // TOP
                case "top":
                    Box.style.backgroundColor = "red"
                    break;

                // BOTTOM
                case "bottom":
                    Box.style.backgroundColor = "red"
                    break;

                // LEFT
                case "left":
                    Box.style.backgroundColor = "red"
                    break;

                // RIGHT
                case "right":
                    Box.style.backgroundColor = "red"
                    break;

                // TOP LEFT
                case "topLeft":
                    Box.style.backgroundColor = "yellow"

                    break;

                // TOP RIGHT
                case "topRight":
                    Box.style.backgroundColor = "yellow"

                    break;

                // BOTTOM LEFT
                case "bottomLeft":
                    Box.style.backgroundColor = "yellow"

                    break;
                // BOTTOM RIGHT
                case "bottomRight":
                    Box.style.backgroundColor = "yellow"
                    break;
            }
            this.DetectCollisionList.forEach((Data) => {
                document.querySelectorAll(`${Data}`).forEach((BoxB) => {
                    if (
                        (Box.getBoundingClientRect().left) < BoxB.getBoundingClientRect().right &&
                        Box.getBoundingClientRect().right > BoxB.getBoundingClientRect().left &&
                        Box.getBoundingClientRect().top < BoxB.getBoundingClientRect().bottom &&
                        Box.getBoundingClientRect().bottom > BoxB.getBoundingClientRect().top
                    ) {
                        this.ColliderData[Box.dataset.collisionside].push(BoxB);
                        //console.log(this.ColliderData);
                        //console.log("/")
                        Box.style.backgroundColor = "purple"
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
                })
            })
        })
    }
    UpdataCollisionBox() {

        let AllcollisionBox =
            document.querySelectorAll(
                `.collisionBox[data-forentity="${this.Name}"]`
            );

        AllcollisionBox.forEach((ele) => {
                //Long.... Yet EZ. 🛠️
            switch (ele.dataset.collisionside) {

                // TOP
                case "top": {
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop - yDistance}px`;
                    ele.style.left = `${this.Entity.offsetLeft}px`;
                    ele.style.width = `${this.Entity.offsetWidth}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // BOTTOM
                case "bottom": {
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;
                    ele.style.left = `${this.Entity.offsetLeft}px`;
                    ele.style.width = `${this.Entity.offsetWidth}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // LEFT
                case "left": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));

                    ele.style.top = `${this.Entity.offsetTop+1}px`;
                    ele.style.left = `${this.Entity.offsetLeft - xDistance}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${this.Entity.offsetHeight-2}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // RIGHT
                case "right": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));

                    ele.style.top = `${this.Entity.offsetTop+1}px`;
                    ele.style.left = `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${this.Entity.offsetHeight-2}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // TOP LEFT
                case "topLeft": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop - yDistance}px`;
                    ele.style.left = `${this.Entity.offsetLeft - xDistance}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // TOP RIGHT
                case "topRight": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop - yDistance}px`;
                    ele.style.left = `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // BOTTOM LEFT
                case "bottomLeft": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;
                    ele.style.left = `${this.Entity.offsetLeft - xDistance}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }


                // BOTTOM RIGHT
                case "bottomRight": {
                    const xDistance = Math.max(this.speed, Math.abs(this.Xforce));
                    const yDistance = Math.max(this.speed, Math.abs(this.Yforce));

                    ele.style.top = `${this.Entity.offsetTop + this.Entity.offsetHeight}px`;
                    ele.style.left = `${this.Entity.offsetLeft + this.Entity.offsetWidth}px`;
                    ele.style.width = `${xDistance}px`;
                    ele.style.height = `${yDistance}px`;
                    ele.style.position = "absolute";

                    break;
                }
            }


        });

        requestAnimationFrame(() => {
            this.UpdataCollisionBox();
        });
    }
    AddForce(X, Y) {
        this.Xforce += X;
        this.Yforce += Y;
    }
    ForceLoop() {
        SetEngineLoop(() => {

            if (this.Xforce != 0) { this.Xforce -= Math.sign(this.Xforce) * this.Friction; }
            if (this.Yforce != 0) { this.Yforce -= Math.sign(this.Yforce) * this.Friction; }

            const playerX = this.Entity.offsetLeft;
            const playerY = this.Entity.offsetTop;
            //TOOK TOO LONG>>> 🥹
            
            if (!this.moveList.Left || !this.moveList.Right || playerX <= 0 || playerX + this.Entity.offsetWidth >= this.Stage.offsetWidth) {
                this.Xforce *= -1
            }
            if (!this.moveList.Up || !this.moveList.Down || playerY <= 0 || playerY + this.Entity.offsetHeight >= this.Stage.offsetHeight) {
                this.Yforce *= -1
            }
            this.Entity.style.left =
                `${playerX + this.Xforce}px`;

            this.Entity.style.top =
                `${playerY + this.Yforce}px`;
        })
    }
}
SetEngineLoop(() => {
    if (!Engine.ExperimentalPrtection || DisplayedWarn) { return; }

    Entity.EntityList.forEach((Entities) => {
        if (
            Math.abs(Entities.Xforce) >= 90 ||
            Math.abs(Entities.Yforce) >= 90 ||
            Entities.speed >= 90
        ) {
            window.alert(`Warning! The simulation You are trying to replicate contains unusually high magnitude of physical quantities and the Engine is not advance and may result in inaccurate or unstable physics behavior. We will try to make a better solution for this isssue. 🫡`)
            DisplayedWarn = true;
        }

    });
});
//Export Functions🫡 //
export const Engine = {
    ExperimentalPrtection: true,
    IncializeGame,
    RetainControl,
    SetEngineLoop,
    DiffOf,
    Entity,
    Stage,
    Page,
    DebugMenu,
    Geometry,
    get keydown() {
        return keydown;
    }

}
EngineLoop();
//let LINK =  document.createElement("link");
//LINK.setAttribute("rel","stylesheet")
//LINK.setAttribute("href","https://cdn.jsdelivr.net/gh/ryanjanghel15/SpriteEngine/style.css")

//document.head.appendChild(LINK)
//