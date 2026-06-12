import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function BotonExportarPDF({ targetRef, nombreArchivo = 'Reporte_WhatsApp' }) {
    
    const exportarPDF = async () => {
        const elemento = targetRef.current;
        if (!elemento) return;

        try {
            const canvas = await html2canvas(elemento, {
                scale: 2, 
                useCORS: true, 
                backgroundColor: null 
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            
            const pdf = new jsPDF({
                orientation: imgWidth > imgHeight ? 'l' : 'p', 
                unit: 'px',
                format: [imgWidth, imgHeight]
            });
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${nombreArchivo}.pdf`);
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    return (
        <button 
            onClick={exportarPDF} 
            className="btn-header"
            style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none' }}
        >
            📄 Exportar PDF
        </button>
    );
}