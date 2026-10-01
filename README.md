# ?? Automated Feed Reader Tests

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)

A comprehensive test suite built with Jasmine for a web-based RSS Feed Reader application. This project demonstrates Test-Driven Development (TDD) principles by defining and implementing test specs for the application's core functionality, DOM manipulation, and asynchronous network requests.

## ?? Testing Suites Included

*   **RSS Feeds Definition:** Validates that the \llFeeds\ variable has been defined, is not empty, and each feed has a valid URL and name.
*   **The Menu:** Ensures that the sliding menu is hidden by default and toggles visibility correctly when the menu icon is clicked.
*   **Initial Entries:** Contains an asynchronous test that guarantees the \loadFeed\ function completes its work and there is at least a single \.entry\ element within the \.feed\ container.
*   **New Feed Selection:** An asynchronous test that ensures when a new feed is loaded by the \loadFeed\ function, the DOM content actually changes.

## ?? How to Run the Tests

1.  Clone the repository: \git clone https://github.com/LOKESH10796/automated-feed-reader-tests.git\
2.  Open \index.html\ in your favorite web browser.
3.  Scroll to the bottom of the page to view the live Jasmine test results.

## ?? License

This project is licensed under the MIT License.
