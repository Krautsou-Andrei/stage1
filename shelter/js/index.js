import MenuBurger from "./burger-menu.js";
import Slider from "./sider.js";
import { utilPopup } from "./utils.js";

const SELECTORS = {
  MENU: "[data-menu-burger]",
  CARD: "[data-item-card]",
  SLIDER: "[data-slider]",
};

const menuBurger = document.querySelector(SELECTORS.MENU);
const slider = document.querySelector(SELECTORS.SLIDER);

new MenuBurger(menuBurger);

let dataCards = [];
let sliderSite = [];

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

(async () => {
  let data = [];
  let response = await fetch("./js/data-cards.json");
  if (response.status === 200) {
    data = await response.json();
    renderSlider(data);
  } else {
    let response = await fetch("../js/data-cards.json");
    data = await response.json();
    console.log(data);
  }
})();

const windowSize = () => {
  console.log(window.screen.width);
  if (window.screen.width > 1200) {
    sliderSite.changeScreen(3);
  }

  if (window.screen.width < 1200 && window.screen.width >= 750) {
    sliderSite.changeScreen(2);
  }

  if (window.screen.width < 750) {
    sliderSite.changeScreen(1);
  }
};

window.addEventListener("resize", windowSize);
