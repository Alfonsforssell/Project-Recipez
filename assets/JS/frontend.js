function tagInput() {
    const input = document.getElementById("ingredientInput");
    const tagsContainer = document.getElementById("tags");

    let ingredients = [];

    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            e.preventDefault();

            const value = input.value.trim();
            ingredients.push(value);

            createTag(value);
            input.value = "";
        }
    });

    function createTag(text) {
        const tag = document.createElement("div");
        tag.classList.add("tag");

        tag.innerHTML = `
        ${text}
        <span>&times;</span>
    `;

        tag.querySelector("span").addEventListener("click", () => {
            tag.remove();
            ingredients = ingredients.filter(i => i !== text);
        });

        tagsContainer.appendChild(tag);
    }
}