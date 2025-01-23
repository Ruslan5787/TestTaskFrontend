import { expect, jest, test } from "@jest/globals";
import { replaceStateUrl } from "../src/helpers.js";

describe("Добавление параметра UserBrowser в url, если его нет", () => {
  let searchParams;
  let originalLocation;

  beforeEach(() => {
    originalLocation = window.location;

    delete window.location;
    window.location = new URL("http://example.com");
    searchParams = window.location.searchParams;
  });

  document.body.innerHTML = `
      <div class="wrapper">
        <h3 class="resultList-title" hidden>Сategories selected in order:</h3>
        <ol class="resultList"></ol>
      </div>
    `;

  afterEach(() => {
    window.location = originalLocation;
    jest.clearAllMocks();
  });

  test("Добавление параметра UserBrowser в URL, если его нет", () => {
    const mockReplaceState = jest
      .spyOn(window.history, "replaceState")
      .mockImplementation(() => {});

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("UserBrowser", "Chrome");
    const newUrl = `${window.location.pathname}?${searchParams}`;

    replaceStateUrl(newUrl);

    expect(mockReplaceState).toHaveBeenCalledWith({}, "", newUrl);

    mockReplaceState.mockRestore();
  });
});
