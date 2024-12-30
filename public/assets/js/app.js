const store = {
  cart: [],
  favourites: [],
  init() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    this.update();
  },
  update() {
    const cartCount = document.querySelector("[data-count='cart']");
    const favouritesCount = document.querySelector("[data-count='favourites']");

    cartCount.textContent = this.cart.length;
    favouritesCount.textContent = this.favourites.length;

    if (this.cart.length) {
      cartCount.style.display = "flex";
    } else {
      cartCount.style.display = "none";
    }

    if (this.favourites.length) {
      favouritesCount.style.display = "flex";
    } else {
      favouritesCount.style.display = "none";
    }
  },
  addToCart(product) {
    this.cart.push(product);
    this.update();
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
  removeFromCart(product) {
    this.cart = this.cart.filter((item) => item.id !== product.id);
    this.update();
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
  addToFavourites(product) {
    this.favourites.push(product);
    this.update();
    localStorage.setItem("favourites", JSON.stringify(this.favourites));
  },
  removeFromFavourites(product) {
    this.favourites = this.favourites.filter((item) => item.id !== product.id);
    this.update();
    localStorage.setItem("favourites", JSON.stringify(this.favourites));
  },
  clearCart() {
    this.cart = [];
    this.update();
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
};
store.init();

// header
const header = document.querySelector(".header");
if (header) {
  const triggers = header.querySelectorAll(".header__trigger");
  const menu = header.querySelector(".header__menu");
  const services = header.querySelectorAll(".menu-item-has-children");
  // const servicesSubMenu = services.querySelector(".sub-menu");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      menu.classList.toggle("active");

      triggers.forEach((trigger) => {
        trigger.classList.toggle("active");
      });
    });
  });

  // Close the menu when clicking outside, but only if the menu is open
  document.addEventListener("click", (event) => {
    if (menu.classList.contains("active") && !header.contains(event.target)) {
      // Check if the click is outside the header and the menu is open
      menu.classList.remove("active");
      triggers.forEach((trigger) => {
        trigger.classList.remove("active");
      });
    }
  });

  if (window.innerWidth < 1280) {
    const icon = document.createElement("span");
    icon.classList.add("icon-down");
    icon.innerHTML =
      '<svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4L8 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';

    services.forEach((service) => {
      const link = service.querySelector("a");
      const subMenu = service.querySelector(".sub-menu");

      link.appendChild(icon);
      link.addEventListener("click", () => {
        link.classList.toggle("active");
        subMenu.classList.toggle("active");
      });
    });
  }
}

// Intro Swiper
let introSwiper = new Swiper(".intro__swiper .swiper", {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".intro__swiper .swiper-pagination",
    clickable: true,
  },
});

// projects swiper
let projectsSwiper = new Swiper(".projects .projects__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".projects .title .btn-next",
    prevEl: ".projects .title .btn-prev",
  },
  breakpoints: {
    476: {
      spaceBetween: 15,
    },
    1025: {
      spaceBetween: 24,
    },
  },
});

// products swiper
let productsSwiper = new Swiper(".products .products__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".products .title .btn-next",
    prevEl: ".products .title .btn-prev",
  },
  breakpoints: {
    476: {
      spaceBetween: 15,
    },
    1025: {
      spaceBetween: 24,
    },
  },
});

const getAllProducts = document.querySelectorAll(".product");
getAllProducts.forEach((product) => {
  const title = product.querySelector("[data-title]");
  const price = product.querySelector("[data-price]");
  const realPrice = product.querySelector("[data-real-price]");

  const btnFavourite = product.querySelector("[data-btn-favourite]");
  const btnOrder = product.querySelector("[data-btn-order]");

  const data = {
    id: parseFloat(product.dataset.id),
    color: product.dataset.color,
    title: title.textContent,
    price: parseFloat(price.dataset.price),
    realPrice: parseFloat(realPrice.dataset.realPrice),
    count: parseFloat(product.dataset.count),
  };

  btnFavourite.addEventListener("click", () => store.addToFavourites(data));
  btnOrder.addEventListener("click", () => store.addToCart(data));
});
