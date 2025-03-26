## Scope of the Project

The Malvern Shoewear project aims to develop a comprehensive platform for showcasing and managing a collection of footwear products. The primary objectives include:

- **Product Catalog**: Display a wide range of shoes with detailed descriptions, pricing, and images.
- **User Interaction**: Enable users to browse, search, and filter products based on categories, sizes, and styles.
- **Responsive Design**: Ensure the platform is accessible and visually appealing across various devices.
- **Scalability**: Build a foundation that supports future enhancements, such as user accounts, reviews, and e-commerce functionality.

This project is designed to provide a seamless and engaging experience for both users and administrators.



# Project Requirements
1.Your app must be a HTML/CSS/JS frontend that accesses data from a public API or from a db.json file using json-server. Your API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format. Try to avoid using an API that requires a key. APIs that are free and require no authorization will be easiest to use. For ideas, see this list of no-auth APIsLinks to an external site.. If you would like to use an API that requires a key, please consult with your instructor on how to protect that key. NEVER push your API key to github!

Y2.our entire app must run on a single page. There should be NO redirects or reloads. In other words, your project will contain a single HTML file.

3.Use at least 3 distinct event listenersLinks to an external site. (3 events of different types) that enable interactivity. What this means is that, if you had 3 click events, that would only count as 1 distinct event and you would need to add at least 2 more. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc. Each of your event listeners should also have its own unique callback function. These must be added using JavaScript's .addEventListener() method. Events embedded into HTML elements and CSS will not count toward the total. Please ask your instructor if you have questions regarding this requirement.

4.Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.

5.Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.

# Stretch Goals
Use json-serverLinks to an external site. in your project to persist your app's interactivity.


The main goal of this project is to create a section in which;
1. Product catalog - displays the products within the json file...it fetches them and displays them.
2. Product Menu - when the user clicks a shoe it is displayed on the product menu with its necessary details and also has a delete and edit button so as to be able to change or remove it if needed to
3. Add New Shoe - it enables a user to add a shpe and save it to the server for easier retrieval.
4. Search button - it enables a user to search a shoe within the server if it is available or not.