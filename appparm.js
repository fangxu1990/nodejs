
var express = require("express"); 
 var app = express()
      , blog = express()
      , blogAdmin = express();
    app.use('/blog', blog);
    app.use('/admin', blogAdmin);
    console.log(app.path()); // ''
    console.log(blog.path()); // '/blog'
    console.log(blogAdmin.path()); // '/blog/admin'


app.listen(8081);