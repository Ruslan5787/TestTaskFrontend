import { ucFirst, replaceStateUrl } from "./helpers.js";

const UI_ELEMENTS = {
  checkBoxes: document.querySelectorAll(".checkBox"),
  resultList: document.querySelector(".resultList"),
  resultListTitle: document.querySelector(".resultList-title"),
  categoriesList: document.querySelector(".categories"),
};

const currentUrl = new URL(window.location.href);

const searchParamsCurrentUrl = currentUrl.searchParams;

const WORK_WITH_URL = {
  current: currentUrl,
  searchParamsCurrent: searchParamsCurrentUrl,
};

const DATA = {
  categories: [
    "phone",
    "consoles",
    "furniture",
    "laptop",
    "headphones",
    "keyboard",
    "mouse",
    "luminaire",
    "carpet",
    "screen",
    "pc",
    "watches",
    "tablets",
    "cameras",
    "camera",
    "speaker",
    "charger",
    "remote",
    "control",
    "disks",
    "printers",
  ],
};

window.addEventListener("load", () => {
  renderCategoriesList(DATA.categories, UI_ELEMENTS.categoriesList);

  UI_ELEMENTS.checkBoxes = document.querySelectorAll(".checkBox");

  UI_ELEMENTS.checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
      clickOnCheckBox(checkBox);
    });
  });

  if (WORK_WITH_URL.searchParamsCurrent.size > 0) {
    UI_ELEMENTS.resultListTitle.hidden = false;
    renderResultList(UI_ELEMENTS.resultList, WORK_WITH_URL.searchParamsCurrent);

    UI_ELEMENTS.checkBoxes.forEach((checkBox) => {
      if (WORK_WITH_URL.searchParamsCurrent.has(checkBox.id)) {
        checkBox.checked = true;
      }
    });
  }
});

const clickOnCheckBox = (checkBox) => {
  if (!checkBox.checked) {
    WORK_WITH_URL.searchParamsCurrent.delete(checkBox.id);

    replaceStateUrl(WORK_WITH_URL.current);
    renderResultList(UI_ELEMENTS.resultList, WORK_WITH_URL.searchParamsCurrent);

    if (WORK_WITH_URL.searchParamsCurrent.size < 1) {
      UI_ELEMENTS.resultListTitle.hidden = true;
    }
  } else {
    UI_ELEMENTS.resultListTitle.hidden = false;
    WORK_WITH_URL.searchParamsCurrent.set(checkBox.id, checkBox.name);

    replaceStateUrl(WORK_WITH_URL.current);
    renderResultList(UI_ELEMENTS.resultList, WORK_WITH_URL.searchParamsCurrent);
  }
};

export const renderResultList = (resultListElement, searchParamsCurrent) => {
  resultListElement.innerHTML = "";

  searchParamsCurrent.forEach((searchParam) => {
    resultListElement.insertAdjacentHTML(
      "beforeend",
      `<li>${searchParam}</li>`
    );
  });
};

export const renderCategoriesList = (categories, categoriesListElement) => {
  categories.forEach((category) => {
    categoriesListElement?.insertAdjacentHTML(
      "beforeend",
      `<div>
        <input class="checkBox" type="checkbox" id="${category}" name="${ucFirst(
        category
      )}"  />
        <label for="${category}">${ucFirst(category)}</label>
      </div>`
    );
  });
};
