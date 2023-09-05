const express = require('express');
const app = express();
const port = 8080;

// Use Pug as the template engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Custom middleware to verify working hours
app.use((req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 10) {
    next(); // Continue to the next middleware or route
  } else {
    res.send('The website is only available during working hours (Mon-Fri, 9-17).');
  }
});

// Define routes
app.get('/', (req, res) => {
  res.render('home', { page: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { page: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { page: 'Contact Us' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
