Recipe Parser

This Recipe Parser is a web application that extracts structured information from recipe text input. Using a combination of regular expressions and parse trees, it identifies ingredients, quantities, cooking times, servings, and instructions, transforming unstructured recipes into JSON format. This project demonstrates parsing techniques, frontend UI with Bootstrap, and asynchronous client-server communication with Node.js and Express.
Features:

    Ingredient Parsing: Extracts quantities, units, and descriptors (like "sifted" or "chopped") from each ingredient.
    Metadata Extraction: Captures prep time, cook time, and servings if available.
    Instructions Parsing: Breaks down recipe steps into an organized list.
    Frontend with Bootstrap: User-friendly interface for entering recipes and viewing parsed output.
    API Endpoint: A RESTful /parse endpoint to process and parse recipe data.
