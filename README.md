# 🚀 Obsidian-Mint Developer Portfolio

A premium, high-performance, and visually stunning single-page developer portfolio designed specifically for **GitHub Pages**. Featuring a modern dark-obsidian and cyber-mint aesthetic, custom scroll reveals, custom vector graphics, and an interactive terminal interface.

🌐 **Live URL:** [https://anujithpp.github.io/](https://anujithpp.github.io/)

---

## 🎨 Visual System & Branding

*   **Obsidian-Mint Dark Theme:** Built with a premium deep-space background (`#0b0f17`), glassmorphic panels (`#131b26`), and a dynamic combination of neon mint-emerald (`#10b981`) and cyber-cyan (`#00f0ff`) glows.
*   **Typography:** Optimized loading using `Plus Jakarta Sans` for clean, high-contrast structural typography, paired with `Fira Code` for tech-centric tag elements and terminal panels.
*   **Vector Performance:** Utilizes strictly inline custom SVG graphics for all components and skill icons. This guarantees **zero Cumulative Layout Shift (CLS)** and removes bulky external image or icon font package overheads.

---

## 🛠️ Key Architectural Features

1.  **Interactive Terminal Emulator:** Placed in the Hero section, displaying standard environment outputs, passions config, and active uptime statistics mimicking local system systemd logs.
2.  **Dynamic Tagline Typewriter:** Performant technical subtitle rotator highlighting academic credentials, specialties, and open-source passions.
3.  **Categorized Skills Matrix:** 26 technical competencies neatly divided into 6 strategic divisions (*Languages, AI & ML, Backend & Messaging, Databases, Frontend, and Tools & DevOps*) featuring custom SVG tags.
4.  **Premium Projects Grid:** Dynamic layout displaying active public repositories alongside private source files—complete with real-time pulsing "In Progress" badge indicators and visual source lock states.
5.  **Interactive Academic Timeline:** Clean vertical timeline showcasing the **CUSAT Five Year Integrated M.Sc. in Computer Science (Artificial Intelligence and Data Science)** program, semesters, and degree exit rules.
6.  **Seamless Contact Portal:** A one-tap email copying card (`anujithpp@protonmail.com`) powered by clipboard event state managers, offering instant visual feedback.
7.  **Sleek Navigation Header:** Sticky backdrop navigation header with filter blur boundaries and a gradient scroll-progress timeline tracking viewport depth.
8.  **SEO & Favicon Ready:** Custom custom glowing SVG data URI favicon and full Open Graph (`og:`) metadata tagging for rich, highly visible sharing previews across WhatsApp, Discord, Slack, and LinkedIn.

---

## 📂 File Architecture

```text
├── index.html   # Structural landmarks, SEO configurations, inline SVG icons
├── style.css    # Obsidian-Mint tokens, keyframe animations, grid frameworks
├── script.js    # Typewriter animation, scroll reveal observers, nav active sync, clipboard copy
└── resume.pdf   # Hosted curriculum vitae PDF (opens in new tab)
```

---

## 💻 Local Preview & Development

Because this portfolio is engineered strictly with static vanilla languages, **zero compilation steps** or bulky `npm` dependencies are required. 

You can preview the page locally by simply double-clicking `index.html` in your file browser. For testing responsive dynamics and scroll animations accurately, we recommend launching Python's lightweight local server from your repository directory:

```powershell
# Launch Python's built-in HTTP server
python -m http.server 8000
```

Once running, navigate to [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🚀 Deployment to GitHub Pages

Deploying updates to your live site at `anujithpp.github.io` is fast and seamless:

1.  **Add and commit your changes:**
    ```powershell
    git add index.html style.css script.js resume.pdf README.md
    git commit -m "feat: complete initial release of obsidian-mint developer portfolio"
    ```
2.  **Push to the remote repository:**
    ```powershell
    git push origin main
    ```
3.  **Automatic Build:** GitHub Actions / Pages will automatically detect your push to the `main` branch, build, and publish the update live within a minute!