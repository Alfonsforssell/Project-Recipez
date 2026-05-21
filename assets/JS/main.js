async function init() {
    await saveData();
    checkLoginStatus();
    createProducts();
    createForm();
    search();
    submitFilter();
}

init();