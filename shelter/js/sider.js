import Listeners from "./listeners.js";
import Card from "./card.js";

const SELECTORS_SLIDER = {
  SLIDER_CARDS: "[data-slider-cadrs]",
  BUTTON_PREV: "[data-slider-prev]",
  BUTTON_NEXT: "[data-slider-next]",
};

const ANIMATION_CONFIG = {
  duration: 500,
  easing: "linear",
  fill: "forwards",
};

export default class Slider {
  constructor(slider, arrayCards, breakpoint, number) {
    this.slider = slider;
    this.breakpoint = breakpoint;
    this.buttonPrev = this.slider.querySelector(SELECTORS_SLIDER.BUTTON_PREV);
    this.buttonNext = this.slider.querySelector(SELECTORS_SLIDER.BUTTON_NEXT);
    this.arrayCards = arrayCards;
    this.sliderCards = this.slider.querySelector(SELECTORS_SLIDER.SLIDER_CARDS);
    this.viewArray = [];
    this.arrayCurrent = [];
    this.arrayPrev = [];
    this.arrayRandomNumber = [];
    this.count = 0;
    this.isClickNext = false;
    this.isClickPrev = false;
    this.number = number || 3;

    this._listeners = new Listeners();
    this._listeners.add(this.buttonPrev, "click", this.onButtonClickPrev.bind(this));
    this._listeners.add(this.buttonNext, "click", this.onButtonClickNext.bind(this));

    this.viewCards();
  }

  setNumberCards() {
    if (this.breakpoint?.length > 0) {
      let count = 0;

      this.breakpoint.some((point, index) => {
        if (window.screen.width < point.width) {
          count++;

          this.getCadrs(point.cards);
          return true;
        }
      });

      if (count === 0) {
        this.getCadrs();
      }
    }
  }

  onButtonClickPrev() {
    this.isClickPrev = true;
    this.viewCards();
    this.isClickNext = false;

    this.animation();
  }

  onButtonClickNext() {
    this.viewCards();
    this.isClickNext = true;
    this.isClickPrev = false;

    this.animation(true);
  }

  getCadrs(number) {
    this.viewArray = [];
    this.setNumberCardsForRender(number ? number : this.number);
  }

  setNumberCardsForRender(number) {
    this.arrayRandomNumber = [];
    this.count = 0;

    while (this.count < number) {
      this.getCard();
    }
    this.setArrayForRender();
  }

  getRandomNumber() {
    return Math.floor(Math.random() * this.arrayCards.length);
  }

  setArrayForRender() {
    if (!this.isClickPrev) {
      this.arrayPrev = [...this.arrayCurrent];
    }

    this.arrayCurrent = [...this.arrayRandomNumber];
    if (this.isClickPrev && this.isClickNext && this.arrayPrev.length > 0) {
      this.arrayPrev.forEach((element) => this.viewArray.push(this.arrayCards[element]));
      this.arrayCurrent = [...this.arrayPrev];
    } else {
      this.arrayRandomNumber.forEach((element) => this.viewArray.push(this.arrayCards[element]));
    }
  }

  getCard() {
    let randomNumber = this.getRandomNumber();

    if (!this.arrayRandomNumber.includes(randomNumber) && !this.arrayCurrent.includes(randomNumber)) {
      this.arrayRandomNumber.push(randomNumber);
      this.count++;
    }
  }

  renderHTML() {
    while (this.sliderCards.firstChild) {
      this.sliderCards.removeChild(this.sliderCards.firstChild);
    }

    this.viewArray.forEach((element) => {
      const card = new Card(element.name, element.image, element.id, element);
      this.sliderCards.insertAdjacentHTML("beforeend", card.toHTML());
    });
  }

  viewCards() {
    this.setNumberCards();
    this.renderHTML();
  }

  changeScreen(number) {
    if (this.sliderCards.childNodes.length > number) {
      const quantityDelete = this.sliderCards.childNodes.length - number;

      for (let i = 0; i < quantityDelete; i++) {
        this.sliderCards.removeChild(this.sliderCards.firstChild);
        this.arrayPrev.pop();
        this.arrayCurrent.pop();
      }
    }

    if (this.sliderCards.childNodes.length < number) {
      this.viewCards();
      this.arrayPrev = [...this.arrayCurrent];
    }

    this.number = number;
  }

  animation(reverse) {
    const config = ANIMATION_CONFIG;
    const minus = reverse ? "-" : "";

    this.sliderCards.animate(
      {
        transform: [`translateX(${minus}${this.sliderCards.scrollWidth}px)`, "translateX(0)"],
      },
      config
    );
  }
}
