import express from "express";
import bodyParser from "body-parser";
import _  from 'lodash';


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const firstPost = {
  title: "All the Food",
  content: `All the Food is a blog dedicated to all the best places to eat and drink in Dublin. 
  Unlike some of the other websites on this list, 
  All the Food is specifically a blog website rather than a website that includes a blog as part of its content. 
  Readers will find different types of blog content here, such as restaurant reviews, travel guides and neighborhood lists. 
  There are six different categories on this blog: neighborhoods, reviews, restaurants, Dublin guides, travel guides and what’s new. 
  What’s interesting is that each category page is structured differently based on the content type. The same goes for the blog post pages. 
  This shows how well Editor Lisa Cope understands content and that, if you want to create a great user experience, there isn’t a one-size-fits-all solution for structuring your pages.`
}

let posts = [firstPost];

const homeStartingContent = "Welcome to My Blog Website - Where Every Word Finds a Home. ";

const aboutContent = `Welcome to My Blog Website.
This site is built using Node.js, Express, EJS, and CSS.
We believe in the power of clean, efficient code and a user-friendly interface.
These technologies work together to provide you with a seamless and enjoyable reading experience.
Feel free to explore and enjoy your time here!`;

const contactContent = "";

app.get("/", (req, res) => {
    res.render("home.ejs",{
      homeStartingContent: homeStartingContent,
      posts: posts
    });

});

app.get("/about", (req, res) => {
  res.render("about.ejs",{aboutContent: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs",{contactContent: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});


app.get("/:postName", (req, res)=> {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
  const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post.ejs",{
        title: post.title,
        content: post.content
      });
    }
    else {
      console.log("Not a Match");
    }
  });
});


app.post("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/post", (req, res) => {
  const post = {
    title: req.body["title"] ,
    content: req.body["content"]
  };
  posts.push(post);

  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
