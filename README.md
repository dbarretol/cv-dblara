Perfecto, vamos paso a paso para que tu proyecto React + Vite se despliegue en GitHub Pages con la ruta **https://dbarretol.github.io/cv-dblara**.  

---

## 🚀 Guía paso a paso

### 1. Prepara tu repositorio
- Asegúrate de que tu proyecto esté en un repositorio en GitHub llamado **`cv-dblara`** (el nombre debe coincidir con la URL que quieres).
- Haz `git init` si aún no lo has inicializado y sube el código con:
  ```bash
  git remote add origin https://github.com/dbarretol/cv-dblara.git
  git branch -M main
  git push -u origin main
  ```

---

### 2. Instala la dependencia `gh-pages`
En tu proyecto, instala el paquete que se encargará de publicar el contenido en la rama `gh-pages`:

```bash
npm install gh-pages --save-dev
```

---

### 3. Configura `vite.config.js`
Agrega la propiedad `base` con el nombre de tu repositorio:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/cv-dblara/",   // 👈 importante para GitHub Pages
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

---

### 4. Ajusta tu `package.json`
Agrega los scripts de despliegue:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

### 5. Despliega tu proyecto
Ejecuta:

```bash
npm run deploy
```

Esto creará la rama `gh-pages` en tu repo y subirá el contenido de `dist`.

---

### 6. Configura GitHub Pages
- Ve a tu repositorio en GitHub → **Settings** → **Pages**.  
- En **Branch**, selecciona `gh-pages` y guarda.  
- En unos minutos tu sitio estará disponible en:  
  👉 **https://dbarretol.github.io/cv-dblara**

---

## 🔄 Actualizar tu sitio
Cada vez que hagas cambios, solo necesitas correr:

```bash
npm run deploy
```

---

¿Quieres que te prepare un checklist rápido para que no olvides ningún paso la próxima vez que despliegues?
