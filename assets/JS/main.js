async function init() {
    await saveData();
    createProducts();
    createForm();
    search();
}

init();