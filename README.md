# Grandma's Kitchen

In honor of our grandma who passed in 2023, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 200 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. 

View the site [here](https://grandma-8ed4c.web.app/)
View the backend [here]()

### Technologies implemented

#### Frontend
- React Framework
- React Query asynchronous state management
- React Router navigation
    - loader functions that execute before pages render
- Bootstrap/Reactstrap grid
- React Spring animations
- API integration
- Form validation (custom function)
- Throttling with setTimeout
- 

#### Backend
- Express Framework
- Mongoose/MongoDb
- Oauth 2.0 authorization with passport
- Session support
- Cookies
- CRUD functions
- PDF generation

When building this I had a few main goals in mind
- With a direct and singular purpose of giving the whole family quick access to the recipe box, the interface is simple. Outside of the landing/login pages, all features are availalbe from a single 'recipes' page
- In an attempt to preserve as much sentiment as possible, the recipe card elements are designed to resemble her actual note cards. The design includes a font which mimics her handwriting, and you flip through them one at a time as if you're flipping through her box.
- As a user, creating a new account is always a hassle, and initially I wanted to avoid it. A lot of the people who will use this site are older and not tech-savvy, and the last thing I wanted to do was make this difficult for them. But in the end I decided to implement optional accounts to maintain favorites and comments. To make it as easy on the users as possible, all accounts are facilitated with Oauth 2.0. Sessions are maintained on the server to last 3 months, and if the user accesses the website in the 3rd month, their session is refreshed for another 3 months. The only personal info that's requested is a dispay name, which is pulled automatically from the social account which was used to log in. This way, assuming the user is on the site semi-regularly, they log in once and never have to think about it again.

### Pages
- Landing page
    - if the user has an active session, they are redirected to the recipes page via a react-router-dom loader function
    - user is introduced to the concept and answers a question

- Login page
    - if the user has not answered the question from the landing page, they are redirected to the landing page via a react-router-dom loader function
    -  user logs in with Google or continues as a guest

- Recipes page
    - if the user has not answered the question from the landing page, they are redirected to the landing page via a react-router-dom loader function
    - from this page, the user can search recipes, add/view comments, and print


### Components

[Header](./src/components/Header.js)
- displays the site name
- contains a dropdown user menu
    - display name: opens a modal where the user can edit their display name
    - logout: logs out the user and redirects to the login page

[SearchBar](./src/components/SearchBar.js)
- contains search options: title, category
- a 'favorites' filter switch will be present if a user is logged in 
- search button searches recipes by criteria

[RecipeList](./src/components/RecipeList.js)
- receives the currentUser object from RecipePage.js
- holds the search functions, animation logic, and navigation through keys/swiping
- results from search functions are stored in the recipes array
- the activeRecipes array contains the recipe you see on the screen, only one at a time
- the activeIndex tells activeRecipes which object to pull from recipes array
- useTransition from react-spring configures the animation pulling data from activeRecipes array

[Recipe](./src/components/Recipe.js)
- receives the recipe object and currentUser Object from RecipeList.js
- displays all the recipe info
- contains buttons for user to interact with the recipe
    - favorite: add or remove from favorites on click
    - comment: opens a modal to add a comment to the recipe
    - print: generates a printer-friendly pdf of the recipe
- CommentList component is rendered below recipe card

[CommentList](./src/components/comments/CommentList.js)
- receives the recipeId and currentUserId from Recipe.js
- fetches comments for the recipe on mount
    - unique Query for each recipe from react-query
    - using react-query cache data, the user can quickly flip back and forth through the recipes without waiting for a reload each time
- fetched comments are stored in the comments array, which is mapped into Comment componen

[Comment](./src/components/comments/Comment.js)
- receives the comment object, currentUserId, and recipeId from CommentList

[CommentModal](./src/components/comments/CommentModal.js)
- receives userId, recipeId, setIsOpen, and isOpen from Recipe.js
- receives text input from the user, and sends the info to the server
    - invalidates the comment query for the recipe so the comments are refreshed from the server

[DeleteCommentModal](./src/components/comments/DeleteCommentModal.js)
- receives isOpen, setIsOpen, commentId, and recipeId from Comment.js
- lets the user delete a comment they posted
    - invalidates the comment query for the recipe so the comments are refreshed from the server

[EditCommentModal](./src/components/comments/EditCommentModal.js)
- receives  isOpen, setIsOpen, commentText, commentId, and recipeId from Comment.js
- lets the user edit a comment they posted
    - invalidates the comment query for the recipe so the comments are refreshed from the server
DisplayNameModal
- in design

### TO DO

frontend
- print button not working on mobile? 
- add prompts to login when clicking the favorite/comment buttons

backend
- add email notifications when someone comments on a recipe
- pdfs are not generating in the right format

 
can do later
- animate success messages for edit/delete/post comments
- add substitutions guide at the bottom of recipes page?
- option to add pictures to comments? if so, have all pictures display near top of recipe
- "random" recipe button
- add option to comment as a guest?? 
- add option to delete account
