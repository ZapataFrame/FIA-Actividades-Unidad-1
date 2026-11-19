# CrewAI · De un modelo a un equipo

Presentación web en español de 18 diapositivas, diseñada para una exposición de 20–30 minutos ante estudiantes de TI.

## Abrir sin instalación

Abre `dist/index.html` en Edge, Chrome o Firefox. Mantén los archivos de `dist` juntos: incluye tipografía local y funciona sin conexión. Los enlaces de fuentes requieren internet.

## Controles

- Flechas izquierda/derecha, arriba/abajo o Page Up/Page Down: cambiar de diapositiva.
- Espacio: avanzar cuando el foco no está en un botón.
- F: activar o salir de pantalla completa. También hay un botón en la barra inferior.
- I: abrir/cerrar el índice; Escape lo cierra.
- Home / End: primera / última diapositiva.
- En móvil: botones o deslizamiento horizontal. El contenido largo se desplaza verticalmente.
- Botón de pausa: detener/reanudar animaciones. Se respeta la preferencia del sistema de reducir movimiento.

La diapositiva 10 contiene un ejemplo por etapas; la 17 revela una propuesta para una discusión en clase. No ejecutan CrewAI ni hacen llamadas a servicios de IA.

## Editar

- `dist/content.js`: contenido de las diapositivas 2–18.
- `dist/app.js`: portada y controles.
- `dist/styles.css`: diseño y adaptación a pantallas.
- `dist/assets/archivo.ttf`: fuente Archivo; licencia en `dist/assets/OFL.txt`.

## Contenido

Adaptación de GUIA_CREWAI.md, contrastada con la documentación oficial consultada el 24 de septiembre de 2026. Se excluyen la instalación y el taller. La memoria se describe según la documentación unificada consultada; `verbose` se explica como registro de ejecución, no como acceso garantizado al razonamiento interno. Las comparaciones entre frameworks son conceptuales y no rankings de rendimiento.

Los ejemplos son ilustrativos. El fragmento de Python muestra la composición de una Crew y presupone que agentes, tareas y modelo ya existen.
