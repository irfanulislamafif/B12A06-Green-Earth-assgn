let cart = [];

// Add event delegation for tree details and add to cart
document.getElementById('trees-container').addEventListener('click', function(e) {
  // Handle tree name clicks for details
  if (e.target.classList.contains('tree-name')) {
    const treeId = e.target.getAttribute('data-id');
    loadTreeDetails(treeId);
  }
  
  // Handle add to cart button clicks
  if (e.target.classList.contains('add-to-cart-btn')) {
    const treeData = e.target.getAttribute('data-tree');
    if (treeData) {
      const tree = JSON.parse(treeData);
      addToCart(tree);
    }
  }
});

const loadContainers = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayContainers(data.categories));

  loadAllTrees();
};

const manageSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  const treesContainer = document.getElementById("trees-container");
  if (isLoading) {
    spinner.classList.remove("hidden");
    treesContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    treesContainer.classList.remove("hidden");
  }
};

const loadAllTrees = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      displayTrees(data.plants);
      manageSpinner(false);
    });
};

const loadCategoryTrees = (Id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${Id}`)
    .then((res) => res.json())
    .then((data) => {
      displayTrees(data.plants);
      manageSpinner(false);
    });
};

const loadTreeDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  
  // Check if the request was successful and plants data exists
  if (data.status && data.plants) {
    displayTreeDetails(data.plants);
  } else {
    console.error("Failed to load tree details:", data.message);
  }
};

const displayTreeDetails = (tree) => {
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
    <figure>
      <img class="rounded-lg w-full object-cover h-60" src="${tree.image}" alt="${tree.name}" />
    </figure>
    <h3 class="font-bold text-2xl mt-4">${tree.name}</h3>
    <p class="py-4 text-gray-600">
      ${tree.description}
    </p>
    <div class="flex justify-between items-center mt-3">
        <p class="bg-[#dcfce7] text-[#15803d] rounded-full px-3 py-1 text-sm font-medium">
            Category: ${tree.category}
        </p>
        <p class="font-semibold text-lg">Price: ৳${tree.price}</p>
    </div>
  `;

  const modal = document.getElementById("my_modal_5");
  modal.showModal();
};

const handleCategoryClick = (clickedButton, categoryId) => {
  const allButtons = document.querySelectorAll(".trees-btn");
  allButtons.forEach((btn) => btn.classList.remove("active"));

  clickedButton.classList.add("active");

  if (categoryId === "all") {
    loadAllTrees();
  } else {
    loadCategoryTrees(categoryId);
  }
};

const displayContainers = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  const allTreesBtn = document.createElement("div");
  allTreesBtn.innerHTML = `
        <p onclick="handleCategoryClick(this, 'all')" class="trees-btn btn btn-default w-full px-2 py-2 bg-[#f0fdf4] text-start text-[0.9rem] font-semibold border-white hover:bg-green-600 hover:text-white active">
            All Trees
        </p>
    `;
  categoriesContainer.appendChild(allTreesBtn);

  categories.forEach((category) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <p onclick="handleCategoryClick(this, '${category.id}')" class="trees-btn btn-default btn w-full px-2 py-2 bg-[#f0fdf4] text-start text-[0.9rem] font-semibold border-white hover:bg-green-600 hover:text-white">
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
                    <h2 class="tree-name font-bold text-lg mt-3 cursor-pointer hover:underline" data-id="${tree.id}">
                        ${tree.name}
                    </h2>
                    <p class="text-sm text-gray-600 mt-2">
                        ${tree.description.slice(0, 50)}...
                    </p>
                    <div class="flex justify-between items-center mt-3">
                        <p class="bg-[#dcfce7] text-[#15803d] rounded-full px-3 py-1 text-sm font-medium inline-block">
                            ${tree.category}
                        </p>
                        <p class="font-semibold text-lg">৳<span>${tree.price}</span></p>
                    </div>
                    <div class="mt-4">
                        <button class="add-to-cart-btn btn bg-[#15803d] text-white rounded-full w-full" data-tree='${JSON.stringify(tree).replace(/'/g, "&apos;")}'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
    treesContainer.appendChild(card);
  });
};

const addToCart = (tree) => {
  const existingTreeInCart = cart.find((item) => item.id === tree.id);
  if (existingTreeInCart) {
    existingTreeInCart.quantity++;
  } else {
    tree.quantity = 1;
    cart.push(tree);
  }
  displayCart();
};

const displayCart = () => {
  const cartContainer = document.getElementById("cartAdded-container");
  const totalElement = document.getElementById("cart-total-price");
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((tree, index) => {
    const cartItemDiv = document.createElement("div");
    totalPrice += tree.price * tree.quantity;
    cartItemDiv.innerHTML = `
           <div class="flex justify-between md:bg-[#f0fdf4] items-center mb-2 p-2 rounded-lg ">
                <div>
                    <p class="font-semibold text-sm">${tree.name}</p>
                    <p class="text-gray-500 text-xs mt-1">
                        ৳ ${tree.price} <i class="fa-solid fa-xmark text-gray-400 text-xs"></i> ${tree.quantity}
                    </p>
                </div>
                <div>
                <button onclick="removeFromCart(${index})" class="text-gray-500 hover:text-red-700">
                    <i class="fa-solid fa-xmark"></i>
                </button></div>
            </div>`;
    cartContainer.appendChild(cartItemDiv);
  });
  totalElement.innerText = totalPrice;
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  displayCart();
};

loadContainers();