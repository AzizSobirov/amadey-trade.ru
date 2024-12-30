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
    nextEl: ".projects .btn-next",
    prevEl: ".projects .btn-prev",
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
