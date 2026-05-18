async function init() {
    await saveData();
    createProducts();
    createForm();
    search();
    submitFilter();
}

init();