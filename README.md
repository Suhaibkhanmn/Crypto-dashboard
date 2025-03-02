# Crypto Price Tracker

## Overview

This is a **Next.js** based web application that fetches and displays **live cryptocurrency prices**. It also includes **Docusaurus documentation** for developers.

## Features

- Live cryptocurrency price tracking using **CoinCap API**
- Search functionality to filter cryptocurrencies
- Dark mode support
- Manual refresh button to update prices
- Responsive design for web and mobile
- **Docusaurus** documentation for setup, API integration, and state management

---

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo.git
```

### 2️⃣ Install Dependencies

#### For Next.js App:

```sh
cd web-app
npm install
```

#### For Docusaurus Docs:

```sh
cd docs
npm install
```

### 3️⃣ Run the Application

#### Start Next.js App:

```sh
npm run dev
```

#### Start Docusaurus Documentation:

```sh
cd docs
npm run start
```

Now visit:

- **Next.js App** → `http://localhost:3000/`
- **Docusaurus Docs** → `http://localhost:3000/docs`

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **State Management**: React Query
- **API**: CoinCap API
- **Documentation**: Docusaurus
- **Deployment**: Vercel

---

## Live Demo

- **Crypto Price Tracker**: [Live App](https://your-vercel-deployment-link.vercel.app/)
- **Documentation**: [Docs](https://your-docs-deployment-link.vercel.app/)

---

## Project Documentation

For full documentation, visit the **Docusaurus docs**:

- [Setup Guide](https://your-docs-deployment-link.vercel.app/docs/setup)
- [API Integration](https://your-docs-deployment-link.vercel.app/docs/api)
- [State Management](https://your-docs-deployment-link.vercel.app/docs/state-management)
- [Challenges & Solutions](https://your-docs-deployment-link.vercel.app/docs/challenges)

---

## Troubleshooting

If you run into issues, check:

1. **API not loading?** CoinCap API might be down, check their status.
2. **Vercel deployment failed?** Run `npm run build` locally to catch errors.
3. **Docusaurus 404?** Ensure `intro.md` exists and `sidebars.js` is configured correctly.

---

## Contributing

Feel free to fork this project and submit a PR with improvements!

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to GitHub and create a PR

---

## License

This project is **MIT licensed**. Feel free to use and modify it as needed!
