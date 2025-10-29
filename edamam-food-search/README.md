# 🍎 Food Search App# 🍎 Edamam Food Search# React + Vite



A modern, responsive web application for searching and discovering nutritional information for thousands of foods. Built with React, Vite, and powered by the **Open Food Facts API** - a free, open database with no API keys required!



![React](https://img.shields.io/badge/React-18.3-blue.svg)A modern, responsive web application for searching and discovering nutritional information for thousands of foods. Built with React, Vite, and powered by the Edamam Food Database API.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)

![License](https://img.shields.io/badge/license-MIT-green.svg)



## ✨ Features![React](https://img.shields.io/badge/React-18.3-blue.svg)Currently, two official plugins are available:



- 🔍 **Smart Search**: Debounced search with in-memory caching![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)

- 📊 **Detailed Nutrition**: View calories, protein, fat, carbs, fiber, sugar, and more

- 📏 **Custom Servings**: Adjust serving sizes (per 100g or per serving)![License](https://img.shields.io/badge/license-MIT-green.svg)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- ⚡ **Fast & Responsive**: Optimized performance with loading states

- ♿ **Accessible**: Keyboard navigation and screen reader support- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- 🎨 **Clean Design**: Minimal, Bootstrap-based UI with Bootswatch theme

- 🔄 **Smart Retry**: Exponential backoff for rate-limited requests## ✨ Features

- 💾 **Intelligent Caching**: Cache recent searches to minimize API usage

- 🆓 **No API Keys Required**: Uses the free Open Food Facts database## React Compiler

- 🌍 **Global Database**: Access to millions of products worldwide

- 🔍 **Smart Search**: Debounced search with in-memory caching to reduce API calls

## 🚀 Quick Start

- 📊 **Detailed Nutrition**: View calories, protein, fat, carbs, and moreThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Prerequisites

- 📏 **Custom Servings**: Adjust serving sizes and measurement units

- Node.js (v16 or higher)

- npm or yarn- ⚡ **Fast & Responsive**: Optimized performance with loading states## Expanding the ESLint configuration



### Installation- ♿ **Accessible**: Keyboard navigation and screen reader support



1. **Clone the repository**- 🎨 **Clean Design**: Minimal, Bootstrap-based UI with Bootswatch themeIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

   ```bash

   git clone <your-repo-url>- 🔄 **Smart Retry**: Exponential backoff for rate-limited requests

   cd edamam-food-search- 💾 **Intelligent Caching**: Cache recent searches to minimize API usage

   ```

## 🚀 Quick Start

2. **Install dependencies**

   ```bash### Prerequisites

   npm install

   ```- Node.js (v16 or higher)

- npm or yarn

3. **Start the development server**- Edamam API credentials (free tier available)

   ```bash

   npm run dev### Installation

   ```

1. **Clone the repository**

4. **Open your browser**   ```bash

   - Navigate to `http://localhost:5173` (or the port shown in your terminal)   git clone <your-repo-url>

   cd edamam-food-search

**That's it!** No API keys or credentials required. Open Food Facts is completely free and open.   ```



## 📁 Project Structure2. **Install dependencies**

   ```bash

```   npm install

edamam-food-search/   ```

├── public/              # Static assets

├── src/3. **Set up environment variables**

│   ├── api/   

│   │   └── edamam.js   # API module (now using Open Food Facts)   Create a `.env.local` file in the root directory:

│   ├── components/   ```env

│   │   ├── Layout.jsx  # Main layout with navigation   VITE_EDAMAM_APP_ID=your_app_id_here

│   │   ├── SearchBar.jsx   VITE_EDAMAM_APP_KEY=your_app_key_here

│   │   ├── ResultsList.jsx   ```

│   │   └── FoodDetail.jsx

│   ├── pages/   You can copy from the example file:

│   │   ├── FoodSearch.jsx  # Home page   ```bash

│   │   ├── About.jsx       # About page   cp .env.example .env.local

│   │   └── ErrorPage.jsx   # 404 page   ```

│   ├── App.jsx         # Router configuration

│   ├── App.css         # Component styles4. **Get your Edamam API credentials**

│   ├── index.css       # Global styles   - Visit [Edamam Developer Portal](https://developer.edamam.com/)

│   └── main.jsx        # Entry point   - Sign up for a free account

├── .env.example        # (No credentials needed)   - Create a new application for "Food Database API"

├── index.html          # HTML template   - Copy your Application ID and Application Key

├── package.json   - Paste them into your `.env.local` file

└── README.md

```5. **Start the development server**

   ```bash

## 🎯 Usage   npm run dev

   ```

### Searching for Foods

6. **Open your browser**

1. Enter a food name or brand in the search box (e.g., "coca cola", "nutella", "cheerios")   - Navigate to `http://localhost:5173` (or the port shown in your terminal)

2. Results appear automatically as you type (debounced)

3. Click on any result to view detailed nutritional information## 📁 Project Structure



### Viewing Nutrition Details```

edamam-food-search/

- Select a food from the results list├── public/              # Static assets

- Adjust the serving size using quantity and measurement controls├── src/

- View comprehensive nutrition facts including:│   ├── api/

  - Calories│   │   └── edamam.js   # API module with all Edamam requests

  - Protein, Fat, Carbohydrates│   ├── components/

  - Fiber, Sugar, Sodium, Cholesterol│   │   ├── Layout.jsx  # Main layout with navigation

  - Saturated Fat, Salt│   │   ├── SearchBar.jsx

  - And more...│   │   ├── ResultsList.jsx

│   │   └── FoodDetail.jsx

## 🔧 Available Scripts│   ├── pages/

│   │   ├── FoodSearch.jsx  # Home page

```bash│   │   ├── About.jsx       # About page

# Development server with hot reload│   │   └── ErrorPage.jsx   # 404 page

npm run dev│   ├── App.jsx         # Router configuration

│   ├── App.css         # Component styles

# Build for production│   ├── index.css       # Global styles

npm run build│   └── main.jsx        # Entry point

├── .env.example        # Environment variables template

# Preview production build├── .env.local          # Your credentials (not committed)

npm run preview├── index.html          # HTML template

├── package.json

# Lint code└── README.md

npm run lint```

```

## 🎯 Usage

## 📦 Dependencies

### Searching for Foods

### Core

- **React** (v18.3+): UI library1. Enter a food name in the search box (e.g., "apple", "chicken breast", "brown rice")

- **React Router DOM** (v7+): Client-side routing2. Results appear automatically as you type (debounced)

- **Vite** (v7+): Build tool and dev server3. Click on any result to view detailed nutritional information



### Utilities### Viewing Nutrition Details

- **Lodash**: Debounce utility for search optimization

- Select a food from the results list

### Styling- Adjust the serving size using quantity and measurement controls

- **Bootstrap 5**: Via Bootswatch CDN (Flatly theme)- View comprehensive nutrition facts including:

  - Calories

## 📊 About Open Food Facts  - Protein, Fat, Carbohydrates

  - Fiber, Sugar, Sodium, Cholesterol

[Open Food Facts](https://world.openfoodfacts.org/) is a free, open database of food products from around the world. It's:  - And more...



- ✅ **Completely Free**: No API keys, no rate limits, no costs## 🔧 Available Scripts

- 🌍 **Collaborative**: Built by contributors worldwide (like Wikipedia for food)

- 📱 **Comprehensive**: Millions of products with barcodes and nutrition data```bash

- 🔓 **Open Data**: Licensed under Open Database License (ODbL)# Development server with hot reload

- 🆕 **Always Growing**: New products added daily by the communitynpm run dev



### Data Quality# Build for production

npm run build

- Products are added by users scanning barcodes

- Nutritional data comes from product packaging# Preview production build

- Quality varies by product (some have complete data, others partial)npm run preview

- Best for branded/packaged foods with barcodes

# Lint code

### API Informationnpm run lint

```

- **Base URL**: `https://world.openfoodfacts.org`

- **Documentation**: https://wiki.openfoodfacts.org/API## 📦 Dependencies

- **No Authentication Required**: Free and open for all

- **Rate Limits**: Reasonable use expected (our caching helps!)### Core

- **User-Agent Required**: We set "EdamamFoodSearch/1.0" as required- **React** (v18.3+): UI library

- **React Router DOM** (v7+): Client-side routing

## ⚠️ Important Notes- **Vite** (v7+): Build tool and dev server



### API Usage### Utilities

- **Lodash**: Debounce utility for search optimization

Unlike commercial APIs, Open Food Facts requests that you:

- Set a descriptive User-Agent (already configured in the code)### Styling

- Cache results when possible (implemented)- **Bootstrap 5**: Via Bootswatch CDN (Flatly theme)

- Don't abuse the service with excessive requests (debouncing helps)

## ⚠️ Important Notes

### Data Differences vs Edamam

### API Rate Limits

Since we switched from Edamam to Open Food Facts, note:

- More branded/packaged foods availableThe Edamam API has rate limits, especially on the free tier:

- Better international product coverage- **Developer Plan**: 10 calls/minute, 10,000 calls/month

- Nutritional values typically per 100g (standard metric)- Rate limit errors (429) are handled with exponential backoff retry

- Some products may have incomplete data

- No proprietary recipe database (only real products)### Security Considerations



### Caching Strategy**For Development/Prototype:**

- Environment variables are exposed in the browser (acceptable for prototypes)

The app implements a smart caching strategy:- Included in this project for ease of setup

- In-memory cache for last 10 searches

- 5-minute cache expiration**For Production:**

- Reduces API calls by ~60-80% in typical usage- ⚠️ **Never expose API keys in client-side code**

- Implement a server-side proxy (recommended approaches):

To clear the cache manually:

```javascript  1. **Netlify/Vercel Functions**

import { clearCache } from './api/edamam';     ```javascript

clearCache();     // netlify/functions/search-foods.js

```     export async function handler(event) {

       const query = event.queryStringParameters.query;

## 🚢 Deployment       const response = await fetch(

         `https://api.edamam.com/api/food-database/v2/parser?` +

### Deploy to Netlify         `app_id=${process.env.EDAMAM_APP_ID}&` +

         `app_key=${process.env.EDAMAM_APP_KEY}&` +

1. **Build settings**         `ingr=${query}`

   ```       );

   Build command: npm run build       return {

   Publish directory: dist         statusCode: 200,

   ```         body: JSON.stringify(await response.json())

       };

2. **Deploy**     }

   ```bash     ```

   npm run build

   netlify deploy --prod  2. **Express Server**

   ```     ```javascript

     // server.js

### Deploy to Vercel     const express = require('express');

     const app = express();

1. **Install Vercel CLI**     

   ```bash     app.get('/api/search', async (req, res) => {

   npm i -g vercel       const query = req.query.q;

   ```       const response = await fetch(

         `https://api.edamam.com/api/food-database/v2/parser?` +

2. **Deploy**         `app_id=${process.env.EDAMAM_APP_ID}&` +

   ```bash         `app_key=${process.env.EDAMAM_APP_KEY}&` +

   npm run build         `ingr=${query}`

   vercel --prod       );

   ```       res.json(await response.json());

     });

