# Freepardy

A free, customizable Jeopardy-style quiz game built with Next.js and Tailwind CSS.

## Features

-   Create and edit categories and questions
-   Import/export game data as JSON
-   Final Jeopardy round with wagering
-   Team scoring system
-   Timer functionality
-   Mobile-responsive design
-   Offline support with PWA capabilities
-   Share game configurations via URL
-   Multilingual rules (English and German)

## Getting Started

### Prerequisites

-   Node.js 18 or later
-   npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PalmaAnd/freepardy.git
    cd freepardy
    ```

2. Install dependencies and run the development server:

    ```bash
    npm install
    npm run dev
    ```

    or

    ```bash
    yarn install
    yarn dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. Push your code to the main branch of your GitHub repository.
2. GitHub Actions will automatically build and deploy your site.
3. Your site will be available at `https://yourusername.github.io/freepardy`.

## Customization

### Game Data

You can customize the game by:

-   Using the Admin Panel to create categories and questions
-   Importing a JSON file with your game data
-   Sharing a game configuration via URL

### Styling

The game uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.ts`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Inspired by the Jeopardy! TV game show
-   Built with Next.js and Tailwind CSS
