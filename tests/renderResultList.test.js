import { renderResultList } from "../src/main";

describe("renderResultList", () => {
  let UI_ELEMENTS;
  let searchParamsCurrentUrl;
  let currentUrl;

  beforeEach(() => {
    document.body.innerHTML = `
       <div class="wrapper">
         <ol class="resultList"></ol>
       </div>
     `;

    UI_ELEMENTS = {
      resultList: document.querySelector(".resultList"),
    };

    currentUrl = new URL(window.location.href);
    searchParamsCurrentUrl = currentUrl.searchParams;
  });

  test("Отображем список на основе параметров URL", () => {
    searchParamsCurrentUrl.set("phone", "Phone");
    searchParamsCurrentUrl.set("laptop", "Laptop");

   renderResultList(UI_ELEMENTS.resultList, searchParamsCurrentUrl);
    const listItems = UI_ELEMENTS.resultList.querySelectorAll("li");

    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe("Phone");
    expect(listItems[1].textContent).toBe("Laptop");
  });

  test("Если нет параметров, список остаётся пустым", () => {
    renderResultList(UI_ELEMENTS, searchParamsCurrentUrl);
    const listItems = UI_ELEMENTS.resultList.querySelectorAll("li");
    expect(listItems).toHaveLength(0);
  });
});
