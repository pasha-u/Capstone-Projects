import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));
 const posts = [];

app.post('/submit', (req, res) => {
    const post = req.body["postContent"];
    posts.push(post);
    res.redirect("/");
  })

app.get('/', (req, res) => {
    res.render("index.ejs",{posts: posts});
  })
  
  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    res.render("edit.ejs", { post: posts[id], id: id });
});

  app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    posts[id] = req.body.postContent; // Update post content
    res.redirect("/");
});
  
app.post("/delete/:id", (req, res)=>{
  const id = req.params.id;
  posts.splice(id, 1); // Remove post from the array
  res.redirect("/"); // Redirect to home after deleting
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})