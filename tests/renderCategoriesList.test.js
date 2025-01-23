import { expect } from "@jest/globals";
import { renderCategoriesList } from "../src/main";

describe("renderCategoriesList", () => {
  let UI_ELEMENTS;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="categories"></div>
     `;

    UI_ELEMENTS = {
      categoriesList: document.querySelector(".categories"),
    };
  });

  test("Отображем список категорий", () => {
    const DATA = {
      categories: ["phone", "consoles"],
    };

    renderCategoriesList(DATA.categories, UI_ELEMENTS.categoriesList);
    const listItems = UI_ELEMENTS.categoriesList.querySelectorAll("div");
    const arr = [];

    listItems.forEach((element) => {
      arr.push(element.querySelector("label").textContent);
    });
  
    expect(listItems).toHaveLength(2);
    expect(arr[0]).toBe("Phone")
    expect(arr[1]).toBe("Consoles")
  });

  test("Если список категорий пуст", () => {
    const DATA = {
      categories: [],
    };

    renderCategoriesList(DATA.categories, UI_ELEMENTS.categoriesList);
    const listItems = UI_ELEMENTS.categoriesList.querySelectorAll("div");

    expect(listItems).toHaveLength(0);
  });
});
