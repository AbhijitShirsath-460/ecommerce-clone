E-commerce Hiring Challenge

Project Overview
This project is a full-stack e-commerce website developed as part of the Frontend Pre-Interview Task for the Hiring Challenge. The application is a clone of an e-commerce site, built using the React JavaScript framework and integrated with the Platzi Fake API to dynamically populate product listings, categories, and other relevant data. The site features a responsive design, user authentication, a shopping cart, and a mock checkout process. Optional features such as search functionality and product filtering have also been implemented to enhance the user experience.

The application is deployed on Vercel for live access and the source code is hosted on GitHub. This README provides instructions to set up and run the project locally, as well as details about the deployed site.
Features

Frontend Development:
Built with React and Vite for a fast and modern development experience.
Responsive design inspired by the reference e-commerce site, ensuring compatibility across devices.
Key features include product listings, product details, shopping cart, and a mock checkout process.


API Integration:
Integrates with the Platzi Fake API to dynamically fetch product data, including images, descriptions, and prices.


User Authentication:
Implemented using Firebase Authentication for login and signup functionality.


Additional Features:
Search functionality to find products by name or category.
Product filtering and sorting by price and category.
Smooth UI/UX with custom styles and subtle animations for improved user engagement.


Deployment:
Deployed on Vercel for reliable hosting and fast performance.


Code Quality:
Clean, modular, and well-documented code following best practices.
Version-controlled using Git and hosted on GitHub.



Live Demo

GitHub Repository: https://github.com/AbhijitShirsath-460/ecommerce-clone.git

Prerequisites
To run this project locally, ensure you have the following installed:

Node.js (v16 or higher)
npm (v7 or higher) or yarn

Installation and Setup
Follow these steps to set up and run the project locally:

Clone the Repository:
git clone https://github.com/AbhijitShirsath-460/ecommerce-clone.git


Install Dependencies:Using npm:
npm install

Or using yarn:
yarn install


Set Up Environment Variables:

Replace your_firebase_* values with the actual credentials from your Firebase project. The VITE_API_URL points to the Platzi Fake API.


Run the Development Server:Using npm:
npm run dev

Or using yarn:
yarn dev

The application will be available at http://localhost:5173 (or another port if specified).

Build for Production (optional):To create a production build:
npm run build

Preview the production build:
npm run preview



Project Structure
ecommerce-clone/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, styles, and other assets
│   ├── components/           # Reusable React components
│   ├── pages/                # Page components (e.g., Home, ProductDetails, Cart)
│   ├── services/             # API service functions
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables (not committed)
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # This file

Technologies Used

React: JavaScript library for building user interfaces.
Vite: Build tool for fast development and production builds.
Firebase Authentication: For user login and signup.
Axios: For making API requests to the Platzi Fake API.
Tailwind CSS: For responsive and modern styling.
Vercel: For deployment and hosting.
Git/GitHub: For version control and code hosting.

Functionality: Fully functional product listings, cart, checkout, and authentication.
Code Quality: Modular, well-documented code with clear comments and consistent formatting.
UI/UX Design: Responsive design resembling the reference e-commerce site with custom enhancements.
API Integration: Seamless integration with the Platzi Fake API for dynamic data.
Creativity: Includes bonus features like search and filtering for an improved user experience.

Troubleshooting

API Issues: Ensure the Platzi Fake API (https://api.escuelajs.co/api/v1) is accessible. Check your network or API rate limits.
Firebase Authentication: Verify that your Firebase credentials in the .env file are correct.
Build Errors: Ensure all dependencies are installed (npm install) and that Node.js is up-to-date.

Contact
For any questions or issues, please reach out via the GitHub repository or the contact information provided in the application process.
