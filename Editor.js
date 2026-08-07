import {
    IncializeGame,
    BuildMap,
    AllotControl,
    CreateEntity,
    DebugMenuShow,
    RetainControl,
    keydown
} from './engine.js'

IncializeGame();
BuildMap();
DebugMenuShow();
CreateEntity("Entity1","/Media/Sprite/TabCover-removebg-preview.png",[100,200]);
AllotControl("Entity1",10);
