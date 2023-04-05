// import Listeners from "./listeners.js";

// const SELECTORS_CARD = {
//   BUTTON_OPEN: "[data-button-popup-open]",
//   POPUP: "[data-popup]",
// };

export default class Card {
  constructor(name, image, id, element) {
    this.element = element;

    this.name = name;
    this.image = image;
    this.id = id;
  }

  // onButtonClick() {
  //   console.log("this.element", this.element);
  // }

  toHTML() {
    return `<div class="slider__item item" id="card-${this.id}" onclick="window.viewPopup(event)" name="card" data-item-card>
              <div class="item__slider-image">
                <img class="image-sourse" src=${this.image} alt="pets katrine" width="270" height="270" data-item-card-image>
              </div>
              <h3 class="item__title title--lg" data-item-card-title>${this.name}</h3>
              <div class="item__button">
                <button class="button button-item-pets" id="button-card-${this.id}" type="button"  data-button-popup-open>Learn more</button>
              </div>
            </div>`;
  }
}
