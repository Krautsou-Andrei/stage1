import Popup from "./popup.js";

const SELECTORS = {
  POPUP: "[data-popup]",
  INSERT_POPUP: "[data-insert-popup]",
};

const insertPopup = document.querySelector(SELECTORS.INSERT_POPUP);

export const utilPopup = (dataCards) => {
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
};
