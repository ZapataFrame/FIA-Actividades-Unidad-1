# 🤖 Taller CrewAI: tu primer equipo de agentes de IA con UV, Gemini y Serper

> Guía de referencia para seguir el taller.


## 1. ¿Qué vamos a construir?

Antes de teclear nada, vale la pena entender los siguientes elementos:

- **CrewAI:** Es un framework para orquestar "equipos" (*crews*) de agentes de IA.
- **UV:** Es la herramienta que vamos a usar para instalar Python, crear el entorno virtual y manejar las dependencias del proyecto.
- **Gemini:** Va a ser el LLM que le da inteligencia a cada agente. Usamos Gemini porque tiene una capa gratuita generosa para aprender y experimentar.
- **Serper:** Le da a tus agentes la capacidad de buscar en Google en tiempo real.

---

## 2. Instalar UV

### ¿Qué es y por qué lo usamos?

UV es un gestor de paquetes y proyectos de Python creado por **Astral** escrito en Rust. Reemplaza en una sola herramienta lo que antes hacían `pip`, `venv`, `pipx`, `poetry` y `pyenv` por separado, y es entre 10 y 100 veces más rápido instalando paquetes. El CLI de `crewai` lo usa internamente para crear proyectos y resolver dependencias.

### 🍎 macOS y 🐧 Linux (instalador oficial — recomendado)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Al terminar, **cierra y vuelve a abrir la terminal** para que `uv` quede disponible en el PATH.

### 🐧 Instalación según tu distribución de Linux

No todas las distros lo empaquetan igual. Esta tabla te ahorra la búsqueda:

| Distribución | ¿Tiene paquete oficial? | Comando recomendado |
|---|---|---|
| Ubuntu, Debian, Linux Mint, Pop!_OS | No hay paquete `apt` oficial todavía | Usa el instalador con `curl` de arriba, o `sudo snap install astral-uv --classic` |
| Fedora, RHEL, CentOS, Rocky, AlmaLinux | Sí, está en los repos oficiales | `sudo dnf install uv` |
| Arch Linux / Manjaro | Sí, está en los repos oficiales | `sudo pacman -S uv` |

### 🪟 Windows

**Opción A — instalador oficial:**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Opción B — WinGet:**

```powershell
winget install --id=astral-sh.uv -e
```

**Opción C — Scoop:**

```powershell
scoop install main/uv
```

### ✅ Verificar la instalación (todos los sistemas)

```bash
uv --version
```

---

## 3. Instalar CrewAI

`uv tool install` instala una herramienta de línea de comandos de forma global, pero en un entorno aislado.

```bash
uv tool install crewai
```

Verifica que quedó instalado:

```bash
uv tool list
crewai version
```

---

## 4. Crear el proyecto

```bash
crewai create crew example --classic
```

### ¿Por qué `--classic`?

Aquí hay un detalle importante que vale la pena explicar: en versiones recientes de CrewAI, `crewai create crew` **por defecto** ya no genera el clásico `crew.py` + YAML, sino un formato "JSON-first" (`crew.jsonc` + `agents/*.jsonc`), pensado para proyectos más simples. La bandera `--classic` es la que te da la estructura tradicional en Python/YAML (`crew.py`, `config/agents.yaml`, `config/tasks.yaml`), que es la que usaremos en este taller porque deja mucho más visible cómo se conectan agentes, tareas y el crew — ideal para aprender los fundamentos.

### El flujo interactivo

Al ejecutar el comando, la terminal te va a preguntar, en este orden:

1. **Proveedor de LLM**: una lista numerada (OpenAI, Anthropic, Gemini, Ollama, etc.). Busca la línea que diga **Gemini**.
2. **Modelo específico de Gemini**: un submenú con modelos sugeridos. Esta lista la mantiene el equipo de CrewAI y puede no estar al día con el catálogo real de Google. Elige cualquier opción por ahora, en siguientes pasos lo corregimos a mano.
3. **Tu API key de Gemini**: puedes pegarla aquí, o dejarla en blanco y agregarla después.

### Obtener tu API key de Gemini (Google AI Studio)

