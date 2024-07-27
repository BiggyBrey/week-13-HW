const express = require("express");
const axios = require("axios");
const { LocalStorage } = require("node-localstorage");
const app = express();
const PORT = 3000;
const cors = require('cors');

const localStorage = new LocalStorage("./scratch");

app.use(cors());
app.use(express.json());
//ideas - tvshows /movie reviews/ratings

// GET ROUTE
// get movie movie + rating from specific movie
app.get("/movies/:title", (req, res) => {
  try {
    let title = req.params.title;
    console.log(title);

    // retrieve movie from localStorage
    let movie = localStorage.getItem(title);
    console.log(movie);
    if (movie) {
      res.send(movie);
    } else {
      res.send("Review Does Not Exist");
      console.log("Review Does Not Exist");
    }
  } catch (err) {
    res.send(err);
  }
});


 

// POST ROUTE
// post review /rating to movie
app.post("/reviews/:title", async (req, res) => {
  try {
    //get title from api
    let title = req.params.title;
    //reviews arr to store all reviews

    //user inputted review
    // const { movieTitle, movieReview } = req.body;
    // console.log(movieTitle + movieReview);
    let review = req.body.review;
    console.log(review);

    // get api data
    let response = await axios.get(
      `http://www.omdbapi.com/?t=${title}&apikey=a1faa481`
    );
  //if movie doesn't exist in api return err
   if (response.data.Response == "False") {
    response.data["Review Status"] = "Review Rejected. Please Try Again";
    res.send(response.data);
    return;  }
    //merge review + api response

    //we store the review +api response local storage- > into the array of movie objects
    //get existing item from key
    let movie = localStorage.getItem(title);

    if (movie) {
      //get current value of movie from local storage

      let currVal = JSON.parse(movie);
      // console.log (currVal)
      //adds a new review to reviews array
      currVal.review.push(review);
      // console.log(currCal.review)

      localStorage.setItem(title, JSON.stringify(currVal));
    } else {
      //if movie review doesn't exist
      //merge review+api response
      response.data.review = [review];
      localStorage.setItem(title, JSON.stringify(response.data));
    }
    res.send("Review Submitted");
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  // localStorage.clear();
  console.log(`running express api at localhost:${PORT}`);
});

// storing into localStorage

// get
// localhost:3000/items/task

// app.get("/items/:key", (req, res) => {
//     let key = req.params.key
//     localStorage.getItem(key);

// })

// app.post("/item", (req, res) => {
//     const {key, value} = req.body;

//     // get existing item from key
//     let storedItem = localStorage.getItem(key)

//     if(storedItem){
//         let currVal = JSON.parse(storedItem)
//         currVal.push(value)
//         localStorage.setItem(key, JSON.stringify(currVal))
//     } else{
//         localStorage.setItem(key, JSON.stringify([value]))
//     }

//     res.send(req.body)
// })
