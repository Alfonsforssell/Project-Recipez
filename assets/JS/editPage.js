async function init() {
    let container = document.getElementById("container");
    try {
        container.innerHTML = "<p>Laddar ...</p>";
        await saveData();
        tagInputAdd();
        tagInputChange();
        autoFillInformationChangeDelete();
        addDish()
        deleteDish();
        changeDish();
    } catch (error) {
        container.innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }

}
init();