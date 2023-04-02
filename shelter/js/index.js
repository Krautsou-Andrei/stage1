import MenuBurger from "./burger-menu.js";

const SELECTORS = {
  MENU: "[data-menu-burger]",
};

const menuBurger = document.querySelector(SELECTORS.MENU);

new MenuBurger(menuBurger);
