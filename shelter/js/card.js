export default class Card {
  constructor(name, image, id, element) {
    this.element = element;
    this.name = name;
    this.image = image;
    this.id = id;
  }

  toHTML() {
    return `<li class="slider__item item" id="card-${this.id}" onclick="window.viewPopup(event)" name="card" data-item-card>
              <div class="item__slider-image">
                <img class="image-sourse" src=${this.image} alt="pets katrine" width="270" height="270" >
              </div>
              <h3 class="item__title title--lg" >${this.name}</h3>
              <div class="item__button">
                <button class="button button-item-pets" id="button-card-${this.id}" type="button">Learn more</button>
              </div>
            </li>`;
  }
}
