# Proyecto: ChessMaster 🎯♟️  

**ChessMaster** es una aplicación web desarrollada con **React** y **TypeScript**, diseñada para ofrecer una interfaz moderna y responsiva para jugar y analizar partidas de ajedrez. Utilizamos **TailwindCSS** para los estilos y un enfoque modular basado en **React Components**.

🚀 **¡Ya puedes probar la aplicación en producción!**  
👉 [ChessMaster360 en Producción](https://chessmaster360.netlify.app)

---

## 🎯 **¿Qué puedes hacer con ChessMaster?**  
- Jugar partidas en un **tablero de ajedrez interactivo**.  
- Analizar movimientos con soporte para archivos **PGN** (Portable Game Notation).  
- Personalizar configuraciones de juego y recibir reportes detallados de las partidas.  

El diseño está optimizado para **dispositivos móviles** y **escritorios**, asegurando una experiencia responsiva en cualquier plataforma.

---

## Requisitos Previos ✅  

Antes de comenzar con el desarrollo local, asegúrate de contar con lo siguiente:  
- **Node.js** (v16 o superior).  
  👉 [Descargar Node.js](https://nodejs.org/)  
- **npm** o **yarn** (v7 o superior).  
  - **npm** viene preinstalado con Node.js, pero también puedes instalar **yarn**.
- **Git** para clonar el repositorio.  
  👉 [Descargar Git](https://git-scm.com/)

---

## 🔧 **Configuración del Proyecto**

Sigue estos pasos para clonar el repositorio e iniciar el entorno de desarrollo:

### 1️⃣ Clonar el Repositorio  
Abre una terminal y ejecuta el siguiente comando:  
```bash
git clone https://github.com/usuario/chessmaster.git
```

### 2️⃣ Navegar al Directorio del Proyecto  
Accede al directorio clonado:  
```bash
cd chessmaster
```

### 3️⃣ Instalar Dependencias  
Instala las dependencias necesarias utilizando **npm** o **yarn**:  
```bash
npm install
```

### 4️⃣ Configurar TailwindCSS  
El proyecto ya incluye un archivo de configuración de **TailwindCSS** (`tailwind.config.js`) y de **PostCSS** (`postcss.config.js`). No necesitas realizar configuraciones adicionales, pero puedes personalizarlos si es necesario.

---

## 🚀 **Ejecución del Proyecto**

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo local con:  
```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador y accede a:  
```
http://localhost:5173
```

---

## 📂 **Estructura del Proyecto**  

```plaintext
├── public/                 # Archivos públicos (imágenes, íconos, etc.)
├── src/                    # Código fuente principal
│   ├── components/         # Componentes reutilizables
│   │   ├── Bars/           # Componentes de la barra de navegación
│   │   ├── Chess/          # Componentes relacionados con el ajedrez
│   ├── styles/             # Archivos de estilos globales
│   ├── App.tsx             # Componente principal de la aplicación
│   └── main.tsx            # Punto de entrada del proyecto
├── tailwind.config.js      # Configuración de TailwindCSS
├── postcss.config.js       # Configuración de PostCSS
├── package.json            # Información del proyecto
├── README.md               # Este archivo
└── dist/                   # Archivos generados para producción
```

---

## ✨ **Características Clave**
- **Responsividad**: Funciona perfectamente en móviles y escritorios.  
- **Tablero de ajedrez interactivo** (🚧 próximamente).  
- **Carga y análisis de partidas**: Compatible con archivos PGN.  
- **Estilos modernos**: Gracias a **TailwindCSS**.  

---

## 🌐 **Enlace de Producción**  
Accede a la aplicación en producción desde el siguiente enlace:  
👉 [ChessMaster360 en Producción](https://chessmaster360.netlify.app)

---

## 📜 **Licencia**  
Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.
