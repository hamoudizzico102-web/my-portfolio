:root {
    --bg: #01040a;
    --accent: #0066ff;
    --text: #ffffff;
    --font-main: 'Poppins', sans-serif;
    --font-title: 'Syncopate', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: var(--font-main); overflow-x: hidden; }

/* Background Decoration */
.bg-glow { position: fixed; width: 100vw; height: 100vh; background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0, 102, 255, 0.15) 0%, transparent 50%); z-index: -1; pointer-events: none; }

/* Cursor */
.cursor-dot { position: fixed; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; z-index: 10001; pointer-events: none; }
.cursor-outline { position: fixed; width: 40px; height: 40px; border: 1px solid var(--accent); border-radius: 50%; z-index: 10000; pointer-events: none; transition: transform 0.2s ease-out; }

/* Header */
.header { position: fixed; top: 0; width: 100%; padding: 25px 0; z-index: 100; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); }
.header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 40px; }
.brand { display: flex; align-items: center; gap: 15px; text-decoration: none; color: white; font-family: var(--font-title); font-size: 0.9rem; font-weight: 700; }
.profile-pic { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--accent); }
.nav { display: flex; gap: 40px; align-items: center; }
.nav a { text-decoration: none; color: #888; font-size: 0.75rem; font-weight: 700; transition: 0.3s; letter-spacing: 2px; }
.nav a:hover { color: var(--accent); }
.cv-trigger { background: var(--accent); color: white; border: none; padding: 8px 20px; font-weight: 700; font-size: 0.7rem; letter-spacing: 1px; }

/* Hero */
.hero { height: 100vh; display: flex; align-items: center; position: relative; }
.hero-title { font-family: var(--font-title); font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9; font-weight: 700; margin-bottom: 30px; }
.outline-text { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
.hero-sub { max-width: 500px; color: #888; font-size: 1.1rem; margin-bottom: 40px; }
.hero-btns { display: flex; gap: 20px; }
.main-btn { background: var(--accent); color: white; padding: 18px 40px; text-decoration: none; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; }
.sec-btn { border: 1px solid #333; color: white; padding: 18px 40px; text-decoration: none; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; }

/* Grid Creative */
.section { padding: 150px 0; }
.section-label { font-family: var(--font-title); font-size: 0.8rem; color: var(--accent); margin-bottom: 60px; letter-spacing: 5px; }
.grid-creative { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }
.creative-card { position: relative; height: 450px; overflow: hidden; background: #050505; border: 1px solid #111; transition: 0.5s; }
.card-inner { width: 100%; height: 100%; position: relative; }
.card-inner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.8s; }
.creative-card:hover img { opacity: 1; transform: scale(1.05); }
.card-overlay { position: absolute; bottom: 0; left: 0; padding: 40px; background: linear-gradient(to top, black, transparent); width: 100%; }
.card-overlay h3 { font-family: var(--font-title); font-size: 1rem; }
.folder-tag { position: absolute; top: 30px; left: 30px; background: var(--accent); color: white; padding: 5px 15px; font-size: 0.6rem; font-weight: 700; z-index: 2; }

/* Contact Area */
.contact-area { padding: 150px 0; border-top: 1px solid #111; }
.big-contact-title { font-family: var(--font-title); font-size: clamp(2rem, 10vw, 8rem); line-height: 1; text-align: center; margin-bottom: 50px; }
.contact-methods { display: flex; justify-content: center; gap: 50px; }
.contact-methods a { color: var(--accent); text-decoration: none; font-family: var(--font-title); font-size: 1.5rem; transition: 0.3s; }
.contact-methods a:hover { color: white; text-shadow: 0 0 20px var(--accent); }

/* Modals */
.modal-system { position: fixed; inset: 0; z-index: 1000; display: none; align-items: center; justify-content: center; }
.modal-system.active { display: flex; }
.m-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(20px); }
.m-window { position: relative; width: 95%; max-width: 1300px; height: 90vh; background: #000; border: 1px solid #222; overflow: hidden; display: flex; flex-direction: column; }
.m-header { padding: 30px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; }
.m-header h3 { font-family: var(--font-title); font-size: 0.8rem; }
.m-body { padding: 40px; overflow-y: auto; flex: 1; }
.modal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
.vid-box iframe, .insta-box iframe { width: 100%; aspect-ratio: 16/9; border: none; }
.insta-box iframe { aspect-ratio: 9/16; min-height: 500px; }
.img-item img { width: 100%; height: 300px; object-fit: cover; border: 1px solid #222; }

/* Lightbox */
#lightbox img { max-width: 90%; max-height: 90%; border: 2px solid var(--accent); }

@media (max-width: 768px) { .nav { display: none; } .hero-title { font-size: 3.5rem; } }
