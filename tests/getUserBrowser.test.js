import { getUserBrowser, replaceStateUrl } from '../helpers.js';
import { jest } from '@jest/globals';

jest.mock("../helpers.js", () => ({
  getUserBrowser: jest.fn(),
  replaceStateUrl: jest.fn(),
}));

describe("getUserBrowser", () => {
  const originalUserAgent = navigator.userAgent;
  const originalVendor = navigator.vendor;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
    });
    Object.defineProperty(navigator, "vendor", {
      value: originalVendor,
      configurable: true,
    });
  });

  const mockNavigator = (userAgent, vendor) => {
    Object.defineProperty(navigator, "userAgent", {
      value: userAgent,
      configurable: true,
    });
    Object.defineProperty(navigator, "vendor", {
      value: vendor,
      configurable: true,
    });
  };

  test('Проверка на браузер "Chrome"', () => {
    mockNavigator(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
      "Google Inc"
    );
    expect(getUserBrowser()).toBe("Chrome");
  });

  test('Проверка на браузер "Edg"', () => {
    mockNavigator(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Edg/91.0.864.59",
      "Google Inc"
    );
    expect(getUserBrowser()).toBe("Edg");
  });

  test('Проверка на браузер "Yandex Browser"', () => {
    mockNavigator(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 YaBrowser/21.3.2.274",
      "Yandex"
    );
    expect(getUserBrowser()).toBe("YaBrowser");
  });

  test('Проверка на браузер  "Opera"', () => {
    mockNavigator(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 OPR/77.0.4054.254",
      "Google Inc"
    );
    expect(getUserBrowser()).toBe("OPR");
  });

  test('Проверка на браузер "Safari"', () => {
    mockNavigator(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
      "Apple Computer, Inc."
    );
    expect(getUserBrowser()).toBe("Safari");
  });

  test('Проверка на браузер "Mozilla Firefox"', () => {
    mockNavigator(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
      ""
    );
    expect(getUserBrowser()).toBe("Firefox");
  });

  test('Проверка на браузер "Internet Explorer"', () => {
    mockNavigator(
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
      ""
    );
    expect(getUserBrowser()).toBe("MSIE");
  });

  test("Проверка на незивестный браузер", () => {
    mockNavigator(
      "Mozilla/5.0 (compatible; UnknownBrowser/1.0)",
      "UnknownVendor"
    );
    expect(getUserBrowser()).toBe("UnknownBrowser");
  });
});
