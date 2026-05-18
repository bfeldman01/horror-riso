Generative Horror-Comedy Risograph Poster Generator
Creative Coding Final Project Documentation
Project Overview
For my final project, I created a fully generative horror-comedy zine/poster generator using p5.js and the p5.riso library. The goal of the project was to digitally recreate the visual characteristics of risograph printing while combining them with the aesthetics of horror-comedy films, punk zines, tabloid printing, and scrapbook collage design.

The project generates a different poster composition every time the sketch runs. Each poster pulls from different movie-inspired visual systems, randomized typography, procedural textures, and simulated print imperfections.

The three primary inspirations for the system were:
• Jennifer's Body
• Ready or Not
• The Menu

The final project recreates several recognizable risograph characteristics:
• misregistration
• layered transparent inks
• halftone textures
• grain
• uneven print alignment
• photocopy artifacts
• damaged print aesthetics
Step 1: Setting Up the p5.riso Environment
The first stage of the project focused on building a working p5.riso setup and testing whether risograph layers could be rendered correctly inside p5.js.

What I Implemented
• created a new p5.js sketch
• imported the p5.riso library into index.html
• created a portrait-oriented canvas
• added paper-inspired background colors
• created fluorescent pink, blue, yellow, and black risograph layers
• tested rendering using basic geometric forms

Concepts Used
• variables
• functions
• setup()
• canvas rendering
• external library integration

Problems

The first major problem was getting the p5.riso library to load correctly. Initially, the browser interpreted Riso() as an undefined function, causing the entire sketch to fail.

This led to several attempts to fix the import system:
• adjusting library paths
• changing namespace syntax
• testing browser editors
• moving the project into VSCode locally

The project became significantly more stable after switching to a local environment rather than browser-based editors.
Step 2: Building Layered Ink Systems and Misregistration
Once the environment was functioning, the next step was recreating one of the most recognizable features of risograph printing: imperfect layer alignment, also called misregistration.

What I Implemented
• created separate ink layers
• rendered compositions on multiple layers
• added positional offsets between layers
• randomized alignment differences
• used transparency to simulate overlapping ink

Problems

The biggest challenge during this stage was balancing readability and visual distortion. Large offsets looked visually interesting but sometimes made the poster impossible to read.

To solve this, each movie mode eventually received different offset settings:
• Jennifer’s Body used the strongest offsets
• Ready or Not stayed more vertically controlled
• The Menu used cleaner alignment
Step 3: Procedural Texture Systems
After building the layered print system, the next step focused on recreating the texture and grain associated with risograph printing, photocopies, and low-cost zines.

What I Implemented

Created:
• createHalftoneTexture(layer)
• createGrain(layer, amount)

The halftone system uses nested loops to create procedural dot patterns across the page. Grain systems use randomized circles and transparency to simulate ink texture and paper noise.

Problems

The earliest versions of the halftone textures looked too mathematically perfect. The posters still felt digital instead of physically printed.

This was fixed by:
• randomizing dot sizes
• spacing patterns unevenly
• adding additional grain systems
• lowering opacity values
Step 4: Procedural Movie Modes
At this stage, the project shifted from generating one static poster style into a full generative system inspired by multiple horror-comedy films.

What I Implemented

Created three separate procedural movie modes:
• Jennifer’s Body
• Ready or Not
• The Menu

Jennifer’s Body Mode focused on scrapbook aesthetics, handwritten details, tape textures, and chaotic layouts.

Ready or Not Mode focused on gothic horror framing, candles, knives, and blood textures.

The Menu Mode focused on editorial restaurant layouts, restrained typography, and fine dining-inspired composition.

Problems

Initially, the movie modes still looked too visually similar despite having different titles.

This was fixed by heavily separating:
• composition
• typography
• texture density
• decorative systems
• layer behavior
Step 5: Typography and Poster Layout Systems
Typography became one of the largest parts of the project because the posters needed to resemble vintage horror posters and DIY zines rather than generic digital graphics.

What I Implemented
• procedural title generation
• randomized taglines
• permanent movie titles
• separate fonts for each movie mode
• rotated text layouts
• editorial alignment systems
• text backing patches for readability

Problems

As more texture systems were added, the smaller text became increasingly difficult to read.

This was fixed by:
• increasing font sizes
• repositioning taglines
• adding translucent text backing layers
• simplifying some layouts
Step 6: Simulating Physical Print Imperfections
The next step focused on making the posters feel physically printed instead of digitally generated.

What I Implemented
• registration marks
• scan lines
• print smudges
• broken borders
• tape textures
• blood streaks
• handwritten notes
• uneven line systems

Problems

At one point the compositions became visually overcrowded because every effect competed equally for attention.

This was solved by reducing effects selectively:
• The Menu became cleaner and more restrained
• Ready or Not emphasized vertical horror imagery
• Jennifer’s Body kept the heaviest layering and collage energy
Final System Behavior
Every time the sketch runs, the system generates:
• a random movie mode
• randomized titles
• randomized taglines
• randomized layouts
• randomized textures
• randomized decorative elements
• randomized print imperfections

The final result behaves more like a procedural poster-printing system than a single illustration.
Technical Concepts Used
The final project combines procedural design systems with layered digital print simulation techniques. The sketch uses randomized generation systems to create new poster layouts each time the program runs while still maintaining recognizable visual identities for each movie mode.

Additional technical techniques included:
• risograph layer rendering
• simulated print misregistration
• procedural texture generation
• layered opacity systems
• dynamic typography layouts
• generative composition systems
• randomized visual hierarchy
• print artifact simulation
• custom symbol drawing functions
• multi-layer rendering workflows
Final Reflection
One of the biggest goals of the project was avoiding the visual perfection usually associated with digital design. Most of the development process involved intentionally introducing imperfections back into the system so the posters would feel printed, damaged, photocopied, or handmade.

The project also became a way to combine:
• creative coding
• horror-comedy film research
• zine aesthetics
• generative design
• print culture
• procedural art systems

Instead of creating one finished poster, the final project became a system capable of producing endless variations while still maintaining recognizable visual identities for each movie mode
My biggest challenge was the fact that about halfway through the process, my computer crashed and while I was able to recover the code, most of the screenshots and video recordings were not saved to my cloud in time.
