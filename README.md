# 📊 WhatsApp Chat Analyzer

## 📝 Descripción del Proyecto
Este proyecto nació como un trabajo práctico universitario con el objetivo de transformar datos crudos de exportaciones de chat de WhatsApp en información accionable. Lo que comenzó como un análisis básico de frecuencia se convirtió en una herramienta web completa para la exploración visual de datos, permitiendo entender patrones de comunicación, tendencias temporales y comportamiento de los integrantes de un grupo.

## 🛠️ Tecnologías Utilizadas

### Frontend:
* **React.js**: Construcción de interfaces dinámicas y componentes reutilizables.
* **Recharts**: Visualización de datos interactiva (barras, líneas, etc.).
* **CSS Custom Properties**: Diseño estilizado con modo oscuro/claro dinámico.

### Backend:
* **FastAPI**: API de alto rendimiento para el procesamiento de archivos.
* **Pandas**: Manipulación, limpieza y estructuración de los datos del chat.
* **Regex (Expresiones Regulares)**: Algoritmos personalizados para el parsing de chats en formato Android e iOS.

## ✨ Características Principales
* **Parsing Híbrido**: Capacidad de procesar exportaciones de WhatsApp tanto de Android como de iOS mediante algoritmos de Regex.
* **Análisis Estadístico**: Ranking de usuarios, días pico de actividad y franjas horarias de mayor interacción.
* **Procesamiento de Lenguaje Natural**: Generación de nubes de palabras (*WordCloud*) eliminando *stopwords* para extraer los temas de conversación clave.
* **Filtros Interactivos**: Los componentes reaccionan en tiempo real mediante `useMemo` al seleccionar usuarios específicos.
* **Exportación a PDF**: Funcionalidad nativa para generar reportes ejecutivos del dashboard completo.

## 🚀 Funcionalidades y Mejoras Implementadas
* **Arquitectura de Componentes**: Desacople efectivo de la lógica de exportación a PDF de la lógica del dashboard, mejorando la mantenibilidad.
* **Optimización de Renderizado**: Implementación de `useMemo` para recalcular métricas pesadas de forma eficiente al aplicar filtros por usuario.
* **UX/UI**: Implementación de *feedback* visual y corrección de comportamientos nativos de navegadores para una navegación fluida.

## 📂 Estructura del Repositorio
* `/backend`: Lógica de FastAPI, procesamiento de datos con Pandas y *endpoints* de la API.
* `/frontend`: Aplicación en React con componentes modulares para cada métrica del análisis.

## ⚙️ Cómo ejecutarlo

### Requisitos previos:
* Tener instalado **Node.js** (versión 18 o superior recomendada).
* Tener instalado **Python 3.10+**.

### 1. Configuración del Backend
1. Navegar a la carpeta `/backend`.
2. Crear entorno virtual: `python -m venv .venv`.
3. Activar el entorno:
   * **Windows**: `.venv\Scripts\activate`
   * **Linux/Mac**: `source .venv/bin/activate`
4. Instalar dependencias: `pip install -r requirements.txt`.
5. Iniciar el servidor: `uvicorn main:app --reload`.

### 2. Configuración del Frontend
1. Abrir una nueva terminal y navegar a la carpeta `/frontend`.
2. Instalar las dependencias del cliente: `npm install`.
3. Iniciar la aplicación: `npm start`.
4. La aplicación estará disponible en `http://localhost:5173`.

---

*Anahí M. Mansilla, 2026* 💻🚀
