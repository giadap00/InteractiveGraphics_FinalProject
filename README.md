
# Deep Seabed - Interactive 3D WebGL Scene

<div align="center">
  <img src="https://github.com/user-attachments/assets/09f130bc-06b0-464f-8cc4-43e697a2dcc2" width="700" alt="Deep Seabed Preview">
</div>

## 📖 Overview
Deep Seabed is an interactive 3D graphics project built entirely from scratch using native **WebGL** and vanilla **JavaScript**. This project immerses the user in a deep underwater environment featuring a central stone portal, detailed craggy rock formations, and a sandy seabed. The scene is brought to life by dynamically generated jellyfish and rising bubbles that float upwards in a continuous, mesmerizing flow. 

The main goal of this project was to understand the core concepts of 3D computer graphics, custom shader programming, mathematical transformations, and interactive web rendering using strictly native WebGL, without relying on any external 3D libraries or engines.

## ✨ Key Features
* **Mathematical Helical Animations:** The floating movement of both the jellyfish and the bubbles is 
calculated using trigonometric functions to create a smooth, continuous helical trajectory (a spiral-like upward movement), mimicking natural underwater physics.
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
  <img src="INCOLLA_QUI_IL_LINK_DELLA_FOTO_1" width="45%">
  &nbsp; &nbsp;
  <img src="INCOLLA_QUI_IL_LINK_DELLA_FOTO_2" width="45%">
  <br>
  <i>Scene with Fog</i> 
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
  <i>Lighting adjustments</i>
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
