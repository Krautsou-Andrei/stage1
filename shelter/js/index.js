import MenuBurger from "./burger-menu.js";
import Popup from "./popup.js";
import Slider from "./sider.js";

const SELECTORS = {
  MENU: "[data-menu-burger]",
  CARD: "[data-item-card]",
  POPUP: "[data-popup]",

  SLIDER: "[data-slider]",
  INSERT_POPUP: "[data-insert-popup]",
};

const menuBurger = document.querySelector(SELECTORS.MENU);
const slider = document.querySelector(SELECTORS.SLIDER);
const insertPopup = document.querySelector(SELECTORS.INSERT_POPUP);

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
};

window.viewPopup = function (event) {
  const id = parseInt(event.currentTarget.id.match(/\d+/));

  dataCards.forEach((card) => {
    if (+card.id === id) {
      const popup = new Popup(card.name, card.id, card.image, card.type, card.breed, card.description, card.age, card.inoculations, card.diseases, card.parasites);
      insertPopup.insertAdjacentHTML("beforeend", popup.toHTML());
    }
  });
};

window.closePopup = function () {
  const popup = document.querySelector(SELECTORS.POPUP);
  insertPopup.removeChild(popup);
};

(async () => {
  let bd = await (await fetch("./js/data-cards.json")).json();
  renderSlider(bd);
})();

const windowSize = () => {
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
