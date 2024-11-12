# Recipe Parser

The Recipe Parser is a web application that converts unstructured recipe text into structured JSON format. By identifying key elements such as ingredients, quantities, cooking times, servings, and instructions, this app turns recipes into a data-friendly format, demonstrating parsing techniques, frontend design with Bootstrap, and asynchronous client-server interactions using Node.js and Express.

## Features

    Ingredient Parsing: Extracts quantities, units, and descriptors (like "sifted" or "chopped") from each ingredient.
    Metadata Extraction: Captures prep time, cook time, and servings if available.
    Instructions Parsing: Breaks down recipe steps into a structured list for easy interpretation.
    Frontend with Bootstrap: A clean, responsive interface for inputting recipes and viewing parsed output.
    API Endpoint: A RESTful /parse endpoint that processes and parses recipe data from the frontend.

## Technologies Used

    Node.js and Express for the backend API
    Bootstrap for a polished, responsive frontend UI
    JavaScript for parsing logic, utilizing regular expressions and parse trees
