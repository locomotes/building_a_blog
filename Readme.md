We are going to be building a blog this week. Today is the first part, get use to setting up Models, Collections and Views. Also, this is a good time to start using Handlebars as your template engine.

Here is the data you will need to use

{
  "title": "", // String
  "content": "", // String
  "date": "", // String
  "status": "", // String
  "author": "", // String
  "tags": [] // Array of Strings
}

You are required to use both Backbone and Handlebars and the actions should be as followed:

1. Create a post => sends data to the server after you click "Create Post"
2. The new post should be prepended to the top of the post list (newest first)
3. The data should persist
4. All properties (except status) should be visible in the blog section

Also, use Parse for the backend. 

A completed project looks like the following

1. Ability to add blog posts
2. Blog posts follow the format that was posted in Monday's homework (title, content, date etc)
3. Ability to delete a blog post
4. Ability to click on a blog post title on the home page and be routed to a blog post single page with just that post and content.
5. A decent layout. Not looking for fancy layout/design but a proper layout using a grid system like Neat is recommended.
6. Ability to hit a single post URL and have that post show (hint: Routes)
7. Deployed to Heroku or GH Pages and the link posted below




