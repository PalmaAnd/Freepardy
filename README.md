# Freepardy

![License](https://img.shields.io/github/license/PalmaAnd/freepardy)
![Version](https://img.shields.io/github/package-json/v/PalmaAnd/freepardy)
![Issues](https://img.shields.io/github/issues/PalmaAnd/freepardy)
![Pull Requests](https://img.shields.io/github/issues-pr/PalmaAnd/freepardy)
![Last Commit](https://img.shields.io/github/last-commit/PalmaAnd/freepardy)
![Contributors](https://img.shields.io/github/contributors/PalmaAnd/freepardy)
![Deploy](https://img.shields.io/github/deployments/PalmaAnd/freepardy/github-pages)

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
-   Accessible UI components (Radix UI)

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

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

Please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to help us keep this project open and welcoming.

## Security

If you discover a security vulnerability, please see [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

## Acknowledgments

-   Inspired by the Jeopardy! TV game show
-   Built with Next.js, Tailwind CSS, and Radix UI

## Useful Open Source Files

-   [CONTRIBUTING.md](CONTRIBUTING.md): Guidelines for contributing to this project.
-   [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): Code of conduct for participants.
-   [LICENSE](LICENSE): Project license.
