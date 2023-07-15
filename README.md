<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🗝️ Key Features](#key-features)
  - [🛠️ Built With](#built-with)
- [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

# 📖 Financial Modeling <a name="about-project"></a>

**Financial Modeling** is a SPA that shows up-to-date data about the stock market. It features a homepage, a routing page, and three details pages. The homepage displays a list of company stock symbols. When the user clicks on any company stock symbol, they get redirected to the routing page where they can choose what financial statements of the selected company to read about. When they click on any option, they get redirected to the respective details page, which displays relevant information about the chosen company's financial statements.

## 🗝️ Key Features <a name="key-features"></a>

- Consumes the [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs/)
- Allows the user to search by company name or symbol
- Allows the user to sort by symbol name or stock price
- Allows the user to filter by stock exchange or stock type
- Includes pagination given that there's information for more than 17000 stocks
- Allows the user to select the page size
- Implements `typescript`
- Implements global state management with `@reduxjs/toolkit`
- Implements routing with `react-router-dom`
- Implements `react-bootstrap`'s styled components
- Uses `axios` for API data fetching
- Includes `vitest` and `@testing-library`'s unit tests

## 🛠️ Built With <a name="built-with"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://react.dev">React</a></li>
  </ul>
  <ul>
    <li><a href="https://vitejs.dev/">Vite</a></li>
  </ul>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- [https://financial-modeling.dicodiaz.com.co](https://financial-modeling.dicodiaz.com.co)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- Install [Node.js](https://nodejs.org/en)
- Install [pnpm](https://pnpm.io/installation)

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git clone git@github.com:dicodiaz/financial-modeling.git
```

### Install

Install this project with:

```sh
  cd financial-modeling
  pnpm install
```

### Usage

To run the project, execute the following commands:

```sh
  pnpm dev
```

### Run tests

To run tests, run the following command:

```sh
  pnpm test
```

### Deployment

There's a CD pipeline set up to track the `develop` branch.

Please open a PR from your feature branch to `develop` in order to contribute.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Dico Diaz Dussan**

- GitHub: [@dicodiaz](https://github.com/dicodiaz)
- LinkedIn: [Dico Diaz Dussan](https://www.linkedin.com/in/dico-diaz-dussan/)
- Portfolio: [portfolio.dicodiaz.com.co](https://portfolio.dicodiaz.com.co)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- [ ] Increase unit test coverage
- [ ] Add integration tests with Cypress

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

Give a ⭐️ if you like this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

- Original design idea by [Nelson Sakwa on Behance](https://www.behance.net/sakwadesignstudio).
- A huge thanks to [Microverse](https://www.microverse.org) for their constant support.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
