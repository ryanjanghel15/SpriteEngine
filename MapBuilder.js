async function LoadMapData() {
    const responce = await fetch("/MapData/Map.json");
    const data =await responce.json();

    if(data.XtoYratio[0]*data.XtoYratio[1] == data.plot.length){
        return data;
    }
    else
        return "Error In Map Data"
    
}

export let MapData = await LoadMapData();
