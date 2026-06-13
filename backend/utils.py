import re
import emoji

# Constantes para la limpieza de datos
MODIFICADORES_IGNORAR = ['🏻', '🏼', '🏽', '🏾', '🏿', '♂', '♀', '♂️', '♀️']
STOPWORDS = {'que', 'de', 'la', 'el', 'en', 'y', 'a', 'los', 'se', 'del', 'las', 'un', 'por', 
            'con', 'no', 'una', 'su', 'para', 'es', 'al', 'lo', 'como', 'más', 'pero', 'sus', 
            'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 
            'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 
            'eso', 'te', 'si', 'multimedia', 'omitido', 'omitida', 'imagen', 'sticker', 'audio', 'documento'}

def extraer_emojis(texto):
    """Filtra y devuelve solo los emojis del texto, ignorando modificadores."""
    emojis_encontrados = [c for c in str(texto) if c in emoji.EMOJI_DATA]
    return ''.join([e for e in emojis_encontrados if e not in MODIFICADORES_IGNORAR])

def limpiar_palabras(texto_completo):
    """Limpia el texto, elimina stopwords y palabras cortas."""
    palabras = re.findall(r'\b[a-záéíóúñ]+\b', texto_completo.lower())
    return [p for p in palabras if p not in STOPWORDS and len(p) > 2]