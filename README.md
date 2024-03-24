<!-- HEADER -->
<div align="center">
  <img src="./public/clap_logo.webp" alt="Women in view logo" width="180">
  <div></div>
  <br>
  <p align="center">
  <a href="#about-the-project">About the project</a> &nbsp;&bull;&nbsp;
  <a href="#getting-started">Getting Started</a> &nbsp;&bull;&nbsp;
  <a href="#usage">Usage</a> &nbsp;&bull;&nbsp;
  <a href="#documentation">Documentation</a>
  </p>

  <p align="center">
   The collaborative initiative that puts female characters in perspective
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
      <ul>
        <li><a href="#folder-structure">Folder structure</a></li>
      </ul>
    </li>
    <li><a href="#documentation">Documentation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## ✨ About the project
*"I only go to a movie if it satisfies three basic requirements. One, it has to have at least two women in it who, two, talk to each other about, three, something besides a man."*
<p>Here are the basis of the Bechdel test. The "Women in view" project aims to shed light on the Bechdel Test and its impact on pop culture by scrutinizing the portrayal of female characters in works of fiction.</p>
<p>Through this web application, users will have the opportunity to delve deeper into the Bechdel test, search for films, and determine whether they pass or not the Bechdel test. Moreover, users can actively contribute to the database by testing films themselves against the Bechdel test's standards, thus fostering a more comprehensive understanding of gender representation in media.</p>


### Built with:
- ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br>

<!-- GETTING STARTED -->
## 🛠 Getting Started
Clone down this repository.

### Prerequisites:
You will need `node` and `npm` installed globally on your machine.  

### Installation:

`npm install` 
<p></p><br>

<!-- USAGE -->
## 🚀 Usage

To launch the project, you'll first have to __start the server__ with this command:

`npm run dev`  

Then, you'll be able to __visit the app__ at:

`localhost:3000`

### Folder structure:
```
.
├── public  »  Images in the webp format to ensure fast loading
|
├── src .  »  Project source code
|       |
|       ├── components  »  Several components including ui elements such as button, form fields, headers, badges, etc.
|       |
|       ├── hooks  »  Custom hook to manage authentication (useAuth)
|       |
|       ├── layouts  »  Applications layouts: guest (unauthenticated users), protected (authenticated users) and admin
|       |
|       ├── lottie  »  JSON-based animation file format
|       |
|       ├── pages  »  Pages of the app
|       |
|       ├── utils  »  Functions and objects useful in multiple parts of the application
|       |
|       ├ App.css  »  CSS rules specific to certain selectors and classes (body, section, main, gridCard, etc.)
|       |
|       ├ index.css  »  Tailwind imports
|       |
|       ├ main.jsx  »  Creates a DOM at the root level and calls the App component
|       |
|       ├ App.jsx  »  Application entry point
|       |
|       └ router.jsx  »  Routes and components rendered for each route
|       
|
(...)
|
└── index.html  »  The HTML document containing the root of the app
```
<br>

<!-- DOCUMENTATION -->
## 📚 Documentation
- [React.js documentation](https://beta.reactjs.org/)
- [Vite documentation](https://vitejs.dev/guide/#overview)
- [Tailwind documentation](https://tailwindcss.com/)
