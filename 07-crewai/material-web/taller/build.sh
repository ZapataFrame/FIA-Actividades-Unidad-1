#!/bin/bash
# Combina los archivos fuente en un solo index.html
cd "$(dirname "$0")"

cat <<'HEADEOF' > index.html
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Taller CrewAI · Tu primer equipo de agentes de IA</title>
<meta name="description" content="Guía paso a paso: construye tu primer equipo de agentes de IA con CrewAI, Ollama y Serper.">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23192535'/%3E%3Cpath d='M8 10h16M8 10l8 14 8-14' fill='none' stroke='%23ed8758' stroke-width='2'/%3E%3Ccircle cx='8' cy='10' r='3' fill='%23f4f6f8'/%3E%3Ccircle cx='24' cy='10' r='3' fill='%23f4f6f8'/%3E%3Ccircle cx='16' cy='24' r='3' fill='%23ed8758'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap" rel="stylesheet">
<style>
HEADEOF

cat styles.css >> index.html

cat <<'MIDEOF' >> index.html
</style>
</head>
<body>
MIDEOF

cat body.html >> index.html
echo '<script>' >> index.html
cat content.js >> index.html
cat app.js >> index.html

cat <<'TAILEOF' >> index.html
</script>
</body></html>
TAILEOF

echo "✅ index.html generado ($(wc -c < index.html | tr -d ' ') bytes)"
