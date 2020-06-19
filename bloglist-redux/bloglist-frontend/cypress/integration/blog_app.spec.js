describe("Blog app", function () {
  beforeEach(function () {
    cy.clearLocalStorage();
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.createUser({
      name: "testuser",
      username: "testuser",
      password: "password",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.get("form#loginForm");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input#username").type("testuser");
      cy.get("input#password").type("password");
      cy.get("button#loginButton").click();

      cy.contains("testuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input#username").type("invalidUser");
      cy.get("input#password").type("invalidPassword");
      cy.get("button#loginButton").click();
      cy.get("#notification").contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "testuser",
        password: "password",
      })
        .then((response) => {
          localStorage.setItem(
            "loggedBlogappUser",
            JSON.stringify(response.body)
          );
          return response.body;
        })
        .then((user) => {
          cy.createBlog(
            {
              author: "blog author",
              title: "blog title",
              url: "blog.url",
            },
            user
          );
        });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("input#titleInput").type("some title");
      cy.get("input#authorInput").type("some author");
      cy.get("input#urlInput").type("some url");
      cy.get("button#createBlogButton").click();
      cy.get("#notification").contains(
        "a new blog some title by some author added"
      );
      cy.get("div#blogsContainer").contains("some title");
      cy.get("div#blogsContainer").contains("some author");
    });

    it("A user can like a blog", function () {
      cy.get("div#blog").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("like").click();
      cy.get("@theBlog").contains("likes 1");
    });

    it("A user can delete blog", function () {
      cy.get("div#blog").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("remove").click();
      cy.get("div#blog").should("not.exist");
    });

    it("A user can only delete their own blog", function () {
      cy.createUser({
        name: "anotheruser",
        username: "anotheruser",
        password: "anotherpassword",
      });
      cy.get("button#logoutButton").click();

      cy.request("POST", "http://localhost:3001/api/login", {
        username: "anotheruser",
        password: "anotherpassword",
      })
        .then((response) => {
          localStorage.setItem(
            "loggedBlogappUser",
            JSON.stringify(response.body)
          );
          return response.body;
        })
        .then(() => {
          cy.visit("http://localhost:3000");
        });
      cy.get("div#blog").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("remove").click();
      cy.get("@theBlog").should("exist");
    });

    it("Blogs are order by number of likes", function () {
      cy.createBlog({
        author: "author",
        title: "blog1",
        url: "url",
      });
      cy.createBlog({
        author: "author",
        title: "blog2",
        url: "url",
      });
      cy.get("div#blogsContainer").contains("blog1").parent().as("theBlog1");
      cy.get("@theBlog1").contains("view").click();
      cy.get("@theBlog1").contains("like").click().click().click();

      cy.get("div#blogsContainer").contains("blog2").parent().as("theBlog2");
      cy.get("@theBlog2").contains("view").click();
      cy.get("@theBlog2").contains("like").click().click().click().click();

      cy.visit("http://localhost:3000");
      const titles = [];
      cy.get("div#blogsContainer")
        .find("div#blog")
        .each((blog) => {
          titles.push(blog.find("#title").text());
        })
        .then(() => {
          expect(titles).to.deep.equal(["blog2", "blog1", "blog title"]);
        });
    });
  });
});
