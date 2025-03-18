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
  
function displayMenu(category) {
  menuContainer.innerHTML = "";
  const filteredMenu = menuData.filter(item => item.category === category);

  filteredMenu.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("mt-3"); // Keep existing structure

    const imageDiv = document.createElement("div");
    imageDiv.innerHTML = `
      <div class="flex gap-[10px]">
        <img src="${item.image}" alt="${item.name}" class="w-[100px] h-[100px] object-cover rounded-md">
        <div class="w-full">
          <div class="flex justify-between">
            <h3 class="text-lg font-bold">${item.name}</h3>
            <h3 class="text-lg font-bold">${item.price}</h3>
          </div>
          <hr class="my-2 border-gray-300">  
          
          <!-- Buttons Placeholder -->
          <div class="buttons-container"></div>
          
        </div>
      </div>
    `;

    // Creating the buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("mt-4", "flex", "gap-3");

    const addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = `<img src="./img/shopping-cart (1).png" alt="Add to Cart" class="w-5 h-5 inline-block">`;  
    addToCartButton.classList.add("bg-green-400", "text-white", "px-2", "py-2", "rounded", "hover:bg-green-600");
    addToCartButton.addEventListener("click", () => addToCart(item));

    const addToWishlistButton = document.createElement("button");
    addToWishlistButton.innerHTML = `<img src="./img/favorite.png" alt="Add to Cart" class="w-5 h-5 inline-block">`; 
    addToWishlistButton.classList.add("bg-[#D75838]", "text-white", "px-2", "py-2", "rounded", "hover:bg-[#b74a2f]");
    addToWishlistButton.addEventListener("click", () => addToWishlist(item));

    // Append buttons inside the designated container inside `imageDiv`
    buttonsDiv.appendChild(addToCartButton);
    buttonsDiv.appendChild(addToWishlistButton);

    const buttonsContainer = imageDiv.querySelector(".buttons-container");
    buttonsContainer.appendChild(buttonsDiv);

    menuItem.appendChild(imageDiv);
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

//form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("clearBtn").addEventListener("click", function () {
      document.getElementById("myForm").reset();
  });
});
