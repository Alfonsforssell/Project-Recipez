async function init() {
    await saveData();
    tagInput();
    addDish()
    deleteDish();
}

init();