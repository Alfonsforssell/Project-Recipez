async function init() {
    await saveData();
    createForm();
    tagInput();
    addDish();
}

init();