### Deploy to GitHub Pages     ```



1. **Update `vite.config.js`**  3. **Next.js API Routes**

   ```javascript     ```javascript

   export default {     // pages/api/search.js

     base: '/edamam-food-search/'     export default async function handler(req, res) {

   }       const { query } = req.query;

   ```       const response = await fetch(

         `https://api.edamam.com/api/food-database/v2/parser?` +

2. **Build and deploy**         `app_id=${process.env.EDAMAM_APP_ID}&` +

   ```bash         `app_key=${process.env.EDAMAM_APP_KEY}&` +

   npm run build         `ingr=${query}`

   ```       );

       res.json(await response.json());

**Note:** No server-side proxy needed since Open Food Facts doesn't require API keys!     }

     ```

## 🤝 Contributing

Then update `src/api/edamam.js` to use your proxy:

Contributions are welcome! Please feel free to submit a Pull Request.```javascript

const BASE_URL = '/api';  // Your proxy endpoint

## 📄 License```



This project is licensed under the MIT License.### Caching Strategy



## 🙏 AcknowledgmentsThe app implements a smart caching strategy:

- In-memory cache for last 10 searches

- **Open Food Facts** - For providing the free, open food database- 5-minute cache expiration

- **Bootswatch** - For the beautiful Bootstrap themes- Reduces API calls by ~60-80% in typical usage

