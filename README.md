# Deep Seabed - Interactive 3D WebGL Scene



https://github.com/user-attachments/assets/42d47a92-65e9-4bbb-bfdc-0012933c69f7



## 📖 Overview
Deep Seabed is an interactive 3D graphics project built entirely from scratch using native **WebGL** and vanilla **JavaScript**. This project immerses the user in a deep underwater environment featuring a central stone portal, detailed craggy rock formations, and a sandy seabed. The scene is brought to life by dynamically generated jellyfish and rising bubbles that float upwards in a continuous, mesmerizing flow. 

The main goal of this project was to understand the core concepts of 3D computer graphics, custom shader programming, mathematical transformations, and interactive web rendering using strictly native WebGL, without relying on any external 3D libraries or engines.

## ✨ Key Features
* **Mathematical Helical Animations:** The floating movement of both the jellyfish and the bubbles is calculated using trigonometric functions to create a smooth, continuous helical trajectory (a spiral-like upward movement), mimicking natural underwater physics.
* **Custom 3D Engine:** Built a lightweight 3D rendering pipeline from scratch to handle matrices, camera projections, and model-view transformations.
* **Custom OBJ Loader:** Implemented a parser to read and load `.obj` files directly, handling vertex positions, texture coordinates, and normals.
* **Interactive UI Controls:** A custom user interface allows real-time manipulation of the scene:
    * Add or remove jellyfish dynamically.
    * Control animation speed for the helical movement of jellyfish and bubbles.
    * Adjust global ambient lighting and directional light parameters.
    * Tweak volumetric fog (color, opacity, and amount).
* **Custom Shaders (GLSL):** Implemented vertex and fragment shaders to handle texturing, Phong lighting (ambient, diffuse, specular), and depth-based fog blending.
* **Camera Controls:** Interactive mouse controls to rotate the scene and mouse-wheel zoom functionality.

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/32eb0024-f60e-4587-95f7-5848ce56e9a1"
 width="45%" alt="Scene with Fog">
  <img src="https://github.com/user-attachments/assets/ccaf91e6-c74b-40c0-8896-a33f9791444c"
width="45%" alt="Lighting adjustments">
</p>

## 🛠️ Technologies Used
* **HTML5 Canvas**
* **CSS3**
* **JavaScript (Vanilla / ES6)**
* **WebGL (GLSL Shaders)**

## 🚀 How to Run Locally

Due to browser security restrictions regarding CORS (Cross-Origin Resource Sharing) when loading local files, you need to serve the HTML file through a local web server.

**Using Python:**
1. Open your terminal and navigate to the project directory.
2. Run `python -m http.server`
3. Open your browser and go to `http://localhost:8000`.

## 👤 Author
**Giada Piacentini**
