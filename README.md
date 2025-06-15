# 🎨 Nakul Maniar - Game Art Portfolio

<div align="center">

![Portfolio Banner](assets/images/artist.webp)

**A stunning, interactive portfolio showcasing game art mastery**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-portfolio-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/your-username/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nakul-maniar-5952201ab)

</div>

---

## 🚀 About This Portfolio

Welcome to the digital realm of **Nakul Maniar** - where creativity meets technology! This portfolio showcases 2.5+ years of game art mastery, featuring work from popular titles like *Indian Cooking Star* and *Merge Fever*. 

Built with cutting-edge web technologies, this portfolio offers an immersive experience that reflects the same attention to detail found in professional game development.

## ✨ Features

### 🎯 **Interactive Design**
- **Custom Cursor Effects** - Dynamic cursor that responds to different elements
- **Particle Animations** - Canvas-based particle systems for visual appeal
- **3D Hover Effects** - Portfolio items with realistic 3D transformations
- **Smooth Scrolling** - Seamless navigation between sections

### 🎨 **Portfolio Showcase**
- **Smart Filtering** - Categorize work by type (Characters, Backgrounds, Concepts, etc.)
- **Modal Gallery** - Full-screen image viewing with navigation
- **Responsive Grid** - Adaptive layout for all screen sizes
- **Lazy Loading** - Optimized image loading for better performance

### 🛠️ **Technical Excellence**
- **GSAP Animations** - Professional-grade animations and transitions
- **Optimized Performance** - Debounced events and efficient rendering
- **Mobile Responsive** - Perfect experience across all devices
- **Modern CSS** - Advanced styling with CSS Grid and Flexbox

## 🛠️ Tech Stack

<div align="center">

| Frontend | Animation | Design | Tools |
|----------|-----------|---------|-------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white) | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | ![Photoshop](https://img.shields.io/badge/Photoshop-31A8FF?style=flat&logo=adobe-photoshop&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | ![Canvas](https://img.shields.io/badge/Canvas-FF6B6B?style=flat&logo=canvas&logoColor=white) | ![Procreate](https://img.shields.io/badge/Procreate-FF6B35?style=flat&logo=procreate&logoColor=white) | ![AI](https://img.shields.io/badge/AI_Tools-00D2FF?style=flat&logo=artificial-intelligence&logoColor=white) |

</div>

## 📁 Project Structure

```
nakulCustomPortfolio/
├── 📄 index.html              # Main HTML file
├── 📁 css/
│   └── 📄 style.css           # Main stylesheet with responsive design
├── 📁 js/
│   ├── 📄 main.js             # Core functionality and initialization
│   ├── 📄 portfolio.js        # Portfolio gallery and filtering
│   ├── 📄 cursor.js           # Custom cursor effects
│   └── 📄 animations.js       # GSAP animations and scroll effects
├── 📁 assets/
│   ├── 📁 images/             # Profile and UI images
│   └── 📁 portfolio/          # Portfolio artwork
│       ├── 📁 thumbnails/     # Optimized thumbnails
│       └── 📄 [artworks]      # Full-size portfolio pieces
└── 📄 README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nakul-portfolio.git
   cd nakul-portfolio
   ```

2. **Option A: Simple File Opening**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Option B: Local Server (Recommended)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using Live Server (VS Code Extension)
   # Right-click index.html → "Open with Live Server"
   ```

4. **Visit the portfolio**
   ```
   http://localhost:8000
   ```

## 🎯 Key Sections

### 🏠 **Hero Section**
- Animated canvas background with floating particles
- Glitch text effects and typewriter animation
- Interactive artist image with 3D effects

### 👨‍🎨 **About Section**
- Professional background and skills
- Animated skill bars with percentage indicators
- Tools and software proficiency

### 💼 **Experience Timeline**
- Interactive timeline with hover effects
- Professional journey and achievements
- Company details and project highlights

### 🎨 **Portfolio Gallery**
- **9 Categories**: Characters, Backgrounds, Concepts, Icons, Animals, Meta, Food, Gen AI
- **33+ Artworks**: High-quality game assets and concept art
- **Smart Filtering**: Instant category switching
- **Modal Viewer**: Full-screen gallery with navigation

### 📧 **Contact Form**
- Animated input fields
- Direct email integration
- Social media links

## 🎨 Portfolio Categories

| Category | Description | Count |
|----------|-------------|-------|
| 🦸 **Characters** | Original character designs and portraits | 4 |
| 🏞️ **Backgrounds** | Game environments and loading screens | 6 |
| 💡 **Concepts** | Environmental and asset concepts | 3 |
| 🎯 **Icons** | Game icons and UI elements | 3 |
| 🐾 **Animals** | Creature designs and life stages | 3 |
| 🌱 **Meta** | Growth cycles and interactive elements | 4 |
| 🍕 **Food** | Culinary illustrations for cooking games | 3 |
| 🤖 **Gen AI** | AI-assisted artwork and concepts | 7 |

## 🔧 Customization

### Adding New Portfolio Items

1. **Add images to the assets folder**
   ```
   assets/portfolio/your-artwork.webp
   assets/portfolio/thumbnails/your-artwork.webp
   ```

2. **Update the portfolio data in `js/portfolio.js`**
   ```javascript
   {
     id: 34,
     title: "Your Artwork Title",
     description: "Detailed description of your artwork...",
     category: "characters", // or any existing category
     thumbnail: "assets/portfolio/thumbnails/your-artwork.webp",
     image: "assets/portfolio/your-artwork.webp",
   }
   ```

### Customizing Colors

Update the CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #6c5ce7;    /* Purple */
  --secondary-color: #fd79a8;   /* Pink */
  --accent-color: #00b894;      /* Teal */
  --dark-color: #2d3436;        /* Dark Gray */
  --light-color: #f5f6fa;       /* Light Gray */
}
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- 🖥️ **Desktop** (1200px+)
- 💻 **Laptop** (1024px - 1199px)
- 📱 **Tablet** (768px - 1023px)
- 📱 **Mobile** (320px - 767px)

## ⚡ Performance Features

- **Lazy Loading**: Images load only when needed
- **Debounced Events**: Smooth scrolling and resizing
- **Optimized Animations**: 60fps animations with GSAP
- **Image Compression**: WebP format for faster loading
- **Efficient Rendering**: RequestAnimationFrame for smooth effects

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design & Art**: [Nakul Maniar](https://www.linkedin.com/in/nakul-maniar-5952201ab) - Game Artist & Concept Artist
- **Development**: [Nimesh Kadecha](https://www.linkedin.com/in/nimesh-kadecha/) - Frontend Developer
- **Animation Library**: [GSAP](https://greensock.com/gsap/) for smooth animations
- **Icons**: [Font Awesome](https://fontawesome.com/) for beautiful icons

---

<div align="center">

### 🌟 **Star this repo if you found it helpful!** 🌟

**Made with ❤️ by Nakul Maniar & Nimesh Kadecha**

[🌐 Live Demo](https://nimeshkadecha.github.io/Nakul_Maniar_portfolio/) • [📧 Contact](mailto:iamnakulmaniar@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/nakul-maniar-5952201ab)

</div>