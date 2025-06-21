# My Crypto Wallet App

## Description

This project is a web-based application designed to function as a cryptocurrency wallet. It allows users to manage addresses, view market data, track transactions, and receive notifications. The project utilizes modern web development practices and a component-based architecture.

## Technologies Used

* **Next.js:** React framework for server-side rendering and static site generation.
* **TypeScript:** Typed superset of JavaScript for enhanced code quality and maintainability.
* **Tailwind CSS:** Utility-first CSS framework for rapid styling.
* **React:** JavaScript library for building user interfaces.
* **Shadcn UI:** UI component library built with Tailwind CSS.
* **GenKit:** AI toolkit (based on the presence of `src/ai` files).
* **Nix:** Package manager and build system (based on `.idx/dev.nix`).
* **Various React Hooks:** Custom hooks for common functionalities.
* **Utilities and Constants:** Helper functions and predefined values for application logic.

## Setup Instructions

1. **Clone the repository:**
```
bash
   git clone <repository_url>
   cd <repository_directory>
   
```
2. **Install dependencies:**
```
bash
   npm install
   
```
or
```
bash
   yarn install
   
```
or
```
bash
   pnpm install
   
```
3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add any necessary environment variables (e.g., API keys for market data or AI services).

## How to Run the Project

1. **Start the development server:**
```
bash
   npm run dev
   
```
or
```
bash
   yarn dev
   
```
or
```
bash
   pnpm dev
   
```
2. **Open the application:**

   The application should now be running at `http://localhost:3000` (or the port specified in your environment configuration).

## Project Structure Overview

* **`.idx/`:** Contains Nix configuration files.
* **`.vscode/`:** Contains VS Code editor settings.
* **`docs/`:** Documentation files (e.g., blueprint).
* **`public/`:** Static assets like images and manifest files.
* **`src/ai/`:** AI-related code, potentially using GenKit.
* **`src/app/`:** Next.js application routes and core files.
* **`src/components/`:** Reusable React components, including UI components from Shadcn UI.
* **`src/hooks/`:** Custom React hooks.
* **`src/lib/`:** Utility functions, constants, and type definitions.

## Contributing

(Add information on how to contribute if applicable)

## License

(Add license information if applicable)