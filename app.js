// Function to store an item in localStorage
async function createReview() {
    const title = document.getElementById("title").value;
    const review = document.getElementById("review").value;
  
    if (!title || !review) {
      alert("Please enter both title and review.");
      return;
    }
  
    const response = await axios.post(`http://localhost:3000/reviews/${title}`, {
      title: title,
      review: review,
    });
  
    if (response.status === 200) {
      alert("Item stored successfully.");
    } else {
      alert("Error storing item.");
    }
  }
  
  // Function to retrieve an item from localStorage
  async function retrieveMovie() {
    const title = document.getElementById("getTitle").value;
  
    if (!title) {
      alert("Please enter a title to retrieve.");
      return;
    }
  
    const response = await axios.get(`http://localhost:3000/movies/${title}`);
  
    if (response.status === 200) {
      document.getElementById("result").textContent = `review: ${JSON.stringify(
        response.data
      )}`;
    } else if (response.status === 404) {
      document.getElementById("result").textContent = "Item not found.";
    } else {
      document.getElementById("result").textContent = "Error retrieving item.";
    }
  }

