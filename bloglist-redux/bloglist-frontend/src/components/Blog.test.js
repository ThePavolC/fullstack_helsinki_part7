import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component, mockHandleAddLike, mockHandleRemove;

  beforeEach(() => {
    const blog = {
      title: "Test title",
      author: "Test author",
      url: "Test.url",
      likes: 10,
      user: {},
    };

    mockHandleAddLike = jest.fn();
    mockHandleRemove = jest.fn();

    component = render(
      <Blog
        blog={blog}
        handleAddLike={mockHandleAddLike}
        handleRemove={mockHandleRemove}
      />
    );
  });

  test("renders title and author by default", () => {
    expect(component.container).toHaveTextContent("Test title");
    expect(component.container).toHaveTextContent("Test author");
  });

  test("renders url and likes hidden by default", () => {
    expect(component.container.querySelector(".togglableContent")).toHaveStyle(
      "display: none"
    );
  });

  test("after clicking a button shows url and likes", () => {
    const toggleButton = component.container.querySelector(".toggleButton");
    fireEvent.click(toggleButton);

    const content = component.container.querySelector(".togglableContent");
    expect(content).not.toHaveStyle("display: none");
    expect(content).toHaveTextContent("Test.url");
    expect(content).toHaveTextContent("likes 10");
  });

  test("handler is called when like button is clicked", () => {
    const likeButton = component.container.querySelector(".likeButton");
    fireEvent.click(likeButton);
    expect(mockHandleAddLike.mock.calls).toHaveLength(1);
    fireEvent.click(likeButton);
    expect(mockHandleAddLike.mock.calls).toHaveLength(2);
  });
});
