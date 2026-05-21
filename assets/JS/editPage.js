async function init() {
    try {
        await saveData();
        tagInputAdd();
        tagInputChange();
        autoFillInformationChangeDelete();
        addDish()
        deleteDish();
        changeDish();
    } catch (error) {
        document.querySelector("main").innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }

}
init();