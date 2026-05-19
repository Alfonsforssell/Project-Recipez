async function init() {
    await saveData();
    tagInput();
    autoFillInformationChangeDelete();
    addDish()
    deleteDish();
    changeDish();
}

init();