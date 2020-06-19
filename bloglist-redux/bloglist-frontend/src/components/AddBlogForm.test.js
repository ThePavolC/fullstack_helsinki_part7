import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlogForm from "./AddBlogForm";

describe("<AddBlogForm />", () => {
  let component, mockBlogService, mockGetAll, mockAddBlog;

  beforeEach(() => {
    mockAddBlog = jest.fn();
    mockGetAll = jest.fn();
    mockBlogService = {
      addBlog: mockAddBlog,
      getAll: mockGetAll,
    };

    component = render(
      <AddBlogForm
        blogService={mockBlogService}
        setBlogs={jest.fn()}
        setNotification={jest.fn()}
        setIsErrorNotification={jest.fn()}
      />
    );
  });

  test("state of form values is set correctly", () => {
    const titleInput = component.container.querySelector("#titleInput");
    const authorInput = component.container.querySelector("#authorInput");
    const urlInput = component.container.querySelector("#urlInput");

    fireEvent.change(titleInput, {
      target: { value: "test title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "test author" },
    });
    fireEvent.change(urlInput, {
      target: { value: "test url" },
    });

    expect(component.container.querySelector("#titleInput").value).toBe(
      "test title"
    );
    expect(component.container.querySelector("#authorInput").value).toBe(
      "test author"
    );
    expect(component.container.querySelector("#urlInput").value).toBe(
      "test url"
    );
  });

  test("addBlog service is called with correct details", () => {
    const titleInput = component.container.querySelector("#titleInput");
    const authorInput = component.container.querySelector("#authorInput");
    const urlInput = component.container.querySelector("#urlInput");
    const form = component.container.querySelector("form");

    fireEvent.change(titleInput, {
      target: { value: "test title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "test author" },
    });
    fireEvent.change(urlInput, {
      target: { value: "test url" },
    });

    fireEvent.submit(form);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
    expect(mockAddBlog.mock.calls[0][0]).toEqual({
      title: "test title",
      author: "test author",
      url: "test url",
    });
  });
});
