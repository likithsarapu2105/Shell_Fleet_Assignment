import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
beforeEach(() => {
global.fetch = jest.fn().mockResolvedValue({
json: jest.fn().mockResolvedValue([
{
id: 1,
name: "Beer 1",
brewers_tips: "Tips 1",
image_url: "https://example.com/beer1.jpg",
},
// Add more beer objects as needed
]),
});
});

afterEach(() => {
jest.clearAllMocks();
});

it("should render the app correctly", async () => {
render(<App />);


// Check if the home link is rendered
expect(screen.getByText("HOME")).toBeInTheDocument();

// Check if the beers link is rendered
expect(screen.getByText("BEERS")).toBeInTheDocument();

// Check if the contact link is rendered
expect(screen.getByText("CONTACT")).toBeInTheDocument();

// Check if the image text is rendered
expect(screen.getByText("GREAT IPA")).toBeInTheDocument();
expect(
  screen.getByText(
    "Some hops is plowed. An often hairy girl scout thoroughly makes a pact with the Honey Brown over the Budweiser. A blood clot makes a pact with the discusting satelliste brewery. A lover about the Pilsner Urquell takes a peek at the bottle of beer. The coors light, the crank case of an IPA, and a Citra Ninja are what made America great!"
  )
).toBeInTheDocument();

// Check if the small images section is rendered
expect(screen.getByTestId("small-images")).toBeInTheDocument();

// Check if the loading message is not rendered
expect(screen.queryByText("Loading.....")).toBeInTheDocument();

// Check if the small images are rendered
const smallImages = await screen.findAllByTestId("small-image");
expect(smallImages.length).toBe(1); // Update this to match the number of beers fetched
});

it("should toggle the like icon when clicked", async () => {
render(<App />);
// Wait for the small images to be rendered
await screen.findByTestId("small-image");

// Find the like icon
const likeIcon = screen.getByTestId("like-icon");

// Check if the like icon is not liked initially
expect(likeIcon).toHaveClass("love-icon");

// Click the like icon
userEvent.click(likeIcon);

// Check if the like icon is now liked
expect(likeIcon).toHaveClass("love-icon");

// Click the like icon again
userEvent.click(likeIcon);

// Check if the like icon is now not liked
expect(likeIcon).toHaveClass("love-icon");
});
});