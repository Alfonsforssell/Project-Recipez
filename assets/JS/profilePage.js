async function init() {
    let container = document.querySelector("#main");
    try {
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