# Proyecto: ChessMaster 🎯♟️  

**ChessMaster** es una aplicación de frontend construida con **React** y **TypeScript**, diseñada para ofrecer una interfaz moderna y responsiva para jugar y analizar partidas de ajedrez. Este proyecto utiliza **TailwindCSS** para los estilos y **React Components** organizados por funcionalidad.

## Contexto del Proyecto  
El propósito de este proyecto es crear una plataforma de ajedrez interactiva donde los usuarios puedan:  
1. Ver y jugar partidas en un tablero interactivo.  
2. Analizar movimientos mediante el uso de PGN (Portable Game Notation).  
3. Obtener reportes detallados de las partidas y realizar configuraciones personalizadas.

El diseño del proyecto está optimizado para dispositivos móviles y de escritorio mediante un layout responsivo.

---

## Requisitos Previos ✅

Antes de comenzar, asegúrate de tener instalados los siguientes elementos en tu sistema:  

- **Node.js** (v16 o superior)  
  [Descargar Node.js](https://nodejs.org/)  
- **npm** o **yarn** (v7 o superior).  
  npm se instala automáticamente con Node.js, pero también puedes optar por instalar **yarn**:  
  ```bash
  npm install
  ```  
- **Git** para clonar el repositorio.  
  [Descargar Git](https://git-scm.com/)  

---

## Configuración del Proyecto 🔧

Sigue los pasos a continuación para clonar el repositorio e iniciar el entorno de desarrollo:

### 1. Clonar el Repositorio
Abre tu terminal y ejecuta el siguiente comando para clonar el proyecto:
```bash
git clone https://github.com/usuario/chessmaster.git
```

### 2. Navegar al Directorio del Proyecto
Accede al directorio clonado:
```bash
cd chessmaster
```

### 3. Instalar Dependencias
Instala las dependencias necesarias del proyecto utilizando **npm** o **yarn**:
```bash
npm install
```
O si prefieres usar **yarn**:
```bash
yarn install
```

### 4. Configuración de TailwindCSS
El proyecto utiliza **TailwindCSS** como framework de estilos. El archivo de configuración `tailwind.config.js` ya está listo. Si necesitas personalizarlo, puedes encontrarlo en la raíz del proyecto.

Además, el archivo `postcss.config.js` está configurado para manejar las dependencias de CSS necesarias. No es necesario realizar cambios adicionales.

---

## Ejecución del Proyecto 🚀

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con:
```bash
npm run dev
```
O con **yarn**:
```bash
yarn dev
```

Esto iniciará la aplicación en el entorno de desarrollo. Abre tu navegador y ve a:
```
http://localhost:5173
```

---

## Estructura del Proyecto 📂

El proyecto está organizado de la siguiente manera:

```plaintext
├── public/                 # Archivos públicos (imágenes, fuentes, etc.)
├── src/                    # Código fuente principal
│   ├── components/         # Componentes reutilizables
│   │   ├── Bars/           # Barra de navegación (Navbar)
│   │   ├── Chess/          # Componentes relacionados con el ajedrez (ChessBoard, Controls, etc.)
│   ├── styles/             # Archivos de estilos adicionales
│   ├── App.tsx            # Componente principal de la aplicación
│   └── main.tsx           # Punto de entrada del proyecto
├── tailwind.config.js      # Configuración de TailwindCSS
├── postcss.config.js       # Configuración de PostCSS
├── package.json            # Información y dependencias del proyecto
├── README.md               # Este archivo
```

---

## Características Clave ✨

- **Responsividad**: Compatible con dispositivos móviles y de escritorio.  
- **Tablero de ajedrez interactivo** (próximamente).  
- **Análisis de partidas**: Soporte para carga de PGN.  
- **Estilos modernos**: Utilizando **TailwindCSS**.  

---

## Contribuciones 🤝

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:  
1. Realiza un **fork** del repositorio.  
2. Crea una nueva rama para tus cambios:  
   ```bash
   git checkout -b mi-feature
   ```  
3. Realiza tus cambios y realiza un **commit**:  
   ```bash
   git commit -m "Añadí una nueva funcionalidad"
   ```  
4. Envía tus cambios a tu fork:  
   ```bash
   git push origin mi-feature
   ```  
5. Crea un **Pull Request** y explica los cambios realizados.

---

## Licencia 📜

Este proyecto está bajo la licencia **MIT**. Siéntete libre de usar, modificar y distribuir el código.

---
