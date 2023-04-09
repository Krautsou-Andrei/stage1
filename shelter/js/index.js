import MenuBurger from "./burger-menu.js";
import Slider from "./sider.js";
import Pagination from "./pagination.js";
import { utilPopup } from "./utils.js";

const SELECTORS = {
  MENU: "[data-menu-burger]",
  CARD: "[data-item-card]",
  SLIDER: "[data-slider]",
};

const menuBurger = document.querySelector(SELECTORS.MENU);
const slider = document.querySelector(SELECTORS.SLIDER);

new MenuBurger(menuBurger);

let dataCards = {};
let sliderSite = {};
let paginationPage = {};

const renderSlider = (arrayCards) => {
  const breakpoint = [
    {
      width: 750,
      cards: 1,
    },
    {
      width: 1200,
      cards: 2,
    },
  ];
  sliderSite = new Slider(slider, arrayCards, breakpoint, 3);
  dataCards = [...arrayCards];
  utilPopup(dataCards);
};

const renderPagination = (arrayCards) => {
  arrayCards.forEach((card) => {
    card.image = `.${card.image}`;
  });

  let arrayPagination = [];
  for (let i = 0; i < 6; i++) {
    arrayPagination = [...arrayPagination, ...arrayCards];
  }

  paginationPage = new Pagination(arrayPagination);
  utilPopup(arrayCards);
};

(async () => {
  let data = [];
  let response = await fetch("./js/data-cards.json");
  if (response.status === 200) {
    data = await response.json();
    renderSlider(data);
  } else {
    let response = await fetch("../js/data-cards.json");
    data = await response.json();
    renderPagination(data);
  }
})();

const windowSize = () => {
  if (!!Object.keys(sliderSite).length) {
    if (window.screen.width >= 1200) {
      sliderSite.changeScreen(3);
    }

    if (window.screen.width < 1200 && window.screen.width >= 750) {
      sliderSite.changeScreen(2);
    }

    if (window.screen.width < 750) {
      sliderSite.changeScreen(1);
    }
  }

  if (!!Object.keys(paginationPage).length) {
    if (window.screen.width >= 1280) {
      paginationPage.changeScreen(8);
    }

    if (window.screen.width < 1280 && window.screen.width >= 750) {
      paginationPage.changeScreen(6);
    }

    if (window.screen.width < 750) {
      paginationPage.changeScreen(4);
    }
  }
};

window.addEventListener("resize", windowSize);
