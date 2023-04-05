import Listeners from "./listeners.js";

const SELECTORS_POPUP = {
  POPUP: "[data-popup]",
  BUTTON_CLOSE: "[data-popup-close]",
  BUTTON_OPEN: "[data-popup-open]",
};

export default class Popup {
  constructor(name, id, image, type, breed, description, age, inoculations, diseases, parasites) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;

    // this.toHTML();

    // this.element = node;
    // this.buttonClose = this.element.querySelector(SELECTORS_POPUP.BUTTON_CLOSE);

    // this._listeners = new Listeners();
    // this._listeners.add(this.buttonClose, "click", this.onButtonClick.bind(this));
  }

  // onButtonClick(event) {

  //   event.stopPropagation();
  //   this.element.removeAttribute("open");
  //   console.log("this", this.element.removeAttribute("open"), this.element);
  // }

  // open() {
  //   this.element.setAttribute("open", true);
  // }

  toHTML() {
    return `<dialog class="popup"  open data-popup>
              <div class="popup__wrapper">
                <div class="popup__button">
                  <button class="button button-popup" type="button" onclick="window.closePopup()" data-popup-close aria-label="close button"></button>
                </div>
                <div class="popup__card card">
                  <div class="card__image">
                    <img class="image-source" src=${this.image ? this.image : ""} alt="image popup" width="500" height="500">
                  </div>
                  <div class="card__content content-card">
                    <h3 class="content-card__title title--popup">${this.name ? this.name : ""}</h3>
                    <span class="content-card__sub-title">${this.type ? this.type : "animal"} - ${this.breed ? this.breed : ""}</span>
                    <div class="content-card__description">${this.description ? this.description : ""}</div>
                    <ul class="content-card__info info-pets">
                      <li class="info-pets__age"><span class="info-pets-title">Age: </span><span class="age-insert">${this.age ? this.age : ""}</span> months</li>
                      <li class="info-pets__inoculations"><span class="info-pets-title">Inoculations: </span><span class="inoculations-insert">${(this.inoculations.length > 0, this.inoculations.map((item) => ` ${item}`))}</span> </li>
                      <li class="info-pets__diseases"><span class="info-pets-title">Diseases: </span><span class="diseases-insert">${(this.diseases.length > 0, this.diseases.map((item) => ` ${item}`))}</span></li>
                      <li class="info-pets__parasites"><span class="info-pets-title">Parasites: </span><span class="parasites-insert">${(this.parasites.length > 0, this.parasites.map((item) => ` ${item}`))}</span></li>
                  </div>
                </div>

              </div>
            </dialog>`;
  }
}
