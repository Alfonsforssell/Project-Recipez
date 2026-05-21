function init() {
    let container = document.getElementById("container");
    try {
        login();
        signUp();
        logOut();
    } catch(error) {
         container.innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }
  
}
init();