import React, { useState, useMemo } from 'react';
import WordCloud from "./WordCloud";
import './TableroPrincipal.css'
// Componentes modulares
import TarjetaTopEmojis from './TarjetaTopEmojis';
import TarjetaMensajesUsuario from './TarjetaMensajesUsuario';
import TarjetaFranjasHorarias from './TarjetaFranjasHorarias';

export default function TableroPrincipal({ datos, onReiniciar }) {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const datosMostrados = useMemo(() => {
        if (!usuarioSeleccionado || !datos.mensajes_crudos) {
            return datos;
        }

        const msjsFiltrados = datos.mensajes_crudos.filter(m => m.Usuario === usuarioSeleccionado);

        // A. Recalcular Top 5 Emojis
        const conteoEmojis = {};
        msjsFiltrados.forEach(m => {
            if (m.Emojis) {
                for (let char of m.Emojis) {
                    conteoEmojis[char] = (conteoEmojis[char] || 0) + 1;
                }
            }
        });
        const emojisFiltrados = Object.entries(conteoEmojis)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([emoji, cantidad]) => ({ emoji, cantidad }));

        // B. Recalcular Franjas Horarias
        const conteoHorarios = {};
        msjsFiltrados.forEach(m => {
            const rango = m.Rango_Horario;
            conteoHorarios[rango] = (conteoHorarios[rango] || 0) + 1;
        });

        // C. Recalcular Días con más mensajes
        const conteoDias = {};
        msjsFiltrados.forEach(m => {
            conteoDias[m.Fecha] = (conteoDias[m.Fecha] || 0) + 1;
        });
        const diasPicoFiltrados = Object.fromEntries(
            Object.entries(conteoDias).sort((a, b) => b[1] - a[1]).slice(0, 5)
        );
        return {
            ...datos,
            emojis: emojisFiltrados,
            horarios: conteoHorarios,
            dias_pico: diasPicoFiltrados
        };
    }, [datos, usuarioSeleccionado]);
 return (
        <div className="tablero-container tablero-wrapper">

            <div className="flex-entre">
                <h2 className="titulo-principal">
                    Resultados del Análisis
                    {usuarioSeleccionado && (
                        <span style={{ color: 'var(--accent)', marginLeft: '10px', fontSize: '1.2rem' }}>
                            (Filtrando: {usuarioSeleccionado})
                        </span>
                    )}
                </h2>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    {usuarioSeleccionado && (
                        <button 
                            className="btn-header" 
                            style={{ background: 'var(--border)', color: 'var(--text-h)' }}
                            onClick={() => setUsuarioSeleccionado(null)}
                        >
                            ❌ Quitar Filtro
                        </button>
                    )}
                    <button onClick={onReiniciar} className="btn-wa btn-header">
                        ↻ Analizar otro chat
                    </button>
                </div>
            </div>

            <div className="grid-tablero">

                <div className="tarjeta">
                    <h3 className="tarjeta-titulo">🏆 Usuario más activo</h3>
                    <p className="texto-destacado">
                        {datos.usuario_top}
                    </p>
                </div>

                <div className="tarjeta">
                    <h3 className="tarjeta-titulo">📅 Días con más mensajes</h3>
                    <ul className="lista-datos">
                        {Object.entries(datosMostrados.dias_pico).map(([fecha, cantidad]) => (
                            <li key={fecha}>
                                <strong>{fecha}</strong>: {cantidad} msjs
                            </li>
                        ))}
                    </ul>
                </div>
                
                <TarjetaTopEmojis emojis={datosMostrados.emojis} />       
                
                <TarjetaMensajesUsuario 
                    graficoUsuarios={datos.grafico_usuarios} 
                    onUserClick={(nombre) => setUsuarioSeleccionado(nombre)}
                />
                
                <TarjetaFranjasHorarias horarios={datosMostrados.horarios} />
                
                <div className="tarjeta tarjeta-ancho-total">
                    <h3 className="tarjeta-titulo">☁️ Nube de Palabras</h3>
                    <div className="nube-palabras-container">
                        <WordCloud words={datos.nube_palabras} />
                    </div>
                </div>

            </div>
        </div>
    );
}