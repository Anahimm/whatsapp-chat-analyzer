import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './TarjetaMensajesUsuario.css';

export default function TarjetaMensajesUsuario({ graficoUsuarios, onUserClick }) {
    const usuariosData = useMemo(() => {
        return Object.entries(graficoUsuarios || {}).map(([usuario, cantidad]) => ({
            usuario,
            cantidad
        }));
    }, [graficoUsuarios]);

    return (
        <div className="tarjeta">
            <h3 className="tarjeta-titulo">📊 Mensajes por Usuario (Clickeá para filtrar)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usuariosData} margin={{ top: 10, right: 10, left: -20, bottom: 60 }}>
                    <XAxis
                        dataKey="usuario"
                        angle={-35}
                        textAnchor="end"
                        height={70}
                        tickLine={false}
                        axisLine={false}
                        className="eje-x-usuarios"
                        tick={{ fill: 'var(--text)' }} 
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="eje-y-usuarios"
                        tick={{ fill: 'var(--text)' }} 
                    />
                    
                    <Tooltip 
                        cursor={{ fill: 'var(--accent-bg)' }} 
                        contentStyle={{ 
                            borderRadius: '8px', 
                            border: '1px solid var(--border)', 
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--text-h)',
                            boxShadow: 'var(--shadow)' 
                        }}
                    />
                    
                    <Bar 
                        dataKey="cantidad" 
                        fill="var(--accent)" 
                        radius={[4, 4, 0, 0]} 
                        
                        onClick={(dataPayload) => {
                            if (onUserClick) {
                                onUserClick(dataPayload.usuario);
                            }
                            
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }}
                        
                        style={{ cursor: 'pointer', outline: 'none' }} 
                    
                        activeShape={false} 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}