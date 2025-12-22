````markdown name=README.md
# My Portfolio — Deploy to GitHub Pages

Simple, step-by-step guide to publish this site to GitHub Pages.
This guide is for the repository owner: Mohamad-Moukaddem

Important: The repository must contain these two files in the repository root:
- `index.html`
- `styles.css`

If both files are in the repository root, GitHub Pages will serve your site.

---

## 1) Create a new local folder and add the files

Open your terminal (macOS / Linux) or Git Bash / PowerShell (Windows).  
Run these commands to create a folder and move into it:

```bash
mkdir my-portfolio
cd my-portfolio
```

Now copy or create the two files `index.html` and `styles.css` inside this folder.  
(You can paste the files using your code editor or copy them from where you saved them.)

---

## 2) Initialize Git, add files, and make the first commit

Run these commands (these work on macOS, Linux, Windows Git Bash and PowerShell):

```bash
# Initialize a new git repository
git init

# Add the two required files to staging
git add index.html styles.css

# Create the first commit
git commit -m "Initial commit: Add index.html and styles.css"
```

---

## 3) Set the main branch name

Set the branch name to `main` (recommended):

```bash
git branch -M main
```

---

## 4) Create a GitHub repository (on github.com)

1. Go to https://github.com and sign in.
2. Click the "+" menu → "New repository".
3. Repository name: `my-portfolio` (or choose another).
4. Description (optional).
5. Set repository to **Public**.
6. Do NOT initialize with a README (optional but recommended to avoid merge issues if you already committed locally).
7. Click "Create repository".

After creating the repo, GitHub will show you the remote URL. Use it in the next step.

---

## 5) Add the remote and push your code to GitHub

Replace `YOUR-REPO-URL` with the URL shown by GitHub. For your username and the recommended repo name the URL typically looks like:

```
https://github.com/Mohamad-Moukaddem/my-portfolio.git
```

Run:

```bash
# Add the GitHub remote (replace the URL if different)
git remote add origin https://github.com/Mohamad-Moukaddem/my-portfolio.git

# Push your main branch to GitHub and set upstream
git push -u origin main
```

Now your files are on GitHub.

---

## 6) Enable GitHub Pages (on GitHub website)

1. Open your repository page on GitHub:  
   https://github.com/Mohamad-Moukaddem/my-portfolio
2. Click "Settings".
3. In the left sidebar (or the main Settings page) find "Pages" (or search for "Pages").
4. Under "Build and deployment" choose:
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save" (or "Save and deploy").

GitHub will show a banner or section with the site URL (usually):
https://Mohamad-Moukaddem.github.io/my-portfolio/

Wait a minute or two, then open that URL to see your live site.

---

## 7) How to update your site later (edit and push)

Whenever you want to change content or styles:

1. Edit `index.html` or `styles.css` in your local folder.
2. Save your changes.
3. Run these commands:

```bash
# Stage your changes
git add index.html styles.css
# Or to add all changed files:
# git add .

# Commit with a helpful message
git commit -m "Update: describe what you changed"

# Push changes to GitHub
git push
```

GitHub Pages will automatically redeploy your site (usually within a minute).

---

## Quick checklist

- [ ] Repository on GitHub: `Mohamad-Moukaddem/my-portfolio`
- [ ] Files in repo root: `index.html`, `styles.css`
- [ ] Pages source: `main` branch, folder `/ (root)`
- [ ] URL: `https://Mohamad-Moukaddem.github.io/my-portfolio/` (after deploy)

---

If you'd like, I can also:
- Create the repository for you (I would need your permission and additional setup).
- Provide a ready-to-copy terminal script that creates the files and pushes them (for advanced use).

That's it — you're ready to publish and update your portfolio.
