import { getUserBrowser, ucFirst, replaceStateUrl } from "./helpers.js";

const UI_ELEMENTS = {
  checkBoxes: document.querySelectorAll("input"),
  resultList: document.querySelector(".resultList"),
  resultListTitle: document.querySelector(".resultList-title"),
  categories: document.querySelector(".categories"),
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

const currentUrl = new URL(window.location.href);
const searchParamsCurrentUrl = currentUrl.searchParams;
const firstUserBrowser = searchParamsCurrentUrl.get("UserBrowser");

const WORK_WITH_URL = {
  currentUrl,
  searchParamsCurrentUrl,
  firstUserBrowser,
};

// const WORK_WITH_URL = {
//   currentUrl: new URL(window.location.href),
//   searchParamsCurrentUrl: currentUrl.searchParams,
//   firstUserBrowser: searchParamsCurrentUrl.get("UserBrowser"),
// };

console.log(WORK_WITH_URL.currentUrl.par);

// const currentUrl = new URL(window.location.href);
// const searchParamsCurrentUrl = currentUrl.searchParams;
// const firstUserBrowser = searchParamsCurrentUrl.get("UserBrowser");

DATA.categories.forEach((category) => {
  UI_ELEMENTS.categories?.insertAdjacentHTML(
    "beforeend",
    `<div>
      <input type="checkbox" id="${category}" name="${ucFirst(category)}"  />
      <label for="${category}">${ucFirst(category)}</label>
    </div>`
  );
});

UI_ELEMENTS.checkBoxes = document.querySelectorAll("input");

window.addEventListener("load", () => {
  const isNeedSetUserBrowser =
    searchParamsCurrentUrl.size === 0 ||
    (searchParamsCurrentUrl.size === 1 &&
      searchParamsCurrentUrl.has("UserBrowser"));

  if (isNeedSetUserBrowser) {
    searchParamsCurrentUrl.set("UserBrowser", getUserBrowser());
    replaceStateUrl(currentUrl);
  }

  if (getUserBrowser() !== firstUserBrowser) {
    UI_ELEMENTS.resultListTitle.hidden = false;

    renderResultList(UI_ELEMENTS, searchParamsCurrentUrl);
  }

  UI_ELEMENTS.checkBoxes.forEach((checkBox) => {
    if (searchParamsCurrentUrl.has(checkBox.id)) {
      checkBox.checked = true;
    }
  });
});

const clickOnCheckBox = (checkBox) => {
  if (!checkBox.checked) {
    searchParamsCurrentUrl.delete(checkBox.id);
    replaceStateUrl(currentUrl);

    if (getUserBrowser() !== firstUserBrowser) {
      const isNeedSetUserBrowser =
        searchParamsCurrentUrl.size === 1 &&
        searchParamsCurrentUrl.has("UserBrowser");

      if (isNeedSetUserBrowser) {
        UI_ELEMENTS.resultListTitle.hidden = true;
        searchParamsCurrentUrl.set("UserBrowser", getUserBrowser());
        replaceStateUrl(currentUrl);
      }

      renderResultList(UI_ELEMENTS, searchParamsCurrentUrl);
    }
  } else {
    if (getUserBrowser() !== firstUserBrowser) {
      searchParamsCurrentUrl.set(checkBox.id, checkBox.name);
      replaceStateUrl(currentUrl);
      renderResultList(UI_ELEMENTS, searchParamsCurrentUrl);
    }
  }
};

UI_ELEMENTS.checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    clickOnCheckBox(checkBox);
  });
});

export const renderResultList = (UI_ELEMENTS, searchParamsCurrentUrl) => {
  UI_ELEMENTS.resultList.innerHTML = "";

  searchParamsCurrentUrl.forEach((searchParam, key) => {
    if (key !== "UserBrowser") {
      UI_ELEMENTS.resultList.insertAdjacentHTML(
        "beforeend",
        `<li>${searchParam}</li>`
      );
    }
  });
};
