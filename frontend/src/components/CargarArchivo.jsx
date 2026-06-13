import { useState } from 'react'
import './CargarArchivo.css'

export default function CargaArchivo({ onResultados, onError }) {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState(null)

    // Manejadores de Drag & Drop
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        setError(null)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.name.endsWith('.zip')) {
            setFile(droppedFile)
        } else {
            setError("Por favor, asegúrate de subir un archivo con formato .zip")
        }
    }

    const handleFileChange = (e) => {
        setError(null)
        const selectedFile = e.target.files[0]
        if (selectedFile) setFile(selectedFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) return

        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('archivo', file)

        try {
            const res = await fetch('http://localhost:8000/api/analizar', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "El archivo no es un formato ZIP válido")
            }

            onResultados(data)
        } catch (err) {
            console.error("Error detallado:", err)
            onError(err.message)
            setFile(null) // Limpiamos el archivo para obligar a una nueva selección
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="cuerpo-formulario">
            
            {/* Zona de carga */}
            <div
                className={`zona-carga ${isDragging ? 'zona-carga-activa' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".zip"
                    id="file-upload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <label htmlFor="file-upload" className="zona-carga-label">
                    <span className="file-icon">{file ? '📦' : '📁'}</span>

                    <span className="file-label-text">
                        {file ? file.name : 'Haz clic para seleccionar o arrastra tu .zip aquí'}
                    </span>

                    {!file && (
                        <span className="file-hint">
                            Abre WhatsApp {'>'} Info del grupo {'>'} Exportar chat {'>'} Sin archivos
                        </span>
                    )}
                </label>
            </div>

            {/* Aviso de Privacidad */}
            <div className="aviso-privacidad">
                🔒 <b>Privacidad:</b> Tus chats se procesan localmente en memoria y no se guardan en nuestros servidores.
            </div>

            {/* Alerta de Error */}
            {error && <div className="alerta-error">{error}</div>}

            {/* Botón de envío */}
            <button type="submit" className="btn-wa" disabled={loading || !file}>
                {loading ? (
                    <span className="flex-centro">
                        <span className="spinner"></span> Analizando chat...
                    </span>
                ) : 'Analizar Chat'}
            </button>
        </form>
    )
}