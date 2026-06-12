import { useState, useEffect } from 'react'
import CargaArchivo from './components/CargarArchivo'
import TableroPrincipal from './components/dashboard/TableroPrincipal'
import './App.css'

function App() {
  const [result, setResult] = useState(null)

  // Estado para el Modo Oscuro
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Efecto para aplicar el tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <div className="app-container">

      <button
        className="btn-tema"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
      </button>

      <div className={`contenedor-principal ${result ? "modo-tablero" : "modo-carga"}`}>

        <header className="cabecera-wa">
          <h1>📊 Analizador de Chat WhatsApp</h1>
          <p>Sube tu archivo .zip para procesar las estadísticas</p>
        </header>

        {!result ? (
          <CargaArchivo onResultados={setResult} />
        ) : (
          <TableroPrincipal
            datos={result}
            onReiniciar={() => setResult(null)}
          />
        )}

      </div>
    </div>
  )
}

export default App