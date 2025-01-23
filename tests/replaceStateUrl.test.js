import { it, jest } from "@jest/globals";
import { replaceStateUrl } from "../src/helpers.js";

describe("replaceStateUrl", () => {
  it("Добавление search параметров URL сайта через функцию replaceStateUrl", () => {
    const replaceStateMock = jest
      .spyOn(window.history, "replaceState")
      .mockImplementation(() => {});

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    searchParams.set("phone", "Phone");

    replaceStateUrl(url);

    expect(replaceStateMock).toHaveBeenCalledWith(
      {},
      "",
      "http://localhost/?phone=Phone"
    );

    replaceStateMock.mockRestore();
  });

  it("Удаление search параметров URL сайта через функцию replaceStateUrl", () => {
   const replaceStateMock = jest
     .spyOn(window.history, "replaceState")
     .mockImplementation(() => {});

   const url = new URL("http://localhost/?phone=Phone");
   const searchParams = url.searchParams;

   searchParams.delete("phone", "Phone");

   replaceStateUrl(url);

   expect(replaceStateMock).toHaveBeenCalledWith(
     {},
     "",
     "http://localhost/"
   );

   replaceStateMock.mockRestore();
 });
});
