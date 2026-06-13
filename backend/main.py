from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from services import procesar_chat, generar_analisis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analizar")
async def analizar(archivo: UploadFile = File(...)):
    df = procesar_chat(archivo.file)
    if df.empty:
        return {"error": "No se pudo procesar el archivo zip"}
    
    return generar_analisis(df)