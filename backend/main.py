from fastapi import FastAPI, UploadFile, File, HTTPException
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
    try:
        # FastAPI permite pasar el archivo directo a la función
        df = procesar_chat(archivo.file)
        return generar_analisis(df)
    except ValueError as e:
        # Esto envía un código 400 al frontend, disparando el !res.ok
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Para cualquier otro error inesperado
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado.")