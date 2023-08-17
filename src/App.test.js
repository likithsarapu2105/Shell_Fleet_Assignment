import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders home, beers, and contact links", () => {
  render(<App />);
  const homeLink = screen.getByText("HOME");
  const beersLink = screen.getByText("BEERS");
  const contactLink = screen.getByText("CONTACT");
  expect(homeLink).toBeInTheDocument();
  expect(beersLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});

test("renders loading text when smallImagesData is empty", () => {
  render(<App />);
  const loadingText = screen.getByText("Loading.....");
  expect(loadingText).toBeInTheDocument();
});

test("renders beer name and description when smallImagesData is available", async () => {
  const mockData = [
    {
      name: "Test Beer",
      description: "This is a test beer description.",
      image_url: "test_image_url.jpg",
    },
  ];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  render(<App />);
  const beerName = await screen.findByText("Test Beer");
  const beerDescription = await screen.findByText("This is a test beer description.");
  expect(beerName).toBeInTheDocument();
  expect(beerDescription).toBeInTheDocument();
});

test("toggles heart icon when like button is clicked", async () => {
  const mockData = [
    {
      name: "Test Beer",
      description: "This is a test beer description.",
      image_url: "test_image_url.jpg",
    },
  ];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  render(<App />);
  const likeButton = await screen.findByTestId("like-button-0");
  fireEvent.click(likeButton);
  const filledHeartIcon = screen.getByTestId("filled-heart-icon-0");
  expect(filledHeartIcon).toBeInTheDocument();
});

test("displays unfilled heart icon when like button is clicked twice", async () => {
  const mockData = [
    {
      name: "Test Beer",
      description: "This is a test beer description.",
      image_url: "test_image_url.jpg",
    },
  ];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  render(<App />);
  const likeButton = await screen.findByTestId("like-button-0");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  const unfilledHeartIcon = screen.getByTestId("unfilled-heart-icon-0");
  expect(unfilledHeartIcon).toBeInTheDocument();
});

test("displays beer name and description when like button is clicked", async () => {
  const mockData = [
    {
      name: "Test Beer",
      description: "This is a test beer description.",
      image_url: "test_image_url.jpg",
    },
  ];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  render(<App />);
  const likeButton = await screen.findByTestId("like-button-0");
  fireEvent.click(likeButton);
  const beerName = await screen.findByText("Test Beer");
  const beerDescription = await screen.findByText("This is a test beer description.");
  expect(beerName).toBeInTheDocument();
  expect(beerDescription).toBeInTheDocument();
});

test("renders copyright text", () => {
  render(<App />);
  const copyrightText = screen.getByText("Copyright Foolproof 2019");
  expect(copyrightText).toBeInTheDocument();
});
