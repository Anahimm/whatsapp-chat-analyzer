import zipfile
import re
import pandas as pd
from collections import Counter
from utils import extraer_emojis, limpiar_palabras

def procesar_chat(archivo_zip_memoria):
    """Parsea el archivo .txt dentro del zip y lo convierte a DataFrame sin guardar en disco."""
    datos_parseados = []
    patron_android = r'^(\d{1,2}/\d{1,2}/\d{2,4}),?\s(\d{1,2}:\d{2})\s-\s([^:]+):\s(.*)$'
    patron_ios = r'^\[(\d{1,2}/\d{1,2}/\d{2,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?)\]\s([^:]+):\s(.*)$'
    patron_es_fecha = r'^\[?\d{1,2}/\d{1,2}/\d{2,4}'

    with zipfile.ZipFile(archivo_zip_memoria, 'r') as z:
        archivos_txt = [n for n in z.namelist() if n.endswith('.txt')]
        if not archivos_txt: return pd.DataFrame()
        
        with z.open(archivos_txt[0]) as f:
            mensaje_actual = None
            for linea in f:
                linea_texto = linea.decode('utf-8').strip()
                
                coincidencia_android = re.match(patron_android, linea_texto)
                coincidencia_ios = re.match(patron_ios, linea_texto)

                if coincidencia_android:
                    fecha, hora, usuario, texto = coincidencia_android.groups()
                    mensaje_actual = {'Fecha': fecha, 'Hora': hora, 'Usuario': usuario, 'Mensaje': texto}
                    datos_parseados.append(mensaje_actual)
                elif coincidencia_ios:
                    fecha, hora, usuario, texto = coincidencia_ios.groups()
                    mensaje_actual = {'Fecha': fecha, 'Hora': hora[:5], 'Usuario': usuario, 'Mensaje': texto}
                    datos_parseados.append(mensaje_actual)
                elif re.match(patron_es_fecha, linea_texto):
                    continue
                elif mensaje_actual and linea_texto:
                    mensaje_actual['Mensaje'] += f" {linea_texto}"

    return pd.DataFrame(datos_parseados)

def generar_analisis(df):
    """Calcula las métricas solicitadas para el front."""
    df['Hora_Num'] = df['Hora'].apply(lambda x: int(x.split(':')[0]))
    limites = [-1, 6, 12, 19, 24]
    nombres_rangos = ['Madrugada (00-06hs)', 'Mañana (07-12hs)', 'Tarde (13-19hs)', 'Noche (20-23hs)']
    df['Rango_Horario'] = pd.cut(df['Hora_Num'], bins=limites, labels=nombres_rangos).astype(str)

    ranking_usuarios = df['Usuario'].value_counts()
    dias_mas_activos = df['Fecha'].value_counts()
    franjas_agrupadas = df['Rango_Horario'].value_counts()

    df['Emojis'] = df['Mensaje'].apply(extraer_emojis)
    conteo_emojis = Counter(''.join(df['Emojis']))

    palabras_limpias = limpiar_palabras(" ".join(df['Mensaje'].dropna()))
    conteo_palabras = Counter(palabras_limpias)

    return {
        "usuario_top": ranking_usuarios.idxmax(),
        "grafico_usuarios": ranking_usuarios.head(5).to_dict(),
        "dias_pico": dias_mas_activos.head(5).to_dict(),
        "horarios": franjas_agrupadas.to_dict(),
        "emojis": [{"emoji": e[0], "cantidad": e[1]} for e in conteo_emojis.most_common(5)],
        "nube_palabras": [{"text": p, "value": c} for p, c in conteo_palabras.most_common(50)],
        "mensajes_crudos": df[['Fecha', 'Hora', 'Usuario', 'Mensaje', 'Rango_Horario', 'Emojis']].to_dict(orient='records')
    }