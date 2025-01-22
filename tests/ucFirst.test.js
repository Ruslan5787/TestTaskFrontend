import { ucFirst, getUserBrowser } from "../helpers";

describe("ucFirst", () => {
  it("Первая буква строки в заглавном регистре", () => {
    expect(ucFirst("hello")).toBe("Hello");
  });

  it('Первая буква строки уже заглавная', () => {
    expect(ucFirst('Hello')).toBe('Hello');
  });

  it('Пустая строка', () => {
    expect(ucFirst('')).toBe('');
  });

  it('Обработка не буквенных символов', () => {
    expect(ucFirst('123hello')).toBe('123hello');
    expect(ucFirst('!hello')).toBe('!hello');
  });
});