1. Entra a **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)**
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API key"** (Crear clave de API)
4. Elige o crea un proyecto de Google Cloud cuando te lo pida
5. Copia la clave y guárdala en un lugar seguro

> 📌 **Nota:** la API de Gemini tiene una capa gratuita bastante generosa para aprender, pero con límites de peticiones por minuto y por día que varían según el modelo elegido. Ya con tu cuenta iniciada en AI Studio, busca la sección **"Rate limits"** en el menú lateral para ver tus límites actuales (la URL incluye el ID de tu proyecto de Google Cloud, por eso cambia para cada quien y no te doy un enlace fijo).

---

## 5. Explorando la estructura del proyecto

```bash
cd example
```

Con `--classic`, el proyecto se ve así:

```
example/
├── .env                    # tus API keys y variables de entorno (nunca lo subas a git)
├── .gitignore
├── pyproject.toml          # dependencias del proyecto, lo gestiona uv
├── README.md
├── knowledge/              # archivos que tus agentes pueden usar como contexto extra
└── src/
    └── example/
        ├── __init__.py
        ├── main.py         # punto de entrada: aquí se llama a crew().kickoff()
        ├── crew.py         # define los Agentes, las Tareas y el Crew (el "director")
        ├── tools/
        │   └── custom_tool.py   # aquí puedes crear herramientas propias
        └── config/
            ├── agents.yaml # el rol, la meta y la historia de cada agente
            └── tasks.yaml  # qué debe hacer cada tarea, y a qué agente se le asigna
```

Un vistazo rápido a qué hace cada pieza:

- **`config/agents.yaml`**: aquí describes a tus agentes en lenguaje natural (rol, objetivo, personalidad). No hay código todavía, solo texto.
- **`config/tasks.yaml`**: describe el trabajo concreto que cada agente debe entregar, y con qué formato de salida.
- **`crew.py`**: conecta lo anterior con Python real — decide el `Process` (¿las tareas corren en orden fijo, `sequential`, o hay un agente "gerente" que delega, `hierarchical`?) y arma el objeto `Crew`.
- **`main.py`**: el botón de encendido. Aquí defines los inputs iniciales (por ejemplo, un `{topic}`) y disparas la ejecución.
- **`.env`**: donde viven tus claves de API y la variable `MODEL`, que le dice a CrewAI qué modelo usar.

---

## 6. Elegir el modelo de Gemini correcto

Esta es la parte que más rápido se pone vieja en cualquier tutorial, así que vale la pena explicar el criterio en vez de solo dar un nombre fijo.

Google libera y retira modelos de Gemini constantemente. Las dos fuentes de verdad que **siempre** debes revisar son:

