import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function TarjetaTopEmojis({ emojis }) {
    const colores = ["var(--wa-dark)", "var(--wa-light)", "#ffc658", "#ff8042", "#8884d8"];

    return (
        <div className="tarjeta-grafico">
            <h3>🔥 Top Emojis</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={emojis} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <XAxis 
                        dataKey="emoji" 
                        tick={{ fontSize: 20, fill: 'var(--text)' }} 
                        axisLine={false} 
                        tickLine={false}
                    />
                    <Tooltip 
                        cursor={{fill: 'transparent'}} 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                        {emojis.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}