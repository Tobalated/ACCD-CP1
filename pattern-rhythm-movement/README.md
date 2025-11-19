# Pattern, Rhythm, and Movement — p5.js Composition  
*by Oloruntoba Oni*

This project explores pattern-making, rhythm, color variation, and complex movement using p5.js.  
The final visual is a dynamic grid where each tile reacts to time, noise, and spatial position, creating a rhythmic composition that shifts in color, form, and motion.

---

## Project Overview  
The goal was to:

- Create a visual pattern that fills the entire window  
- Use **HSB color mode**  
- Use **loops** to generate variations and tiling  
- Show **symmetry / structure** across the grid  
- Add **rhythmic animation**  
- Add **non-linear movement** using noise + sine waves  
- Document the process (problems + solutions)  
- Reflect on one key problem  

This sketch uses a grid of oscillating rounded rectangles, each animated by noise-driven wobble, radial symmetry, and continuously shifting HSB color dynamics.

---

## Process: Problems & Solutions

### **1. Getting the grid to feel rhythmic, not random**  
**Problem:**  
My early sketches looked either too chaotic or too stiff. Even though I had a grid, the motion didn’t feel cohesive.

**Solution:**  
I used normalized coordinates (`u`, `v`) centered around (0,0) and calculated radial distance (`distCenter`) and angle (`atan2`). These gave the composition a strong underlying structure that unified all motion.

---

### **2. Balancing symmetry with variation**  
**Problem:**  
When everything was symmetrical, the pattern looked predictable. When I added randomness, the structure broke completely.

**Solution:**  
I used symmetry in the spatial math (angle + distance), and variation in motion (layered noise + sine waves). This preserved structure while keeping animation lively.

---

### **3. Creating non-linear movement without jitter**  
**Problem:**  
Using `random()` made the tiles shake and jitter, which was visually unpleasant and technically not rhythmic.

**Solution:**  
I replaced randomness with **Perlin noise** and oscillating trigonometric functions. These produce smooth, wave-like movement that remains complex without becoming chaotic.

---

### **4. Controlling HSB colors (too bright or too dull)**  
**Problem:**  
HSB made it easy to produce overly saturated neon colors that overwhelmed the visuals.

**Solution:**  
I mapped saturation to `distCenter` and brightness to the `wave` value, giving the composition a calm center with stronger accents toward the outer rings.

---

### **5. Keeping the entire canvas active**  
**Problem:**  
Some early tests concentrated all motion in the center while the edges felt boring.

**Solution:**  
I made the wave function depend on distance:  
`sin(distCenter * 10 - t * 4 + noise)`  
This sends ripples across the entire window so no part feels static.

---

##  Reflection: Most Interesting Problem (2 Paragraphs)

One of the most interesting challenges was designing motion that felt complex and non-linear without becoming chaotic. At first, I used `random()` to drive the variation in movement. This technically introduced change, but the visual outcome was jittery and uncomfortable. Tiles snapped unpredictably each frame, and the piece lacked rhythm. When I tried stacking multiple sine waves to fix that, the motion became too busy—everything oscillated in different, conflicting directions, and the pattern lost coherence.

The breakthrough came when I combined **noise()** with a few carefully tuned sine and cosine waves. Noise introduced smooth, organic variation, while trigonometric waves provided rhythmic consistency. Anchoring everything to radial coordinates (`distCenter` and `angle`) allowed each tile to have a unique motion path but still feel like part of a unified system. This hybrid approach created the breathing, flowing movement the composition needed.

---

##  Running the Sketch

Open `index.html` in a browser  
or  
view the live hosted version:

(https://tobalated.github.io/ACCD-CP1/pattern-rhythm-movement/)*

---

## 📁 File Structure

