import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AllArtwork from "../src/components/AllArtwork";
import { normaliseAIC, normaliseVA } from "../src/utils/NormaliseApiData";

// Mock fetch globally
global.fetch = vi.fn();

// Mock the normalise functions from utils
vi.mock("../src/utils/NormaliseApiData", () => ({
  normaliseVA: vi.fn((item) => ({
    id: "va1",
    title: "Mock VA Artwork Title",
    artist: "VA Artist",
    source: "va",
    medium: "Painting",
    img: "va-image.jpg",
  })),
  normaliseAIC: vi.fn((item) => ({
    id: "aic1",
    title: "Mock AIC Artwork Title",
    artist: "AIC Artist",
    source: "aic",
    medium: "Sculpture",
    img: "aic-image.jpg",
  })),
}));


// __ TESTS __

describe("AllArtwork", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders artwork title from both APIs", async () => {
    fetch.mockImplementation((url) => {
      if (url.includes("vam.ac.uk")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              records: [{}],
            }),
        });
      }
      if (url.includes("artic.edu")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: [{}],
            }),
        });
      }
      return Promise.reject("Unknown URL");
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);

    expect(await screen.findByText(/Mock VA Artwork Title/i)).toBeTruthy();
    expect(await screen.findByText(/Mock AIC Artwork Title/i)).toBeTruthy();
  });

  test("renders artwork artist from both APIs", async () => {
    fetch.mockImplementation((url) => {
      if (url.includes("vam.ac.uk")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              records: [{}],
            }),
        });
      }
      if (url.includes("artic.edu")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: [{}],
            }),
        });
      }
      return Promise.reject("Unknown URL");
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);

    expect(await screen.findByText(/VA Artist/i)).toBeTruthy();
    expect(await screen.findByText(/AIC Artist/i)).toBeTruthy();
  });

  test(`API calls pass through the normaliser function`, async () => {
    const vaRaw = { some: "va data" };
    const aicRaw = { some: "aic data" };

    fetch.mockImplementation((url) => {
      if (url.includes("vam.ac.uk")) {
        return Promise.resolve({
          json: () => Promise.resolve({ records: [vaRaw] }),
        });
      }
      if (url.includes("artic.edu")) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: [aicRaw] }),
        });
      }
      return Promise.reject("Unknown URL");
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);

    await screen.findByText(/Mock VA Artwork Title/i);

    expect(normaliseVA).toHaveBeenCalledWith(vaRaw);
    expect(normaliseAIC).toHaveBeenCalledWith(aicRaw);
    console.log("test log:", normaliseAIC.mock.calls); // array of all calls with args

  });

  test("displays loading spinner while awaiting API results", async () => {
    // Create a delayed fetch
    let resolveVA, resolveAIC;
    fetch.mockImplementation((url) => {
      if (url.includes("vam.ac.uk")) {
        return new Promise((resolve) => {
          resolveVA = () =>
            resolve({
              json: () => Promise.resolve({ records: [{}] }),
            });
        });
      }
      if (url.includes("artic.edu")) {
        return new Promise((resolve) => {
          resolveAIC = () =>
            resolve({
              json: () => Promise.resolve({ data: [{}] }),
            });
        });
      }
      return Promise.reject("Unknown URL");
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);

    // expected results
    expect(screen.getByRole("progressbar")).toBeTruthy();
    resolveVA();
    resolveAIC();
  });

  test(`displays error message on API failure`, async () => {
    fetch.mockImplementation(() => {
      return Promise.reject(new Error("Network Error!"));
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);

    // expected results
    expect(await screen.findAllByText(/404 Not Found/i)).toBeTruthy;
    expect(screen.queryByRole("progressbar")).toBeNull();
  });
});
