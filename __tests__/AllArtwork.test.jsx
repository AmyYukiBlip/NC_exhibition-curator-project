import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AllArtwork from "../src/components/AllArtwork";
import { normaliseAIC, normaliseVA } from "../src/utils/NormaliseApiData";
import ExhibitionPage from "../src/components/ExhibitionPage";
import { MemoryRouter } from "react-router-dom";

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

// mock artwork data
const mockArtwork = {
  id: "1",
  title: "Mock Artwork",
  artist: "Mock Artist",
  source: "va",
  medium: "Painting",
  img: "mock-image.jpg",
};

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
    // Creates a delayed fetch
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

  test(`displays search failure message to user when input has no match`, async () => {
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

    render(<AllArtwork searchTerm="Van Goth" location="" medium="" />);

    expect(await screen.findByText(/No artwork matching search/i)).toBeTruthy();
  });

  test(`displays error message on API failure`, async () => {
    fetch.mockImplementation(() => {
      return Promise.reject(new Error("Network Error!"));
    });

    render(<AllArtwork searchTerm="" location="" medium="" />);
    expect(await screen.findByText(/404 Not Found/i)).toBeTruthy();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });
});

describe("ExhibitionPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("temp artwork appears in /exhibition on submit", async () => {
    const tempCollection = [mockArtwork];
    const setFormSubmitted = vi.fn();
    const setUserTitleInput = vi.fn();
    const setUserDescInput = vi.fn();

    render(
      <MemoryRouter>
        <ExhibitionPage
          tempCollection={tempCollection}
          setTempCollection={() => {}}
          setUserTitleInput={setUserTitleInput}
          setUserDescInput={setUserDescInput}
          userTitleInput={"Test Exhibition"}
          userDescInput={"A great collection"}
          formSubmitted={false}
          setFormSubmitted={setFormSubmitted}
        />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/exhibition created/i)).toBeTruthy();
  });

  test("snackbar alerts user when trying to submit an empty collection to exhibition", async () => {
    const tempCollection = [];
    const setFormSubmitted = vi.fn();
    const setUserTitleInput = vi.fn();
    const setUserDescInput = vi.fn();

    render(
      <MemoryRouter>
        <ExhibitionPage
          tempCollection={tempCollection}
          setTempCollection={() => {}}
          setUserTitleInput={setUserTitleInput}
          setUserDescInput={setUserDescInput}
          userTitleInput=""
          userDescInput=""
          formSubmitted={false}
          setFormSubmitted={setFormSubmitted}
        />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/your exhibition is empty/i)).toBeTruthy();
  });

  test("calls setUserTitleInput and setUserDescInput on input change", () => {
    const setUserTitleInput = vi.fn();
    const setUserDescInput = vi.fn();

    render(
      <MemoryRouter>
        <ExhibitionPage
          tempCollection={[{ id: "1" }]} // avoid empty check
          setTempCollection={() => {}}
          setUserTitleInput={setUserTitleInput}
          setUserDescInput={setUserDescInput}
          userTitleInput=""
          userDescInput=""
          formSubmitted={false}
          setFormSubmitted={() => {}}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Enter Your Exhibition Title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText(/Enter a description/i), {
      target: { value: "New Description" },
    });

    expect(setUserTitleInput).toHaveBeenCalledWith("New Title");
    expect(setUserDescInput).toHaveBeenCalledWith("New Description");
  });
});
