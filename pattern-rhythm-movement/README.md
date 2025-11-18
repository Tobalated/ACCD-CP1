# Rhythmic HSB Pattern (p5.js)

This project uses tiling, HSB color mode, symmetry, loops, and non-linear animation to create a rhythmic, evolving visual composition in p5.js.

---

## 🎨 Process: Problems & Solutions

1. **Making the grid feel rhythmic, not random**
   - **Problem:** My early versions were too random or too stiff.
   - **Solution:** I used a structured grid with radial coordinates (`distCenter`, `angle`) to keep rhythm while allowing variation.

2. **Balancing symmetry and variation**
   - **Problem:** Perfect symmetry looked boring; randomness broke the structure.
   - **Solution:** I mixed symmetrical math with `noise()` and time-based modulation.

3. **Creating non-linear motion without jitter**
   - **Problem:** Using `random()` created jitter.
   - **Solution:** Replaced random with smooth `noise()` and layered sine/cosine waves.

4. **Controlling HSB colors**
   - **Problem:** The colors became too neon and overwhelming.
   - **Solution:** Saturation and brightness vary with distance and wave motion.

5. **Keeping the entire window visually active**
   - **Problem:** Edges felt dead in earlier versions.
   - **Solution:** Made waves radiate from the center using `sin(distCenter * 10 - t * 4)`.

---

## ✨ Reflection: Most Interesting Problem

One of the most engaging challenges was designing the movement so it felt complex and non-linear while remaining readable and rhythmic. My early attempts used `random()` for variation, but this produced jittery, uncomfortable motion. It didn’t feel like part of a composition — it felt like noise. When I stacked many sine waves, the motion became overly chaotic and visually overwhelming. I needed something that had personality and complexity but still flowed in a coordinated way.

The solution was combining `noise()` with time-based sine and cosine functions, and anchoring everything to radial coordinates (`distCenter`, `angle`). Noise adds organic variation, while the trigonometric waves provide rhythm. Using position-dependent wobbling created unique tile motions, but because all tiles share the same global time variable `t`, the pattern still breathes together. This approach resulted in a dynamic composition that feels alive, coherent, and visually engaging.

---

## ▶️ Running the Sketch

Open `index.html` in a browser, or host it on GitHub Pages.

---

## 📁 File Structure

