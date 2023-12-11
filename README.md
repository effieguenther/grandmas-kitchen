# Grandma's Kitchen

In honor of our grandma who passed in 2023, Sandy Daniel, this is a digitized version of her coveted recipe box. There are over 200 tried and tested meals that we grew up eating our whole lives. Some are her own creation, and others were shared through her community and church. 

When building this I had a few main goals in mind
- With a direct and singular purpose of giving the whole family quick access to the recipe box, the interface is simple. Outside of the landing/login pages, all features are availalbe from a single page
- In an attempt to preserve as much sentiment as possible, the recipe cards are designed to resemble her actual cards. The design includes a font which mimics her handwriting, and you flip through them one at a time as if you're flipping through her box.
- As a user, creating a new account is always a hassle, and initially I wanted to avoid it. A lot of the people who will use this site are older and not tech-savvy, and the last thing I wanted to do was make this difficult for them. But in the end I decided user accounts were necessary to maintain favorites and comments. To make it as easy on the users as possible, all accounts are facilitated with Oauth 2.0. Sessions are maintained on the server to last 3 months, and if the user accesses the website in the 3rd month, their session is refreshed for another 6 months. The only personal info that's requested is a dispay name, which is pulled automatically from the social account which was used to log in. This way, assuming the user is on the site semi-regularly, they log in once and never have to think about it again.

### Pages
- Landing page
- 
