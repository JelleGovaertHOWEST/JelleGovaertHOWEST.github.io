function onDragStart(e){
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.setData("text/plain", e.target.id);
}

function onDragOver(e){
    e.preventDefault();
}

function onDrop(e){
    const sourceId = e.dataTransfer.getData("text/plain");
    const sourceElement = document.querySelector("#"+ sourceId);

    document.querySelector("#details").classList.remove("hidden");
    document.querySelector("#movie-selection").classList.add("hidden");
}