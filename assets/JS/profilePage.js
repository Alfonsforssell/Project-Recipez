async function init() {
    let container = document.body;
    try {
        container.innerHTML = "<p>Laddar ...</p>";
        await saveData();
        loadProfilePage();
    } catch(error) {
        container.innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }
   
}
init();