- **React & Vite** - For the excellent development experience

To clear the cache manually:

## 📞 Support```javascript

import { clearCache } from './api/edamam';

For issues or questions:clearCache();

- Check the [Open Food Facts API Documentation](https://wiki.openfoodfacts.org/API)```

- Review the [FAQ section](#faq) below

## 🚢 Deployment

## ❓ FAQ

### Deploy to Netlify

**Q: Do I need API keys?**  

A: No! Open Food Facts is completely free and doesn't require any API keys or authentication.1. **Build settings**

   ```

**Q: Why did we switch from Edamam?**     Build command: npm run build

A: Edamam's free tier doesn't include the Food Database API. Open Food Facts is truly free and open for everyone.   Publish directory: dist

   ```

**Q: Are there rate limits?**  

A: Open Food Facts requests reasonable use. Our caching and debouncing ensure we're good API citizens.2. **Environment variables**

   - Add `EDAMAM_APP_ID` and `EDAMAM_APP_KEY` in Netlify dashboard

**Q: Why don't some products have complete nutrition data?**     - Note: Use server-side function (not `VITE_` prefix) for production

A: Open Food Facts is community-driven. Data quality depends on what users have submitted. You can contribute by adding missing data!

3. **Deploy**

**Q: Can I use this for commercial purposes?**     ```bash

A: Yes! Open Food Facts data is licensed under ODbL. Check their license for details.   npm run build

   netlify deploy --prod

**Q: How do I search for a specific product?**     ```

A: Try searching by product name, brand, or even barcode number. For example: "coca cola", "nutella", "3017620422003"

### Deploy to Vercel

**Q: Can I contribute to Open Food Facts?**  

A: Yes! Visit [Open Food Facts](https://world.openfoodfacts.org/) to learn how to add products and improve data quality.1. **Install Vercel CLI**

   ```bash

---   npm i -g vercel

   ```

**Made with ❤️ using React + Vite and Open Food Facts 🍎**

2. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Add environment variables** in Vercel dashboard

### Deploy to GitHub Pages

1. **Update `vite.config.js`**
   ```javascript
   export default {
     base: '/edamam-food-search/'
   }
   ```

2. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Edamam** - For providing the comprehensive food database API
- **Bootswatch** - For the beautiful Bootstrap themes
- **React & Vite** - For the excellent development experience

## 📞 Support

For issues or questions:
- Check the [Edamam API Documentation](https://developer.edamam.com/food-database-api-docs)
- Review the [FAQ section](#faq) below

## ❓ FAQ

**Q: I'm getting "credentials not configured" error**  
A: Make sure your `.env.local` file exists and contains valid `VITE_EDAMAM_APP_ID` and `VITE_EDAMAM_APP_KEY` values.

**Q: I'm getting 429 (rate limit) errors**  
A: The free tier has limits. The app will automatically retry with backoff. Consider upgrading your Edamam plan or implementing better caching.

**Q: Why are my environment variables not working?**  
A: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the browser. Restart the dev server after changing `.env.local`.

**Q: Can I use this for commercial purposes?**  
A: Check Edamam's terms of service for commercial usage requirements. You may need a paid plan.

**Q: How do I change the theme?**  
A: Edit `index.html` and replace the Bootswatch theme URL. Browse themes at [bootswatch.com](https://bootswatch.com/).

---

**Made with ❤️ using React + Vite**
