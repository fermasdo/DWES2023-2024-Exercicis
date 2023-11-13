# DWES2023-2024-Exercicis

Movies em patró MVC
- BD MongoDB (docker-compose)
- Model, Mongoose
- Vistes, motor de plantilles Nunjucks
- Rutes separades per a vistes i API (controlador combinats)

Per arrancar:
- Instal·lar mòduls del projecte: `npm install`
- Arrancar servidor de BD (MongoDB): `docker compose -f "docker-compose.yml" up -d --build`
- Preparar `.env` arxiu en variables d'entorn (port de connexió, secret per a JWT, etc.) a partir de `.env.example`
- Arrancar el servidor `npm run start`
