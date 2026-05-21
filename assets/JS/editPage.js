async function init() {
    await saveData();
    tagInputAdd();
    tagInputChange();
    autoFillInformationChangeDelete();
    addDish()
    deleteDish();
    changeDish();
}

init();