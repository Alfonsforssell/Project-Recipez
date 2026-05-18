async function init() {
    await saveData();
    createProducts();
    createForm();
    submitFilter();
}

init();