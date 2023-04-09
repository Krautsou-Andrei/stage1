import Card from "./card.js";
import Listeners from "./listeners.js";

const SELECTORS = {
  PAGINATION_PAGE: "[data-pagination-page]",
  PAGINATION_BUTTONS: "[data-pagination-buttons]",
  PAGINATION_BUTTON_PREV_PREV: "[data-pagination-button-prev-prev]",
  PAGINATION_BUTTON_PREV: "[data-pagination-button-prev]",
  PAGINATION_VIEW: "[data-pagination-view]",
  PAGINATION_BUTTON_NEXT: "[data-pagination-button-next]",
  PAGINATION_BUTTON_NEXT_NEXT: "[data-pagination-button-next-next]",
};

export default class Pagination {
  constructor(arrayPagination) {
    this.arrayPagination = arrayPagination;
    this.page = document.querySelector(SELECTORS.PAGINATION_PAGE);
    this.buttons = document.querySelector(SELECTORS.PAGINATION_BUTTONS);
    this.buttonPrevPrev = this.buttons.querySelector(SELECTORS.PAGINATION_BUTTON_PREV_PREV);
    this.buttonPrev = this.buttons.querySelector(SELECTORS.PAGINATION_BUTTON_PREV);
    this.pageNumber = this.buttons.querySelector(SELECTORS.PAGINATION_VIEW);
    this.buttonNext = this.buttons.querySelector(SELECTORS.PAGINATION_BUTTON_NEXT);
    this.buttonNextNext = this.buttons.querySelector(SELECTORS.PAGINATION_BUTTON_NEXT_NEXT);

    this._listeners = new Listeners();
    this._listeners.add(this.buttonNext, "click", this.onButtonClickNext.bind(this));
    this._listeners.add(this.buttonPrev, "click", this.onButtonClickPrev.bind(this));
    this._listeners.add(this.buttonNextNext, "click", this.onButtonClickNextNext.bind(this));
    this._listeners.add(this.buttonPrevPrev, "click", this.onButtonClickPrevPrev.bind(this));

    this.viewNumberCards = 8;
    this.maxViewCards = 8;
    this.countCards = 0;
    this.countPages = 1;
    this.countArrayNumber = 0;
    this.arrayPage = [];
    this.arrayRandomNumber = [];

    this.shuffleArray();
    this.viewPage(this.viewNumberCards);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * this.maxViewCards);
  }

  getArrayRandom() {
    this.arrayRandomNumber = [];
    this.countArrayNumber = 0;

    while (this.countArrayNumber < this.maxViewCards) {
      let randomNumber = this.getRandomNumber();
      if (this.countArrayNumber < this.maxViewCards / 2) {
        if (!this.arrayRandomNumber.includes(randomNumber) && randomNumber < this.maxViewCards / 2) {
          this.arrayRandomNumber.push(randomNumber);
          this.countArrayNumber++;
        }
      } else {
        if (!this.arrayRandomNumber.includes(randomNumber)) {
          this.arrayRandomNumber.push(randomNumber);
          this.countArrayNumber++;
        }
      }
    }
  }

  shuffleArray() {
    let array = [];

    while (array.length < this.arrayPagination.length) {
      this.getArrayRandom();
      this.arrayRandomNumber.forEach((element) => {
        array.push(this.arrayPagination[element]);
      });
    }

    this.arrayPagination = [];

    array.forEach((element) => {
      this.arrayPagination.push(new Card(element.name, element.image, element.id, element));
    });
  }

  viewPage(number) {
    this.arrayPage = [];

    for (let i = number * (this.countPages - 1); i < number * this.countPages; i++) {
      this.arrayPage.push(this.arrayPagination[i]);
    }

    this.renderCards();
    this.viewPageNumner();
  }

  onButtonClickPrev() {
    this.countPages--;
    this.disabledButtonPrev();
  }

  onButtonClickPrevPrev() {
    this.countPages = 1;
    this.disabledButtonPrev();
  }

  onButtonClickNext() {
    this.countPages++;
    this.disabledButtonNext();
  }

  onButtonClickNextNext() {
    this.countPages = this.arrayPagination.length / this.viewNumberCards;
    this.disabledButtonNext();
  }

  viewPageNumner() {
    this.pageNumber.innerHTML = `${this.countPages}`;
  }

  disabledButtonNext() {
    this.viewPage(this.viewNumberCards);
    if (this.countPages === this.arrayPagination.length / this.viewNumberCards) {
      this.buttonNext.setAttribute("disabled", "ture");
      this.buttonNextNext.setAttribute("disabled", "ture");
    }
    this.buttonPrev.removeAttribute("disabled", "");
    this.buttonPrevPrev.removeAttribute("disabled", "");
  }

  disabledButtonPrev() {
    this.viewPage(this.viewNumberCards);
    if (this.countPages === 1) {
      this.buttonPrev.setAttribute("disabled", "ture");
      this.buttonPrevPrev.setAttribute("disabled", "ture");
    }
    this.buttonNext.removeAttribute("disabled", "");
    this.buttonNextNext.removeAttribute("disabled", "");
  }

  renderCards() {
    while (this.page.firstChild) {
      this.page.removeChild(this.page.firstChild);
    }
    this.arrayPage.forEach((card) => this.page.insertAdjacentHTML("beforeend", card.toHTML()));
  }

  changeScreen(number) {
    if (this.page.childNodes.length > number) {
      const quantityDelete = this.page.childNodes.length - number;
      this.viewNumberCards = this.viewNumberCards - quantityDelete;
      this.countPages = this.arrayPagination.length / this.viewNumberCards;
      this.viewPage(this.viewNumberCards);
    }

    if (this.page.childNodes.length < number) {
      const quantitySum = number - this.page.childNodes.length;
      this.viewNumberCards = this.viewNumberCards + quantitySum;
      this.countPages = this.arrayPagination.length / this.viewNumberCards;
      this.viewPage(this.viewNumberCards);
    }
  }
}
