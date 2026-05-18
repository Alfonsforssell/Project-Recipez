async function init () {
    await saveData();
    createProfilePage(user);
}
init();