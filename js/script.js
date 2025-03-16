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
  const cartContainer = document.getElementById("cart-items");
  const wishlistContainer = document.getElementById("wishlist-items");
  const cartTotal = document.getElementById("cart-total");
  const cartButton = document.getElementById("cart-button");
  const wishlistButton = document.getElementById("wishlist-button");
  const closeCart = document.getElementById("close-cart");
  const clearCart = document.getElementById("clear-cart");
  const closeWishlist = document.getElementById("close-wishlist");
  const cartPopup = document.getElementById("cart-popup");
  const wishlistPopup = document.getElementById("wishlist-popup");

  let cart = [];
  let wishlist = [];

  // Sample menu data
  const menuData = [
      { id: 1, name: "Grilled Shrimp", category: "lunch", price: 12.99, image: "shrimp.jpg", description: "Delicious grilled shrimp." },
      { id: 2, name: "Caesar Salad", category: "salad", price: 8.99, image: "salad.jpg", description: "Fresh Caesar salad with croutons." },
      { id: 3, name: "Chocolate Cake", category: "dessert", price: 6.99, image: "cake.jpg", description: "Rich chocolate cake." }
  ];

  function displayMenu(category) {
      menuContainer.innerHTML = "";
      const filteredMenu = menuData.filter(item => item.category === category);
      filteredMenu.forEach(item => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item", "border", "p-4", "rounded-lg", "shadow-md", "bg-white");

          menuItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-md">
              <h3 class="text-lg font-bold mt-2">${item.name}</h3>
              <p class="text-sm">${item.description}</p>
              <p class="font-semibold mt-2">Price: $${item.price.toFixed(2)}</p>
          `;

          const addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Add to Cart";
          addToCartButton.classList.add("bg-blue-600", "text-white", "px-3", "py-1", "rounded", "hover:bg-blue-700", "mt-2");
          addToCartButton.addEventListener("click", () => addToCart(item));

          const addToWishlistButton = document.createElement("button");
          addToWishlistButton.textContent = "❤️ Wishlist";
          addToWishlistButton.classList.add("bg-purple-600", "text-white", "px-3", "py-1", "rounded", "hover:bg-purple-700", "mt-2", "ml-2");
          addToWishlistButton.addEventListener("click", () => addToWishlist(item));

          menuItem.appendChild(addToCartButton);
          menuItem.appendChild(addToWishlistButton);
          menuContainer.appendChild(menuItem);
      });
  }

  function addToCart(item) {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ ...item, quantity: 1 });
      }
      updateCart();
  }

  function updateCart() {
      cartContainer.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
          total += item.price * item.quantity;

          const cartItem = document.createElement("div");
          cartItem.classList.add("flex", "items-center", "space-x-4", "py-2");

          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
              <span class="text-lg font-medium">${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
          `;

          cartContainer.appendChild(cartItem);

          // Add separator line except after last item
          if (index < cart.length - 1) {
              const separator = document.createElement("hr");
              separator.classList.add("border-t", "border-gray-300", "my-2");
              cartContainer.appendChild(separator);
          }
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  function addToWishlist(item) {
      if (!wishlist.find(wishItem => wishItem.id === item.id)) {
          wishlist.push(item);
          updateWishlist();
      }
  }

  function updateWishlist() {
      wishlistContainer.innerHTML = "";
      wishlist.forEach((item, index) => {
          const wishlistItem = document.createElement("div");
          wishlistItem.classList.add("flex", "items-center", "space-x-4", "py-2");

          wishlistItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
              <span class="text-lg font-medium">${item.name}</span>
          `;

          wishlistContainer.appendChild(wishlistItem);

          // Add separator line except after last item
          if (index < wishlist.length - 1) {
              const separator = document.createElement("hr");
              separator.classList.add("border-t", "border-gray-300", "my-2");
              wishlistContainer.appendChild(separator);
          }
      });
  }

  document.querySelectorAll(".filter-btn").forEach(button => {
      button.addEventListener("click", () => displayMenu(button.dataset.category));
  });

  cartButton.addEventListener("click", () => cartPopup.classList.remove("hidden"));
  wishlistButton.addEventListener("click", () => wishlistPopup.classList.remove("hidden"));
  closeCart.addEventListener("click", () => cartPopup.classList.add("hidden"));
  closeWishlist.addEventListener("click", () => wishlistPopup.classList.add("hidden"));

  displayMenu("lunch"); // Default category
});
