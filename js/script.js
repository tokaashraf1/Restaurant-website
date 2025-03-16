const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

// Function to toggle the mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Ensure the menu is in the correct state on page load
function setInitialMenuState() {
  if (window.innerWidth <= 768) {
    mobileMenu.classList.add("hidden"); // Always hide menu on small screens initially
  } else {
    mobileMenu.classList.remove("hidden"); // Ensure it's visible on large screens
  }
}

// Event listener for the hamburger menu
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  });

  // Ensure the menu state updates on resize
  window.addEventListener("resize", setInitialMenuState);

  // Set the correct menu state when the page loads
  setInitialMenuState();
}


document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (window.innerWidth > 768) { // Apply only on screens larger than 768px
        if (window.scrollY > 50) { 
            header.style.backgroundColor = "#0D1323";
            mobileMenu.style.backgroundColor = "#0D1323";
        } else {
            header.style.backgroundColor = "transparent"
            mobileMenu.style.backgroundColor = "transparent";
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");
  const cartPopup = document.getElementById("cart-popup");
  const cartButton = document.getElementById("cart-button");
  const closeCartButton = document.getElementById("close-cart");

  let cart = [];

  // Sample Menu Data
  const menuData = [
      { id: 1, name: "Grilled Shrimp", description: "Delicious shrimp with garlic butter.", price: 12.99, category: "lunch", image: "shrimp.jpg" },
      { id: 2, name: "Lobster Tail", description: "Juicy lobster tail with lemon butter sauce.", price: 19.99, category: "lunch", image: "lobster.jpg" },
      { id: 3, name: "Caesar Salad", description: "Fresh romaine lettuce with parmesan and croutons.", price: 9.99, category: "salad", image: "salad.jpg" },
      { id: 4, name: "Crab Salad", description: "Crab meat with avocado and fresh greens.", price: 11.99, category: "salad", image: "crab-salad.jpg" },
      { id: 5, name: "Cheesecake", description: "Classic cheesecake with berry sauce.", price: 7.99, category: "dessert", image: "cheesecake.jpg" },
      { id: 6, name: "Chocolate Lava Cake", description: "Warm chocolate cake with melted center.", price: 8.99, category: "dessert", image: "lava-cake.jpg" }
  ];

  // Display menu items based on category
  function displayMenu(category) {
      menuContainer.innerHTML = ""; // Clear previous items
      const filteredMenu = menuData.filter(item => item.category === category);

      filteredMenu.forEach(item => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg", "text-center");

          menuItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded-md mb-4">
              <h3 class="text-xl font-semibold">${item.name}</h3>
              <p class="text-gray-600">${item.description}</p>
              <p class="text-lg font-bold text-blue-600">Price: $${item.price.toFixed(2)}</p>
              <button class="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                  Add to Cart
              </button>
          `;

          menuContainer.appendChild(menuItem);
      });
  }

  // Event listeners for filter buttons
  filterButtons.forEach(button => {
      button.addEventListener("click", function () {
          const category = this.getAttribute("data-category");
          displayMenu(category);
      });
  });

  // Show default category (Lunch) when page loads
  displayMenu("lunch");

  // Add item to cart
  window.addToCart = function (id, name, price) {
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ id, name, price, quantity: 1 });
      }
      updateCart();
  };

  // Remove item from cart
  function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
  }

  // Update cart display
  function updateCart() {
      cartContainer.innerHTML = "";
      let total = 0;

      cart.forEach(item => {
          total += item.price * item.quantity;

          const cartItem = document.createElement("li");
          cartItem.classList.add("flex", "justify-between", "items-center", "border-b", "py-2");

          cartItem.innerHTML = `
              <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
          `;

          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-red-600");
          removeButton.addEventListener("click", () => removeFromCart(item.id));

          cartItem.appendChild(removeButton);
          cartContainer.appendChild(cartItem);
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Clear cart
  clearCartBtn.addEventListener("click", () => {
      cart = [];
      updateCart();
  });

  // Show cart popup
  cartButton.addEventListener("click", () => {
      cartPopup.classList.remove("hidden");
  });

  // Close cart popup
  closeCartButton.addEventListener("click", () => {
      cartPopup.classList.add("hidden");
  });
});
