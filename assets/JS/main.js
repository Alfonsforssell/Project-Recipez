async function init() {
    let container = document.getElementById("cards");
    try {
        await saveData();
        checkLoginStatus();
        createProducts();
        createForm();
        search();
        submitFilter();
        favoriteMain();
    } catch (error) {
        container.innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }
}

init();