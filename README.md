# FP Mensajería — Landing Page

Landing page estática, responsive y lista para Vercel.

## Publicación en Vercel
1. Sube esta carpeta a GitHub o arrástrala a Vercel.
2. No requiere build command ni backend.
3. El archivo de entrada es `index.html`.

## Antes de publicar
Edita `js/app.js` y cambia:

```js
const CONFIG={whatsapp:'573001234567',email:'info@fpmenajeria.com'};
```

por el número real de WhatsApp de FP Mensajería.

También cambia el correo en `index.html` si corresponde.

## Rastreo
El rastreador incluido funciona como demo con las guías `FP-2026-001`, `FP-2026-002` y `FP-2026-003`. Para seguimiento real se debe conectar el formulario con el API o sistema de logística de FP.

## Imágenes
Las imágenes están incluidas localmente en `assets/`, por lo que no dependen de enlaces externos.
