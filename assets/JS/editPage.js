async function init() {
    await saveData();
    tagInput();
    addDish()
    autoFillInformationChangeDelete();
    deleteDish();
    changeDish();
}

init();