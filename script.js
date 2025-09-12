const loadContainers = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayContainers(data.categories));

    loadAllTrees();
};

const loadAllTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayTrees(data.plants));
};

const loadCategoryTrees = (Id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${Id}`)
        .then(res => res.json())
        .then(data => displayTrees(data.plants));
};

const displayContainers = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    const allTreesBtn = document.createElement("div");
    allTreesBtn.innerHTML = `
        <p onclick="loadAllTrees()" class="btn w-full px-5 bg-[#f0fdf4] text-start border-white hover:bg-green-600 hover:text-white">
            All Trees
        </p>
    `;
    categoriesContainer.appendChild(allTreesBtn);

    categories.forEach(category => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <p onclick="loadCategoryTrees('${category.id}')" class="btn w-full px-5 bg-[#f0fdf4] text-start border-white hover:bg-green-600 hover:text-white">
                ${category.category_name}
            </p>
        `;
        categoriesContainer.appendChild(btnDiv);
    });
};

const displayTrees = (trees) => {
    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";
    trees.forEach((tree) => {
        const card = document.createElement("div");
        card.innerHTML = `
           <div class="card bg-base-100 w-full shadow-sm p-3 h-full">
                <figure>
                    <img class="rounded-lg h-48 w-full object-cover" src="${tree.image}" alt="${tree.name}" />
                </figure>
                <div class="p-0">
                    <h2 class="font-bold text-lg mt-3">${tree.name}</h2>
                    <p class="text-sm text-gray-600 mt-2">
                        ${tree.description.slice(0,50)}...
                    </p>
                    <div class="flex justify-between mt-3">
                        <p class="bg-[#dcfce7] text-[#15803d] rounded-full px-3 py-1 text-sm font-medium inline-block">
                            ${tree.category}
                        </p>
                        <p class="font-semibold text-lg">৳<span>${tree.price}</span></p>
                    </div>
                    <div class="mt-4">
                        <button class="btn bg-[#15803d] text-white rounded-full w-full">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
        treesContainer.appendChild(card);
    });
};

loadContainers();