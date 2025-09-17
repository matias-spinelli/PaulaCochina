# PaulaCochina 🍲

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)


**PaulaCochina** es una aplicación web desarrollada en **Angular**
durante un curso práctico, con el objetivo de aprender y aplicar
conceptos modernos de desarrollo frontend.\
La app simula un recetario interactivo con funcionalidades de
autenticación, favoritos, animaciones y edición de recetas.

------------------------------------------------------------------------

## 🚀 Tecnologías utilizadas

-   **Angular** 17+
-   **TypeScript**
-   **RxJS**
-   **LocalStorage API**
-   **Angular Animations**
-   **HTML5 / SCSS**
-   **Backend REST** (Node.js + MongoDB, vía API)

------------------------------------------------------------------------

## ✨ Funcionalidades principales

-   📌 **Autenticación**: pantalla de login y registro con soporte para
    login social (visual).
-   ❤️ **Favoritos**: marcar recetas con animaciones de corazón y
    sincronización en LocalStorage.
-   📝 **Detalle editable**: editar título, descripción, imagen e
    ingredientes de cada receta.
-   ➕ **Agregar receta**: crear nuevas recetas desde una card especial
    en el Home.
-   🛒 **Lista de compras**: generar una lista a partir de los
    ingredientes seleccionados.
-   🎭 **Animaciones**: transiciones de desvanecimiento y efecto *pop*
    en los botones de favorito.

------------------------------------------------------------------------

## 📂 Estructura del proyecto

    src/
     ├── app/
     │   ├── components/        # Componentes reutilizables (cards, lists, etc.)
     │   ├── pages/             # Páginas principales (home, favorites, auth, recipe-detail)
     │   ├── services/          # Lógica de negocio y conexión con backend
     │   ├── models/            # Interfaces y tipados de datos
     │   └── app.module.ts
     ├── assets/                # Imágenes e íconos
     └── environments/          # Configuración de entornos

------------------------------------------------------------------------

## 🔧 Instalación y ejecución

``` bash
# Clonar el repositorio
git clone https://github.com/matias-spinelli/PaulaCochina.git

# Entrar al directorio
cd PaulaCochina

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve -o
```

------------------------------------------------------------------------

## 🌟 Créditos

Proyecto creado por **Matías Spinelli**
([@matias-spinelli](https://github.com/matias-spinelli))\
Desarrollado como parte de un curso de **Angular**, con fines de
práctica y aprendizaje.

------------------------------------------------------------------------

## 📜 Licencia

MIT License © 2025