- 📄 Catálogo completo de modelos: **[ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)**
- 🚦 Tus límites de uso (rate limits): dentro de [aistudio.google.com](https://aistudio.google.com), ya con sesión iniciada

### Estado de los modelos mencionados en este taller (revisado sept. 2026)

| Modelo | Estado | ¿Cuándo usarlo? |
|---|---|---|
| `gemini-3.5-flash-lite` | ✅ Estable (GA), el más reciente de la línea "lite" | Tan recomendado como el anterior; Google lo señala como opción preferida para proyectos nuevos |
| `gemini-3.1-flash-lite` | ✅ Estable (GA) | **Recomendado.** Rápido y barato, ideal para agentes que hacen muchas llamadas seguidas |
| `gemini-3.6-flash` / `gemini-3.7-flash` / `gemini-3.8-flash` | ✅ Estables (GA), más "inteligentes" que los `-lite` | Cuando necesites más capacidad de razonamiento y no te preocupe tanto la cuota gratis (suelen tener límites más estrictos en el nivel gratuito) |

### Configura el modelo en `.env`

Abre el archivo `.env` en la raíz del proyecto y asegúrate de que tenga estas dos líneas:

```env
MODEL=gemini/gemini-3.5-flash-lite
GEMINI_API_KEY=tu_clave_segura_aqui
```

---

## 7. Instalar el SDK de Google

```bash
uv add "crewai[google-genai]"
```

Esto instala el SDK nativo de Google como un "extra" de CrewAI, para que tus agentes hablen con Gemini directamente (sin pasar por la capa de compatibilidad LiteLLM, que es más lenta y trae más dependencias de las necesarias).

---

## 8. Opcional: búsqueda web con Serper

Por defecto, tus agentes solo "saben" lo que el modelo aprendió en su entrenamiento. **Serper** es una API que envuelve la búsqueda de Google, y le da a tus agentes la capacidad de buscar información real y actual en internet antes de responder.

### Paso 1: crear tu cuenta y llave

1. Entra a **[serper.dev/api-keys](https://serper.dev/api-keys)**
2. Crea una cuenta (te da un paquete de créditos gratis para probar, sin pedir tarjeta)
3. Copia tu API key

### Paso 2: agrégala a `.env`

```env
SERPER_API_KEY=tu_clave_de_serper
```

### Paso 3: instala la librería de herramientas

```bash
uv add crewai_tools
```

### Paso 4: úsala en tu agente

En `crew.py`, importa la herramienta y agrégala al agente que quieras que pueda buscar en la web:

```python
from crewai_tools import SerperDevTool

search_tool = SerperDevTool()

@agent
def researcher(self) -> Agent:
    return Agent(
        config=self.agents_config['researcher'],
        tools=[search_tool],
        verbose=True
    )
```

Con eso, ese agente en particular ya puede decidir por sí mismo cuándo lanzar una búsqueda antes de responder.

---

## 9. Ejecutar tu crew

### Instalar dependencias del proyecto

```bash
crewai install
```

Este comando lee tu `pyproject.toml`, resuelve el lockfile con `uv` y crea un entorno virtual dedicado a **este** proyecto.

### Opcional: activar trazas (traces)

Si quieres ver, paso a paso, qué decidió cada agente, qué herramientas usó y qué le respondió el modelo, CrewAI trae observabilidad integrada:

```bash
crewai login          # solo la primera vez — crea una cuenta gratis en CrewAI AMP
crewai traces enable
```

Esto es muy útil durante el taller para depurar cuando algo no sale como esperabas: puedes ver la ejecución completa en el dashboard de CrewAI AMP.

### Ejecutar

```bash
crewai run
```

Al correr esto, CrewAI activa automáticamente el entorno virtual del proyecto y ejecuta `main.py`, que dispara `crew().kickoff()`. Si tus agentes tienen `verbose=True`, vas a ver en la terminal, en vivo, el razonamiento de cada agente mientras trabaja.

---

## 10. Problemas comunes

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Error 429 / "rate limit exceeded" | Excediste las peticiones por minuto de tu capa gratuita | Cambia a un modelo `-lite`, espera un minuto, o revisa tus límites en AI Studio |
| "API key inválida" o no detectada | Nombre de variable equivocado en `.env` | Define tanto `GEMINI_API_KEY` como `GOOGLE_API_KEY` con el mismo valor |
| "Model not found" | El nombre del modelo en `MODEL=` ya no existe o tiene un typo | Compáralo contra el catálogo vigente en [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models) |
| `crewai` no se reconoce como comando | El PATH no se actualizó | Cierra y abre una terminal nueva, o corre `uv tool update-shell` |

---

## 11. Recursos y enlaces

- 🔧 Instalación de UV: [docs.astral.sh/uv/getting-started/installation](https://docs.astral.sh/uv/getting-started/installation/)
- 📚 Documentación de CrewAI: [docs.crewai.com](https://docs.crewai.com)
- 🖥️ CLI de CrewAI (todos los comandos): [docs.crewai.com/en/concepts/cli](https://docs.crewai.com/en/concepts/cli)
- 🔑 Generar API key de Gemini: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- 🤖 Catálogo de modelos de Gemini: [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)
- 📰 Novedades y retiros de modelos de Gemini: [ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
- 🔍 Serper (búsqueda web para agentes): [serper.dev](https://serper.dev)

---

## 12. 🔨 Martillo rápido

Todos los comandos del taller, en orden, para copiar y pegar:

```bash
# 1. Verificar/instalar UV (ver sección 2 según tu sistema operativo)
uv --version

# 2. Instalar CrewAI
uv tool install crewai
crewai version

# 3. Crear el proyecto (formato clásico Python/YAML)
crewai create crew example --classic
cd example

# 4. Instalar el SDK de Gemini
uv add "crewai[google-genai]"

# 5. (Opcional) Serper para búsqueda web
uv add crewai_tools
# + agregar SERPER_API_KEY en .env
# + agregar tools=[SerperDevTool()] al agente en crew.py

# 6. Instalar dependencias del proyecto
crewai install# 🤖 Taller CrewAI: tu primer equipo de agentes de IA con UV, Gemini y Serper

> Guía de referencia para seguir el taller.


## 1. ¿Qué vamos a construir?

Antes de teclear nada, vale la pena entender los siguientes elementos:

- **CrewAI:** Es un framework para orquestar "equipos" (*crews*) de agentes de IA.
- **UV:** Es la herramienta que vamos a usar para instalar Python, crear el entorno virtual y manejar las dependencias del proyecto.
- **Gemini:** Va a ser el LLM que le da inteligencia a cada agente. Usamos Gemini porque tiene una capa gratuita generosa para aprender y experimentar.
- **Serper:** Le da a tus agentes la capacidad de buscar en Google en tiempo real.

---

## 2. Instalar UV

### ¿Qué es y por qué lo usamos?

UV es un gestor de paquetes y proyectos de Python creado por **Astral** escrito en Rust. Reemplaza en una sola herramienta lo que antes hacían `pip`, `venv`, `pipx`, `poetry` y `pyenv` por separado, y es entre 10 y 100 veces más rápido instalando paquetes. El CLI de `crewai` lo usa internamente para crear proyectos y resolver dependencias.

### 🍎 macOS y 🐧 Linux (instalador oficial — recomendado)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Al terminar, **cierra y vuelve a abrir la terminal** para que `uv` quede disponible en el PATH.

### 🐧 Instalación según tu distribución de Linux

No todas las distros lo empaquetan igual. Esta tabla te ahorra la búsqueda:

| Distribución | ¿Tiene paquete oficial? | Comando recomendado |
|---|---|---|
| Ubuntu, Debian, Linux Mint, Pop!_OS | No hay paquete `apt` oficial todavía | Usa el instalador con `curl` de arriba, o `sudo snap install astral-uv --classic` |
| Fedora, RHEL, CentOS, Rocky, AlmaLinux | Sí, está en los repos oficiales | `sudo dnf install uv` |
| Arch Linux / Manjaro | Sí, está en los repos oficiales | `sudo pacman -S uv` |

### 🪟 Windows

**Opción A — instalador oficial:**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Opción B — WinGet:**

```powershell
winget install --id=astral-sh.uv -e
```

**Opción C — Scoop:**

```powershell
scoop install main/uv
```

### ✅ Verificar la instalación (todos los sistemas)

```bash
uv --version
```

---

## 3. Instalar CrewAI

`uv tool install` instala una herramienta de línea de comandos de forma global, pero en un entorno aislado.

```bash
uv tool install crewai
```

Verifica que quedó instalado:

```bash
uv tool list
crewai version
```

---

## 4. Crear el proyecto

```bash
crewai create crew example --classic
```

### ¿Por qué `--classic`?

Aquí hay un detalle importante que vale la pena explicar: en versiones recientes de CrewAI, `crewai create crew` **por defecto** ya no genera el clásico `crew.py` + YAML, sino un formato "JSON-first" (`crew.jsonc` + `agents/*.jsonc`), pensado para proyectos más simples. La bandera `--classic` es la que te da la estructura tradicional en Python/YAML (`crew.py`, `config/agents.yaml`, `config/tasks.yaml`), que es la que usaremos en este taller porque deja mucho más visible cómo se conectan agentes, tareas y el crew — ideal para aprender los fundamentos.

### El flujo interactivo

Al ejecutar el comando, la terminal te va a preguntar, en este orden:

1. **Proveedor de LLM**: una lista numerada (OpenAI, Anthropic, Gemini, Ollama, etc.). Busca la línea que diga **Gemini**.
2. **Modelo específico de Gemini**: un submenú con modelos sugeridos. Esta lista la mantiene el equipo de CrewAI y puede no estar al día con el catálogo real de Google. Elige cualquier opción por ahora, en siguientes pasos lo corregimos a mano.
3. **Tu API key de Gemini**: puedes pegarla aquí, o dejarla en blanco y agregarla después.

### Obtener tu API key de Gemini (Google AI Studio)

1. Entra a **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)**
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API key"** (Crear clave de API)
4. Elige o crea un proyecto de Google Cloud cuando te lo pida
5. Copia la clave y guárdala en un lugar seguro

> 📌 **Nota:** la API de Gemini tiene una capa gratuita bastante generosa para aprender, pero con límites de peticiones por minuto y por día que varían según el modelo elegido. Ya con tu cuenta iniciada en AI Studio, busca la sección **"Rate limits"** en el menú lateral para ver tus límites actuales (la URL incluye el ID de tu proyecto de Google Cloud, por eso cambia para cada quien y no te doy un enlace fijo).

---

## 5. Explorando la estructura del proyecto

```bash
cd example
```

Con `--classic`, el proyecto se ve así:

```
example/
├── .env                    # tus API keys y variables de entorno (nunca lo subas a git)
├── .gitignore
├── pyproject.toml          # dependencias del proyecto, lo gestiona uv
├── README.md
├── knowledge/              # archivos que tus agentes pueden usar como contexto extra
└── src/
    └── example/
        ├── __init__.py
        ├── main.py         # punto de entrada: aquí se llama a crew().kickoff()
        ├── crew.py         # define los Agentes, las Tareas y el Crew (el "director")
        ├── tools/
        │   └── custom_tool.py   # aquí puedes crear herramientas propias
        └── config/
            ├── agents.yaml # el rol, la meta y la historia de cada agente
            └── tasks.yaml  # qué debe hacer cada tarea, y a qué agente se le asigna
```

Un vistazo rápido a qué hace cada pieza:

- **`config/agents.yaml`**: aquí describes a tus agentes en lenguaje natural (rol, objetivo, personalidad). No hay código todavía, solo texto.
- **`config/tasks.yaml`**: describe el trabajo concreto que cada agente debe entregar, y con qué formato de salida.
- **`crew.py`**: conecta lo anterior con Python real — decide el `Process` (¿las tareas corren en orden fijo, `sequential`, o hay un agente "gerente" que delega, `hierarchical`?) y arma el objeto `Crew`.
- **`main.py`**: el botón de encendido. Aquí defines los inputs iniciales (por ejemplo, un `{topic}`) y disparas la ejecución.
- **`.env`**: donde viven tus claves de API y la variable `MODEL`, que le dice a CrewAI qué modelo usar.

---

## 6. Elegir el modelo de Gemini correcto

Esta es la parte que más rápido se pone vieja en cualquier tutorial, así que vale la pena explicar el criterio en vez de solo dar un nombre fijo.

Google libera y retira modelos de Gemini constantemente. Las dos fuentes de verdad que **siempre** debes revisar son:

- 📄 Catálogo completo de modelos: **[ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)**
- 🚦 Tus límites de uso (rate limits): dentro de [aistudio.google.com](https://aistudio.google.com), ya con sesión iniciada

### Estado de los modelos mencionados en este taller (revisado sept. 2026)

| Modelo | Estado | ¿Cuándo usarlo? |
|---|---|---|
| `gemini-3.5-flash-lite` | ✅ Estable (GA), el más reciente de la línea "lite" | Tan recomendado como el anterior; Google lo señala como opción preferida para proyectos nuevos |
| `gemini-3.1-flash-lite` | ✅ Estable (GA) | **Recomendado.** Rápido y barato, ideal para agentes que hacen muchas llamadas seguidas |
| `gemini-3.6-flash` / `gemini-3.7-flash` / `gemini-3.8-flash` | ✅ Estables (GA), más "inteligentes" que los `-lite` | Cuando necesites más capacidad de razonamiento y no te preocupe tanto la cuota gratis (suelen tener límites más estrictos en el nivel gratuito) |

### Configura el modelo en `.env`

Abre el archivo `.env` en la raíz del proyecto y asegúrate de que tenga estas dos líneas:

```env
MODEL=gemini/gemini-3.5-flash-lite
GEMINI_API_KEY=tu_clave_segura_aqui
```

---

## 7. Instalar el SDK de Google

```bash
uv add "crewai[google-genai]"
```

Esto instala el SDK nativo de Google como un "extra" de CrewAI, para que tus agentes hablen con Gemini directamente (sin pasar por la capa de compatibilidad LiteLLM, que es más lenta y trae más dependencias de las necesarias).

---

## 8. Opcional: búsqueda web con Serper

Por defecto, tus agentes solo "saben" lo que el modelo aprendió en su entrenamiento. **Serper** es una API que envuelve la búsqueda de Google, y le da a tus agentes la capacidad de buscar información real y actual en internet antes de responder.

### Paso 1: crear tu cuenta y llave

1. Entra a **[serper.dev/api-keys](https://serper.dev/api-keys)**
2. Crea una cuenta (te da un paquete de créditos gratis para probar, sin pedir tarjeta)
3. Copia tu API key

### Paso 2: agrégala a `.env`

```env
SERPER_API_KEY=tu_clave_de_serper
```

### Paso 3: instala la librería de herramientas

```bash
uv add crewai_tools
```

### Paso 4: úsala en tu agente

En `crew.py`, importa la herramienta y agrégala al agente que quieras que pueda buscar en la web:

```python
from crewai_tools import SerperDevTool

search_tool = SerperDevTool()

@agent
def researcher(self) -> Agent:
    return Agent(
        config=self.agents_config['researcher'],
        tools=[search_tool],
        verbose=True
    )
```

Con eso, ese agente en particular ya puede decidir por sí mismo cuándo lanzar una búsqueda antes de responder.

---

## 9. Ejecutar tu crew

### Instalar dependencias del proyecto

```bash
crewai install
```

Este comando lee tu `pyproject.toml`, resuelve el lockfile con `uv` y crea un entorno virtual dedicado a **este** proyecto.

### Opcional: activar trazas (traces)

Si quieres ver, paso a paso, qué decidió cada agente, qué herramientas usó y qué le respondió el modelo, CrewAI trae observabilidad integrada:

```bash
crewai login          # solo la primera vez — crea una cuenta gratis en CrewAI AMP
crewai traces enable
```

Esto es muy útil durante el taller para depurar cuando algo no sale como esperabas: puedes ver la ejecución completa en el dashboard de CrewAI AMP.

### Ejecutar

```bash
crewai run
```

Al correr esto, CrewAI activa automáticamente el entorno virtual del proyecto y ejecuta `main.py`, que dispara `crew().kickoff()`. Si tus agentes tienen `verbose=True`, vas a ver en la terminal, en vivo, el razonamiento de cada agente mientras trabaja.

---

## 10. Problemas comunes

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Error 429 / "rate limit exceeded" | Excediste las peticiones por minuto de tu capa gratuita | Cambia a un modelo `-lite`, espera un minuto, o revisa tus límites en AI Studio |
| "API key inválida" o no detectada | Nombre de variable equivocado en `.env` | Define tanto `GEMINI_API_KEY` como `GOOGLE_API_KEY` con el mismo valor |
| "Model not found" | El nombre del modelo en `MODEL=` ya no existe o tiene un typo | Compáralo contra el catálogo vigente en [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models) |
| `crewai` no se reconoce como comando | El PATH no se actualizó | Cierra y abre una terminal nueva, o corre `uv tool update-shell` |

---

## 11. Recursos y enlaces

- 🔧 Instalación de UV: [docs.astral.sh/uv/getting-started/installation](https://docs.astral.sh/uv/getting-started/installation/)
- 📚 Documentación de CrewAI: [docs.crewai.com](https://docs.crewai.com)
- 🖥️ CLI de CrewAI (todos los comandos): [docs.crewai.com/en/concepts/cli](https://docs.crewai.com/en/concepts/cli)
- 🔑 Generar API key de Gemini: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- 🤖 Catálogo de modelos de Gemini: [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)
- 📰 Novedades y retiros de modelos de Gemini: [ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
- 🔍 Serper (búsqueda web para agentes): [serper.dev](https://serper.dev)

---

## 12. 🔨 Martillo rápido

Todos los comandos del taller, en orden, para copiar y pegar:

```bash
# 1. Verificar/instalar UV (ver sección 2 según tu sistema operativo)
uv --version

# 2. Instalar CrewAI
uv tool install crewai
crewai version

# 3. Crear el proyecto (formato clásico Python/YAML)
crewai create crew example --classic
cd example

# 4. Instalar el SDK de Gemini
uv add "crewai[google-genai]"

# 5. (Opcional) Serper para búsqueda web
uv add crewai_tools
# + agregar SERPER_API_KEY en .env
# + agregar tools=[SerperDevTool()] al agente en crew.py

# 6. Instalar dependencias del proyecto
crewai install

# 7. (Opcional) Activar trazas
crewai login
crewai traces enable

# 8. ¡Ejecutar!
crewai run
```

## 13. Personaliza tus agentes: más propiedades disponibles

Hasta ahora solo configuramos `role`, `goal`, `backstory`, `llm` y `tools`. Pero la clase `Agent` de CrewAI acepta muchas más propiedades para controlar *cómo* trabaja cada agente. Hay dos lugares donde puedes agregarlas en un proyecto creado con `--classic`:

- **Opción A — en `config/agents.yaml`**, junto a `role`/`goal`/`backstory`. Funciona porque ese archivo se carga como diccionario y se le pasa a `Agent(config=...)`.
- **Opción B — directo en `crew.py`**, como argumento explícito al construir el `Agent`, junto a `config=self.agents_config['nombre']`. Es obligatorio para cosas que no son texto plano, como `tools` o funciones (`step_callback`).

```python src/example/crew.py
@agent
def researcher(self) -> Agent:
    return Agent(
        config=self.agents_config['researcher'],
        tools=[search_tool],
        allow_delegation=True,
        max_rpm=8,
        max_iter=15,
        respect_context_window=True,
        reasoning=True,
        verbose=True
    )
```



agregar al crew.py los modelos que queremos

```
from crewai.llm import LLM # clase de llm


llm_llama3=LLM(
    model="ollama/llama3.1", # parametro del modelo
    base_url="http://localhost:11434" #
)
llm_phi3=LLM(
    model="ollama/phi4-mini",
    base_url="http://localhost:11434"
)
```


importar modelo en nuestro agente

```
@agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['researcher'], # type: ignore[index]
            verbose=True,
            llm=llm_llama3 # definimos el llm a usar
        )
```


# 7. (Opcional) Activar trazas
crewai login
crewai traces enable

# 8. ¡Ejecutar!
crewai run
```

## 13. Personaliza tus agentes: más propiedades disponibles

Hasta ahora solo configuramos `role`, `goal`, `backstory`, `llm` y `tools`. Pero la clase `Agent` de CrewAI acepta muchas más propiedades para controlar *cómo* trabaja cada agente. Hay dos lugares donde puedes agregarlas en un proyecto creado con `--classic`:

- **Opción A — en `config/agents.yaml`**, junto a `role`/`goal`/`backstory`. Funciona porque ese archivo se carga como diccionario y se le pasa a `Agent(config=...)`.
- **Opción B — directo en `crew.py`**, como argumento explícito al construir el `Agent`, junto a `config=self.agents_config['nombre']`. Es obligatorio para cosas que no son texto plano, como `tools` o funciones (`step_callback`).

```python src/example/crew.py
@agent
def researcher(self) -> Agent:
    return Agent(
        config=self.agents_config['researcher'],
        tools=[search_tool],
        allow_delegation=True,
        max_rpm=8,
        max_iter=15,
        respect_context_window=True,
        reasoning=True,
        verbose=True
    )
```



agregar al crew.py los modelos que queremos

```
from crewai.llm import LLM # clase de llm


llm_llama3=LLM(
    model="ollama/llama3.1", # parametro del modelo
    base_url="http://localhost:11434" #
)
llm_phi3=LLM(
    model="ollama/phi4-mini",
    base_url="http://localhost:11434"
)
```


importar modelo en nuestro agente

```
@agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['researcher'], # type: ignore[index]
            verbose=True,
            llm=llm_llama3 # definimos el llm a usar
        )
```
