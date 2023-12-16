# Grandma's Kitchen

In honor of our grandma who passed in 2023, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 200 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. 

When building this I had a few main goals in mind
- With a direct and singular purpose of giving the whole family quick access to the recipe box, the interface is simple. Outside of the landing/login pages, all features are availalbe from a single page
- In an attempt to preserve as much sentiment as possible, the recipe cards are designed to resemble her actual cards. The design includes a font which mimics her handwriting, and you flip through them one at a time as if you're flipping through her box.
- As a user, creating a new account is always a hassle, and initially I wanted to avoid it. A lot of the people who will use this site are older and not tech-savvy, and the last thing I wanted to do was make this difficult for them. But in the end I decided user accounts were necessary to maintain favorites and comments. To make it as easy on the users as possible, all accounts are facilitated with Oauth 2.0. Sessions are maintained on the server to last 3 months, and if the user accesses the website in the 3rd month, their session is refreshed for another 3 months. The only personal info that's requested is a dispay name, which is pulled automatically from the social account which was used to log in. This way, assuming the user is on the site semi-regularly, they log in once and never have to think about it again.

### Pages
- Landing page
    - if the user has an active session, they are redirected to the recipes page via a react-router-dom loader function
    - user is introduced to the concept and answers a question

- Login page
    - if the user has not answered the question from the landing page, they are redirected to the landing page via a react-router-dom loader function
    - if the user has an active session, they are redirected to the recipes page via a react-router-dom loader function
    -  user logs in with Facebook (more options coming soon)


- Recipes page
    - if the user has not answered the question from the landing page, they are redirected to the landing page via a react-router-dom loader function
    - if the user does NOT have an active session, they are redirected to the login page via a react-router-dom loader function
    - from this page, the user can search recipes, add/view comments, and print


### Components

(Header)[./components/Header.js]
- displays the site name
- contains a dropdown user menu
    - display name: opens a modal where the user can edit their display name
    - logout: logs out the user and redirects to the login page

(SearchBar)[./components/SearchBar.js]
- contains search options: title, category, and favorites filter
- search button searches recipes by criteria
- 'view all' button pulls all recipes from the database

(RecipeList)[./components/RecipeList.js]
- receives the currentUser object from RecipePage.js
- holds the search functions, animation logic, and navigation through keys/swiping
- results from search functions are stored in the recipes array
- the activeRecipes array contains the recipe you see on the screen, only one at a time
- the activeIndex tells activeRecipes which object to pull from recipes array
- useTransition from react-spring configures the animation pulling data from activeRecipes array

(Recipe)[./components/Recipe.js]
- receives the recipe object and currentUser Object from RecipeList.js
- displays all the recipe info
- contains buttons for user to interact with the recipe
    - favorite: add or remove from favorites on click
    - comment: opens a modal to add a comment to the recipe
    - print: generates a printer-friendly pdf of the recipe
- CommentList component is rendered below recipe card

(CommentList)[./components/comments/CommentList.js]
- receives the recipeId and currentUserId from Recipe.js
- fetches comments for the recipe on mount
    - unique Query for each recipe from react-query
    - using react-query cache data, the user can quickly flip back and forth through the recipes without waiting for a reload each time
- fetched comments are stored in the comments array, which is mapped into Comment componen

(Comment)[./components/comments/Comment.js]
- receives the comment object, currentUserId, and recipeId from CommentList

CommentModal
- in design

DeleteCommentModal
- in design

EditCommentModal
- in design

DisplayNameModal
- in design

### TO DO

- guest account setup
- print generate pdf
- add error/success indicators to all API calls
    - search recipes
    - change display name
    - add comment
    - add favorite
    - edit comment
    - delete comment
    - log in?
- general user testing + debugging
- search function execute on 'enter' key