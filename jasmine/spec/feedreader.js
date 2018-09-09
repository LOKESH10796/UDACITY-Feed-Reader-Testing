/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(
    (function () {
        /* This is our first test suite - a test suite just contains
         * a related set of tests. This suite is all about the RSS
         * feeds definitions, the allFeeds variable in our application.
         */
        describe("RSS Feeds", function () {
            /* It tests to make sure that the
             * allFeeds variable has been defined and that it is not
             * empty.
             */

            it("are defined", function () {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            /* A test that loops through each feed
             * in the allFeeds object and ensures it has a URL defined
             * and that the URL is not empty.
             */
            it("URL defined", function () {
                for (let feed of allFeeds) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                }
            });

            /* A test that loops through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */
            it("name defined", function () {
                for (let feed of allFeeds) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                }
            });
        });

        /* A new test suite named "The menu" */
        describe("The menu", function () {
            /* A test that ensures the menu element is
             * hidden by default.
             */
            it("is hidden", function () {
                const bodyMenu = document.querySelector("body");
                expect(bodyMenu.classList.contains("menu-hidden")).toBe(true);
            });
            /* A test that ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */

            it("is clicked", function () {
                const bodyMenu = document.querySelector("body");
                const menuLink = document.querySelector(".menu-icon-link");
                menuLink.click();
                expect(bodyMenu.classList.contains("menu-hidden")).toBe(false);
                menuLink.click();
                expect(bodyMenu.classList.contains("menu-hidden")).toBe(true);
            });
        });
        /* A new test suite named "Initial Entries" */
        describe("Initial Entries", function () {
            /* A test that ensures when the loadFeed
             * function is called and completes its work.
             */
            beforeEach(function (done) {
                loadFeed(0, done);
            });

            it("completes its work", function () {
                expect($(".feed .entry").length).toBeGreaterThan(0);
            });
        });

        /* A new test suite named "New Feed Selection" */
        describe("New Feed Selection", function () {
            /* A test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * loadFeed() is asynchronous.
             */
            let testFeed;

            // when a new feed is loaded by the loadFeed function that the content actually changes

            beforeEach(function (done) {
                loadFeed(0, function () {
                    testFeed = $(".feed").html();
                    loadFeed(1, done);
                });
            });

            // Check the newsfeed  html to be not same as previous.
            it("has been loaded", function () {
                expect($(".feed").html()).not.toEqual(testFeed);
            });
        });
    })()
);