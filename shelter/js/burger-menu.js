import Listeners from "./listeners.js";

const SELECTORS_MENU_BURGER = {
  BUTTON: "[data-menu-burger-button]",
  MENU: "[data-menu-burger]",
  MENU_BURGER_CONTENT: "[data-menu-burger-content]",
  MENU_LIST: "[data-menu-list]",
  FOCUSABLE_ELEMENTS: "[data-menu-burger-link]",
};

export default class MenuBurger {
  constructor(domNode) {
    this.element = domNode;
    this.button = this.element.querySelector(SELECTORS_MENU_BURGER.BUTTON);
    this.focusableEls = this.element.querySelectorAll(SELECTORS_MENU_BURGER.FOCUSABLE_ELEMENTS);
    this.menuBurgerContent = this.element.querySelector(SELECTORS_MENU_BURGER.MENU_BURGER_CONTENT);
    this.menuList = this.element.querySelector(SELECTORS_MENU_BURGER.MENU_LIST);
    this.open = this.button.getAttribute("aria-expanded") === "true";

    this._listeners = new Listeners();
    this._listeners.add(this.button, "click", this.onButtonClick.bind(this));
    this._listeners.add(this.menuBurgerContent, "click", this.onClickOther.bind(this));

    this.firstFocusableEl = this.button;
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
    this.focusableEls.forEach((link) => this._listeners.add(link, "click", this.onCloseMenu.bind(this)));

    this.KEYCODE_TAB = 9;
    this.KEYCODE_ESCAPE = 27;
    this.trapFocus();
  }

  onButtonClick() {
    this.menuBurgerContent.classList.toggle("active");
    this.button.firstElementChild.classList.toggle("active");

    let menuClassName = this.menuBurgerContent.className;

    if (menuClassName.match(/active/)) {
      this.menuBurgerContent.removeAttribute("inert", "");
    } else {
      this.menuBurgerContent.setAttribute("inert", "");
    }

    this.toggle(!this.open);
  }

  onCloseMenu() {
    this.menuBurgerContent.classList.remove("active");
    this.button.firstElementChild.classList.remove("active");

    this.menuBurgerContent.setAttribute("inert", "");

    this.toggle(!this.open);
  }

  trapFocus() {
    this._listeners.add(this.element, "keydown", this.pressKey.bind(this));
  }

  toggle(open) {
    if (open === this.open) {
      return;
    }

    const body = document.getElementsByTagName("body");

    if (open) {
      Array.from(body).forEach((element) => {
        element.style.overflowY = "hidden";
      });
    } else {
      Array.from(body).forEach((element) => {
        element.style.overflowY = "visible";
      });
    }

    this.open = open;

    this.button.setAttribute("aria-expanded", `${open}`);
  }

  onClickOther(event) {
    if (!this.button.contains(event.target) && !this.menuList.contains(event.target)) {
      this.onCloseMenu();
    }
  }

  pressKey(event) {
    const isTabPressed = event.key === "Tab" || event.keyCode === this.KEYCODE_TAB;
    const isEscapePressed = event.key === "Escape" || event.keyCode === this.KEYCODE_ESCAPE;

    if (isEscapePressed) {
      this.onCloseMenu();
      this.button.focus();
    }

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusableEl && this.open) {
        this.lastFocusableEl.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableEl) {
        this.firstFocusableEl.focus();
        event.preventDefault();
      }
    }
  }

  destroy() {
    this._listeners.removeAll();
  }
}
