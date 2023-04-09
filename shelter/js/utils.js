import Popup from "./popup.js";

const SELECTORS = {
  POPUP: "[data-popup]",
  INSERT_POPUP: "[data-insert-popup]",
  POPUP_CARD: "[data-popup-card]",
};

const insertPopup = document.querySelector(SELECTORS.INSERT_POPUP);

export const utilPopup = (dataCards) => {
  window.viewPopup = function (event) {
    const id = parseInt(event.currentTarget.id.match(/\d+/));
    let popupWrapper = {};
    let body = {};

    const onClickOther = (event) => {
      const popupCard = document.querySelector(SELECTORS.POPUP_CARD);

      if (!popupCard.contains(event.target)) {
        Array.from(body).forEach((element) => {
          element.style.overflowY = "visible";
        });
        insertPopup.removeChild(popupWrapper);
      }
    };

    dataCards.forEach((card) => {
      if (+card.id === id) {
        const popup = new Popup(card.name, card.id, card.image, card.type, card.breed, card.description, card.age, card.inoculations, card.diseases, card.parasites);
        insertPopup.insertAdjacentHTML("beforeend", popup.toHTML());

        body = document.getElementsByTagName("body");
        popupWrapper = document.querySelector(SELECTORS.POPUP);

        Array.from(body).forEach((element) => {
          element.style.overflowY = "hidden";
        });

        popupWrapper.addEventListener("click", onClickOther);
      }
    });
  };
};
