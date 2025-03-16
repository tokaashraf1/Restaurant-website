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
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  let cart = [];

  // Use menuData from data.js
  displayMenu(menuData);

  function displayMenu(menu) {
    menuContainer.innerHTML = ""; // Clear previous content
    menu.forEach(item => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");

      menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
      `;

      const addButton = document.createElement("button");
      addButton.textContent = "Add to Cart";
      addButton.addEventListener("click", () => addToCart(item.id, item.name, item.price));
      menuItem.appendChild(addButton);

      menuContainer.appendChild(menuItem);
    });
  }

  // Add item to cart
  function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
  }

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
      cartItem.innerHTML = `
        ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      `;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
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
});
