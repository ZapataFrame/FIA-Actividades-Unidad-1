/* === Taller CrewAI — Contenido de diapositivas === */

/* Helpers */
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function cmd(text){
  return '<div class="code-block"><button class="copy-btn" title="Copiar">'+iconCopy+'</button><pre><code>'+esc(text)+'</code></pre></div>';
}

function codeBlock(text,label){
  return (label?'<div class="code-label">'+label+'</div>':'')+
    '<div class="code-block"><button class="copy-btn" title="Copiar">'+iconCopy+'</button><pre><code>'+esc(text)+'</code></pre></div>';
}

function accordion(items){
  var h='<div class="accordion">';
  for(var i=0;i<items.length;i++){
    h+='<details><summary>'+items[i][0]+'</summary><div class="detail-body">'+items[i][1]+'</div></details>';
  }
  return h+'</div>';
}

function tabGroup(id,tabs){
  var h='<div class="tab-group"><div class="tab-bar" role="tablist">';
  for(var i=0;i<tabs.length;i++){
    h+='<button role="tab" class="tab-btn'+(i===0?' active':'')+'" data-tab="'+id+'-'+i+'">'+tabs[i].label+'</button>';
  }
  h+='</div>';
  for(var j=0;j<tabs.length;j++){
    h+='<div class="tab-panel'+(j===0?' active':'')+'" id="'+id+'-'+j+'" role="tabpanel">'+tabs[j].content+'</div>';
  }
  return h+'</div>';
}

function note(text){return '<div class="note-box"><span class="n-icon">📝</span><div>'+text+'</div></div>';}
function tip(text){return '<div class="tip-box"><span class="n-icon">💡</span><div>'+text+'</div></div>';}
function warn(text){return '<div class="warn-box"><span class="n-icon">⚠️</span><div>'+text+'</div></div>';}
function extLink(url,text){return '<a class="ext" href="'+url+'" target="_blank" rel="noopener">'+text+'</a>';}

var docs='https://docs.crewai.com/en/';

function makeSlides(){return [

/* ========================================================
   SECCIÓN 1: ANTES DEL TALLER (Requisitos previos)
   ======================================================== */

// 1 — Checklist
{title:'Antes de empezar',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Lo que necesitas <span class="accent">antes</span> del taller</h2>'
  +'<p class="lead">Instala todo con anticipación — el internet del salón se puede saturar.</p>'
  +'<ul class="checklist">'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>UV</strong> — gestor de paquetes de Python</div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>CrewAI CLI</strong> — framework de agentes</div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>Proyecto creado</strong> con <code>crewai create crew taller_crewai --classic</code></div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>Ollama</strong> + modelos <code>llama3.1</code> y <code>phi4-mini</code></div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>Dependencias</strong>: <code>crewai_tools</code> + <code>crewai install</code></div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><strong>Cuenta en Serper</strong> + API key para búsqueda web</div></li>'
    +'<li class="check-item"><span class="check-icon"></span><div><em>(Opcional)</em> SDK de Gemini + API key</div></li>'
  +'</ul>'
  +'<div class="slide-end"><p class="takeaway">Las siguientes diapositivas te guían paso a paso.</p></div>';
}},

// 2 — Instalar UV
{title:'Instalar UV',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 1 · Instalar <span class="accent">UV</span></h2>'
  +'<p class="lead">Gestor ultra-rápido de paquetes y entornos Python. '+extLink('https://docs.astral.sh/uv/getting-started/installation/','Documentación oficial')+'</p>'
  +accordion([
    ['🍎 macOS / 🐧 Linux (recomendado)',
      cmd('curl -LsSf https://astral.sh/uv/install.sh | sh')
      +'<p>Cierra y vuelve a abrir la terminal después de instalar.</p>'
    ],
    ['🐧 Linux — por distribución',
      '<table>'
      +'<tr><td style="padding:8px"><strong>Fedora / RHEL</strong></td><td><code>sudo dnf install uv</code></td></tr>'
      +'<tr><td style="padding:8px"><strong>Arch / Manjaro</strong></td><td><code>sudo pacman -S uv</code></td></tr>'
      +'<tr><td style="padding:8px"><strong>Ubuntu / Debian</strong></td><td>Usa el <code>curl</code> de arriba o <code>sudo snap install astral-uv --classic</code></td></tr>'
      +'</table>'
    ],
    ['🪟 Windows',
      '<p><strong>Opción A — Instalador oficial:</strong></p>'
      +cmd('powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"')
      +'<p><strong>Opción B — WinGet:</strong></p>'
      +cmd('winget install --id=astral-sh.uv -e')
      +'<p><strong>Opción C — Scoop:</strong></p>'
      +cmd('scoop install main/uv')
    ]
  ])
  +'<h4>✅ Verificar instalación</h4>'
  +cmd('uv --version');
}},

// 3 — CrewAI + Proyecto
{title:'CrewAI + Proyecto',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 2 · Instalar <span class="accent">CrewAI</span> y crear el proyecto</h2>'
  +'<p class="lead">Instalamos el CLI globalmente y creamos un proyecto clásico. '+extLink(docs+'concepts/cli','Ver todos los comandos del CLI')+'</p>'
  +'<h4>Instalar CrewAI</h4>'
  +cmd('uv tool install crewai')
  +'<h4>Verificar</h4>'
  +cmd('crewai version')
  +'<h4>Crear el proyecto</h4>'
  +cmd('crewai create crew taller_crewai --classic')
  +note('Durante la creación te pedirá proveedor de LLM y modelo. Puedes elegir cualquiera — lo configuraremos después manualmente.')
  +'<h4>Entrar al directorio del proyecto</h4>'
  +cmd('cd taller_crewai');
}},

// 4 — Dependencias
{title:'Dependencias',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 3 · Instalar <span class="accent">dependencias</span></h2>'
  +'<p class="lead">Librerías adicionales que necesitan nuestros agentes.</p>'
  +'<h4>Herramientas de CrewAI (incluye SerperDevTool y 40+ más)</h4>'
  +cmd('uv add crewai_tools')
  +'<p style="font-size:14px;color:var(--muted)">'+extLink(docs+'concepts/tools','Ver todas las herramientas disponibles')+' — búsqueda web, lectura de archivos, scraping, bases de datos, etc.</p>'
  +accordion([
    ['(Opcional) SDK de Google Gemini',
      '<p>Solo si quieres usar modelos de Gemini como alternativa a Ollama:</p>'
      +cmd('uv add "crewai[google-genai]"')
      +note('Esto instala el SDK nativo de Google para que CrewAI se comunique con Gemini directamente.')
    ]
  ])
  +'<h4>Resolver e instalar todo el proyecto</h4>'
  +cmd('crewai install');
}},

// 5 — Ollama + Modelos
{title:'Ollama + Modelos',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 4 · <span class="accent">Ollama</span> y modelos locales</h2>'
  +'<p class="lead">Corre LLMs en tu propia máquina — sin API key, sin costo. '+extLink('https://ollama.com','ollama.com')+'</p>'
  +'<h4>1. Descargar e instalar Ollama</h4>'
  +'<p>Descárgalo desde '+extLink('https://ollama.com/download','ollama.com/download')+' según tu sistema operativo.</p>'
  +'<h4>2. Descargar los modelos</h4>'
  +cmd('ollama pull llama3.1')
  +cmd('ollama pull phi4-mini')
  +tip('<strong>llama3.1</strong> (~4.7 GB) es bueno para investigación. <strong>phi4-mini</strong> (~2.5 GB) es rápido para redacción. Son los modelos más ligeros que usaremos.')
  +'<h4>3. Verificar que Ollama esté corriendo</h4>'
  +cmd('ollama serve')
  +note('Si ya está corriendo como servicio, este comando mostrará un error de puerto — eso está bien. Ollama responde en <code>http://localhost:11434</code>.');
}},

// 6 — API Keys
{title:'Cuentas y API keys',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 5 · <span class="accent">API keys</span></h2>'
  +'<h3>Serper — búsqueda web para tus agentes</h3>'
  +'<ol style="font-size:16px;line-height:1.8;padding-left:22px">'
    +'<li>Crea una cuenta en '+extLink('https://serper.dev/api-keys','serper.dev/api-keys')+'</li>'
    +'<li>Te dan créditos gratis — no pide tarjeta</li>'
    +'<li>Copia tu API key</li>'
  +'</ol>'
  +accordion([
    ['(Opcional) Gemini — modelos en la nube',
      '<ol style="font-size:15px;line-height:1.8;padding-left:22px">'
        +'<li>Entra a '+extLink('https://aistudio.google.com/apikey','aistudio.google.com/apikey')+'</li>'
        +'<li>Inicia sesión con tu cuenta de Google</li>'
        +'<li>Haz clic en <strong>Create API key</strong></li>'
        +'<li>Copia la clave y guárdala</li>'
      +'</ol>'
      +warn('La capa gratuita de Gemini tiene límites por minuto. Si el servicio se satura, las cuentas gratuitas son las primeras en recibir error 429. Úsalo como alternativa — el enfoque principal del taller es Ollama.')
    ]
  ]);
}},

// 7 — .env
{title:'Configurar .env',chapter:'Antes del taller',render:function(){return ''
  +'<h2>Paso 6 · Archivo <span class="accent">.env</span></h2>'
  +'<p class="lead">Aquí van tus claves de API. Nunca subas este archivo a Git.</p>'
  +'<h4>Abre <code>.env</code> en la raíz del proyecto y agrega:</h4>'
  +codeBlock('SERPER_API_KEY=tu_clave_de_serper\n\n# (Opcional) Solo si usarás Gemini:\n# GEMINI_API_KEY=tu_clave_de_gemini\n# MODEL=gemini/gemini-3.5-flash-lite','.env')
  +note('Para Ollama <strong>no necesitas</strong> variables de entorno — la conexión se configura directamente en el código Python con la clase <code>LLM</code>.')
  +'<div class="slide-end"><p class="takeaway">Con esto tienes todo instalado. ¡Nos vemos en el taller!</p></div>';
}},

/* ========================================================
   SECCIÓN 2: EL TALLER (durante la sesión)
   ======================================================== */

// 8 — Resumen
{title:'¡Empezamos!',chapter:'El taller',render:function(){return ''
  +'<h2>¿Qué ya tienes <span class="accent">instalado</span>?</h2>'
  +'<p class="lead">Repaso rápido antes de comenzar a escribir código.</p>'
  +'<div class="two-col">'
    +'<div>'
      +'<h4>🛠️ Herramientas</h4>'
      +'<ul style="font-size:16px;line-height:2;padding-left:20px">'
        +'<li><strong>UV</strong> — gestor de paquetes ✓</li>'
        +'<li><strong>CrewAI CLI</strong> — framework ✓</li>'
        +'<li><strong>Ollama</strong> + modelos locales ✓</li>'
        +'<li><strong>crewai_tools</strong> — herramientas ✓</li>'
      +'</ul>'
    +'</div>'
    +'<div>'
      +'<h4>🔑 Cuentas</h4>'
      +'<ul style="font-size:16px;line-height:2;padding-left:20px">'
        +'<li><strong>Serper</strong> — API key lista ✓</li>'
        +'<li><strong>.env</strong> configurado ✓</li>'
        +'<li><em>(Opcional)</em> Gemini SDK + key ✓</li>'
      +'</ul>'
    +'</div>'
  +'</div>'
  +'<div class="slide-end"><p class="takeaway">Ahora vamos a entender y personalizar el proyecto.</p></div>';
}},

// 9 — ¿Por qué --classic?
{title:'¿Por qué --classic?',chapter:'El taller',render:function(){return ''
  +'<h2>El formato <span class="accent">--classic</span></h2>'
  +'<p class="lead">CrewAI tiene dos formatos de proyecto. Nosotros usamos el clásico.</p>'
  +'<div class="two-col">'
    +'<div style="border-top:1px solid var(--line);padding-top:18px">'
      +'<h3>Formato por defecto</h3>'
      +'<p style="font-size:15px;color:var(--muted);line-height:1.5;margin-top:10px">Genera <code>crew.jsonc</code> + archivos JSON. Pensado para proyectos simples donde no necesitas ver el código Python.</p>'
    +'</div>'
    +'<div style="background:var(--ink);color:white;padding:20px;border-radius:5px">'
      +'<h3 style="color:var(--peach)">Formato --classic ✓</h3>'
      +'<p style="font-size:15px;color:#c5cfda;line-height:1.5;margin-top:10px">Genera <code>crew.py</code> + YAML. Deja visible cómo se conectan agentes, tareas y el crew — <strong>ideal para aprender</strong>.</p>'
    +'</div>'
  +'</div>'
  +'<div class="slide-end"><p class="takeaway">El formato clásico te da control total sobre el código Python y los YAML.</p></div>';
}},

// 10 — Estructura del proyecto
{title:'Estructura del proyecto',chapter:'El taller',render:function(){return ''
  +'<h2>Los archivos del <span class="accent">proyecto</span></h2>'
  +'<div class="dir-tree">'
    +'taller_crewai/\n'
    +'├── .env                    <span class="hl">← API keys (no subir a Git)</span>\n'
    +'├── pyproject.toml          <span class="hl">← dependencias del proyecto</span>\n'
    +'└── src/\n'
    +'    └── taller_crewai/\n'
    +'        ├── main.py         <span class="hl">← punto de entrada</span>\n'
    +'        ├── crew.py         <span class="hl">← agentes, tareas y crew</span>\n'
    +'        ├── config/\n'
    +'        │   ├── agents.yaml <span class="hl">← definición de agentes</span>\n'
    +'        │   └── tasks.yaml  <span class="hl">← definición de tareas</span>\n'
    +'        └── tools/\n'
    +'            └── custom_tool.py'
  +'</div>'
  +'<h3 style="margin-top:8px">Los 5 pilares de CrewAI</h3>'
  +'<div class="parts">'
    +'<div><h4>¿Quién?</h4><span class="part-label">Agent</span><p>El responsable.</p></div>'
    +'<div><h4>¿Qué?</h4><span class="part-label">Task</span><p>El encargo.</p></div>'
    +'<div><h4>¿Con qué?</h4><span class="part-label">Tool</span><p>Las herramientas.</p></div>'
    +'<div><h4>¿En qué orden?</h4><span class="part-label">Process</span><p>La coordinación.</p></div>'
    +'<div class="crew-part"><h4>¿Qué equipo?</h4><span class="part-label">Crew</span><p>Todo junto.</p></div>'
  +'</div>';
}},

// 11 — agents.yaml
{title:'Agentes personalizados',chapter:'Configuración',render:function(){return ''
  +'<h2>Definir nuestros <span class="accent">agentes</span></h2>'
  +'<p class="lead">Reemplaza el contenido de <code>config/agents.yaml</code> con estos dos agentes:</p>'
  +codeBlock(
    'investigador_tecnologias:\n'
   +'  role: >\n'
   +'    Investigador Senior de {topic}\n'
   +'  goal: >\n'
   +'    Investigar y recopilar información actualizada sobre {topic}\n'
   +'  backstory: >\n'
   +'    Eres un investigador especializado en tecnología con años de experiencia\n'
   +'    analizando tendencias. Priorizas fuentes confiables y separas hechos\n'
   +'    de opiniones. Tu trabajo es encontrar la información más relevante\n'
   +'    y presentarla de forma clara y concisa.\n'
   +'\n'
   +'redactor_informe:\n'
   +'  role: >\n'
   +'    Redactor de Informes sobre {topic}\n'
   +'  goal: >\n'
   +'    Convertir hallazgos de investigación en un informe claro y estructurado\n'
   +'  backstory: >\n'
   +'    Eres un redactor técnico experto en transformar datos complejos en\n'
   +'    documentos comprensibles. Te especializas en informes ejecutivos\n'
   +'    que cualquier persona pueda entender sin perder precisión técnica.'
  ,'config/agents.yaml')
  +note('<code>{topic}</code> es un placeholder — se reemplaza automáticamente con el valor que pases desde <code>main.py</code> al ejecutar.');
}},

// 12 — tasks.yaml
{title:'Tareas personalizadas',chapter:'Configuración',render:function(){return ''
  +'<h2>Definir las <span class="accent">tareas</span></h2>'
  +'<p class="lead">Reemplaza el contenido de <code>config/tasks.yaml</code>:</p>'
  +codeBlock(
    'tarea_investigacion:\n'
   +'  description: >\n'
   +'    Investiga las tendencias actuales y casos de uso de {topic}.\n'
   +'    Encuentra información relevante considerando que estamos en {current_year}.\n'
   +'    Incluye ventajas, desventajas y menciona tus fuentes.\n'
   +'  expected_output: >\n'
   +'    Una lista con 5 puntos clave sobre {topic}, cada uno con una breve\n'
   +'    explicación y su fuente de información.\n'
   +'  agent: investigador_tecnologias\n'
   +'\n'
   +'tarea_redaccion:\n'
   +'  description: >\n'
   +'    Usando los hallazgos de la investigación, redacta un informe ejecutivo\n'
   +'    sobre {topic}. Incluye introducción, puntos clave desarrollados\n'
   +'    y una conclusión con recomendaciones.\n'
   +'  expected_output: >\n'
   +'    Un informe completo en markdown con secciones: Introducción,\n'
   +'    Hallazgos Principales y Conclusión.\n'
   +'    Formateado como markdown sin bloques de código\n'
   +'  agent: redactor_informe'
  ,'config/tasks.yaml')
  +tip('Cada tarea tiene un <code>agent</code> asignado y un <code>expected_output</code> — esto le dice al agente exactamente qué formato debe entregar.');
}},

// 13 — La clase LLM (bifurcación Ollama / Gemini)
{title:'Integrar el LLM',chapter:'Código',render:function(){return ''
  +'<h2>La clase <span class="accent">LLM</span></h2>'
  +'<p class="lead">Conectamos nuestros agentes con un modelo de lenguaje.</p>'
  +tabGroup('llm',[
    {label:'🦙 Ollama (local)',content:''
      +'<p>Agrega esto al inicio de <code>crew.py</code> (después de los imports):</p>'
      +codeBlock(
        'from crewai.llm import LLM\n'
       +'\n'
       +'llm_llama3 = LLM(\n'
       +'    model="ollama/llama3.1",\n'
       +'    base_url="http://localhost:11434"\n'
       +')\n'
       +'llm_phi4 = LLM(\n'
       +'    model="ollama/phi4-mini",\n'
       +'    base_url="http://localhost:11434"\n'
       +')'
      ,'crew.py — definir modelos')
      +note('El prefijo <code>ollama/</code> le indica a CrewAI que use LiteLLM para conectarse a tu servidor local. Asegúrate de que <code>ollama serve</code> esté corriendo.')
    },
    {label:'✨ Gemini (API)',content:''
      +'<p><strong>Opción A</strong> — Vía <code>.env</code> (sin código adicional):</p>'
      +codeBlock('# En tu archivo .env:\nMODEL=gemini/gemini-3.5-flash-lite\nGEMINI_API_KEY=tu_clave','.env')
      +'<p>CrewAI lee estas variables automáticamente. No necesitas definir la clase <code>LLM</code>.</p>'
      +'<p style="margin-top:14px"><strong>Opción B</strong> — Explícita en código:</p>'
      +codeBlock(
        'from crewai.llm import LLM\n'
       +'\n'
       +'llm_gemini = LLM(\n'
       +'    model="gemini/gemini-3.5-flash-lite",\n'
       +')'
      ,'crew.py — Gemini')
      +warn('Si recibes error 429, espera un minuto o cambia a un modelo <code>-lite</code>. '+extLink('https://ai.google.dev/gemini-api/docs/models','Ver catálogo de modelos'))
    }
  ]);
}},

// 14 — crew.py completo
{title:'crew.py completo',chapter:'Código',render:function(){return ''
  +'<h2>Código completo de <span class="accent">crew.py</span></h2>'
  +'<p class="lead">Reemplaza todo el contenido de <code>src/taller_crewai/crew.py</code>:</p>'
  +codeBlock(
    'from crewai import Agent, Crew, Process, Task\n'
   +'from crewai.project import CrewBase, agent, crew, task\n'
   +'from crewai.agents.agent_builder.base_agent import BaseAgent\n'
   +'from crewai.llm import LLM\n'
   +'\n'
   +'llm_llama3 = LLM(\n'
   +'    model="ollama/llama3.1",\n'
   +'    base_url="http://localhost:11434"\n'
   +')\n'
   +'llm_phi4 = LLM(\n'
   +'    model="ollama/phi4-mini",\n'
   +'    base_url="http://localhost:11434"\n'
   +')\n'
   +'\n'
   +'@CrewBase\n'
   +'class TallerCrewai():\n'
   +'    """TallerCrewai crew"""\n'
   +'\n'
   +'    agents: list[BaseAgent]\n'
   +'    tasks: list[Task]\n'
   +'\n'
   +'    @agent\n'
   +'    def investigador_tecnologias(self) -> Agent:\n'
   +'        return Agent(\n'
   +'            config=self.agents_config[\'investigador_tecnologias\'],\n'
   +'            verbose=True,\n'
   +'            llm=llm_llama3\n'
   +'        )\n'
   +'\n'
   +'    @agent\n'
   +'    def redactor_informe(self) -> Agent:\n'
   +'        return Agent(\n'
   +'            config=self.agents_config[\'redactor_informe\'],\n'
   +'            verbose=True,\n'
   +'            llm=llm_phi4\n'
   +'        )\n'
   +'\n'
   +'    @task\n'
   +'    def tarea_investigacion(self) -> Task:\n'
   +'        return Task(\n'
   +'            config=self.tasks_config[\'tarea_investigacion\'],\n'
   +'        )\n'
   +'\n'
   +'    @task\n'
   +'    def tarea_redaccion(self) -> Task:\n'
   +'        return Task(\n'
   +'            config=self.tasks_config[\'tarea_redaccion\'],\n'
   +'            output_file=\'informe.md\'\n'
   +'        )\n'
   +'\n'
   +'    @crew\n'
   +'    def crew(self) -> Crew:\n'
   +'        return Crew(\n'
   +'            agents=self.agents,\n'
   +'            tasks=self.tasks,\n'
   +'            process=Process.sequential,\n'
   +'            verbose=True,\n'
   +'        )'
  ,'src/taller_crewai/crew.py')
  +tip('<code>tools=[search_tool]</code> le da al investigador acceso a búsqueda web con Serper. El redactor no la necesita — recibe los hallazgos como contexto automáticamente por el <code>Process.sequential</code>.');
}},

// 15 — main.py
{title:'Punto de entrada: main.py',chapter:'Código',render:function(){return ''
  +'<h2>El archivo <span class="accent">main.py</span></h2>'
  +'<p class="lead">Aquí defines los <code>inputs</code> iniciales y disparas la ejecución.</p>'
  +codeBlock(
    'def run():\n'
   +'    inputs = {\n'
   +'        \'topic\': \'Inteligencia Artificial en la educación\',\n'
   +'        \'current_year\': str(datetime.now().year),\n'
   +'    }\n'
   +'    try:\n'
   +'        TallerCrewai().crew().kickoff(inputs=inputs)\n'
   +'    except Exception as e:\n'
   +'        raise Exception(f"Error al ejecutar: {e}")'
  ,'main.py — función run()')
  +tip('¡Cambia el <code>topic</code> a lo que quieras! Prueba con "Ciberseguridad", "Blockchain", "Computación cuántica"… el agente investigará sobre lo que le pidas.')
  +'<h4>Otros métodos disponibles en main.py</h4>'
  +'<table>'
    +'<tr><td><code>run()</code></td><td>Ejecuta el crew con los inputs definidos</td></tr>'
    +'<tr><td><code>train()</code></td><td>Entrena el crew por N iteraciones</td></tr>'
    +'<tr><td><code>test()</code></td><td>Prueba y evalúa resultados con un LLM evaluador</td></tr>'
    +'<tr><td><code>replay()</code></td><td>Reproduce la ejecución desde una tarea específica</td></tr>'
  +'</table>'
  +note('Los <code>inputs</code> del diccionario se usan como placeholders <code>{topic}</code> y <code>{current_year}</code> en los YAML de agentes y tareas.');
}},

// 16 — Integrar SerperDevTool
{title:'El tool de búsqueda',chapter:'Código',render:function(){return ''
  +'<h2>Integrar <span class="accent">SerperDevTool</span></h2>'
  +'<p class="lead">Le da a tu agente la capacidad de buscar en Google en tiempo real.</p>'
  +'<h4>1. Import + instanciar (en crew.py)</h4>'
  +codeBlock(
    'from crewai_tools import SerperDevTool\n'
   +'\n'
   +'search_tool = SerperDevTool()'
  ,'crew.py')
  +'<h4>2. Asignar al agente</h4>'
  +codeBlock(
    '@agent\n'
   +'def investigador_tecnologias(self) -> Agent:\n'
   +'    return Agent(\n'
   +'        config=self.agents_config[\'investigador_tecnologias\'],\n'
   +'        verbose=True,\n'
   +'        llm=llm_llama3,\n'
   +'        tools=[search_tool]  # ← aquí\n'
   +'    )'
  ,'crew.py')
  +'<h4>3. Asegurar la API key en .env</h4>'
  +codeBlock('SERPER_API_KEY=tu_clave_de_serper','.env')
  +note('Solo el agente que tiene <code>tools=[search_tool]</code> puede buscar en la web. El redactor no tiene tools — trabaja con lo que le pasa el investigador.')
  +'<p style="font-size:14px;color:var(--muted);margin-top:6px">'+extLink(docs+'concepts/tools','Explorar las 40+ herramientas disponibles en crewai_tools')+'</p>';
}},

// 17 — Trazas
{title:'Activar trazas',chapter:'Ejecución',render:function(){return ''
  +'<h2>Ver el <span class="accent">razonamiento</span> paso a paso</h2>'
  +'<p class="lead">Las trazas te permiten ver qué decidió cada agente, qué herramientas usó y qué respondió el modelo.</p>'
  +'<h4>1. Crear cuenta (gratis, solo la primera vez)</h4>'
  +cmd('crewai login')
  +'<h4>2. Activar trazas</h4>'
  +cmd('crewai traces enable')
  +tip('No necesitas cuenta de pago. Las trazas se ven en el dashboard de CrewAI AMP — muy útil para depurar cuando un agente se comporta de forma inesperada.')
  +note('Esto es opcional pero muy recomendado para entender cómo trabajan los agentes internamente.');
}},

// 18 — ¡Ejecutar!
{title:'¡A ejecutar!',chapter:'Ejecución',render:function(){return ''
  +'<h2>Momento de la <span class="accent">verdad</span> 🚀</h2>'
  +'<p class="lead">Un solo comando para poner a trabajar a tu equipo de agentes.</p>'
  +cmd('crewai run')
  +'<h4>¿Qué va a pasar?</h4>'
  +'<ol style="font-size:16px;line-height:2;padding-left:22px">'
    +'<li>CrewAI activa el entorno virtual del proyecto</li>'
    +'<li>Ejecuta <code>main.py</code> → <code>crew().kickoff(inputs=...)</code></li>'
    +'<li>El <strong>investigador</strong> busca información sobre el topic con Serper</li>'
    +'<li>El <strong>redactor</strong> recibe los hallazgos y escribe el informe</li>'
    +'<li>El resultado se guarda en <code>informe.md</code></li>'
  +'</ol>'
  +note('Con <code>verbose=True</code>, verás en la terminal el razonamiento de cada agente en tiempo real.')
  +warn('La primera ejecución puede tardar varios minutos dependiendo de los modelos y tu máquina. ¡Paciencia!')
  +'<div class="slide-end"><p class="takeaway">¡Felicidades! Acabas de construir tu primer equipo de agentes de IA. 🎉</p></div>';
}},

// 19 — Recursos y cierre
{title:'Recursos y enlaces',chapter:'Ejecución',render:function(){return ''
  +'<h2>Para seguir <span class="accent">aprendiendo</span></h2>'
  +'<p class="lead">Documentación, herramientas y referencias útiles.</p>'
  +'<table>'
    +'<tr><td>🔧 UV</td><td>'+extLink('https://docs.astral.sh/uv/','docs.astral.sh/uv')+'</td></tr>'
    +'<tr><td>📚 CrewAI</td><td>'+extLink('https://docs.crewai.com','docs.crewai.com')+'</td></tr>'
    +'<tr><td>🖥️ CLI de CrewAI</td><td>'+extLink(docs+'concepts/cli','Todos los comandos')+'</td></tr>'
    +'<tr><td>🔨 Tools de CrewAI</td><td>'+extLink(docs+'concepts/tools','40+ herramientas')+'</td></tr>'
    +'<tr><td>🦙 Ollama</td><td>'+extLink('https://ollama.com','ollama.com')+'</td></tr>'
    +'<tr><td>🔍 Serper</td><td>'+extLink('https://serper.dev','serper.dev')+'</td></tr>'
    +'<tr><td>🤖 Modelos Gemini</td><td>'+extLink('https://ai.google.dev/gemini-api/docs/models','Catálogo de modelos')+'</td></tr>'
    +'<tr><td>🔑 API key Gemini</td><td>'+extLink('https://aistudio.google.com/apikey','AI Studio')+'</td></tr>'
  +'</table>'
  +'<div class="slide-end"><p class="takeaway">Experimenta con diferentes topics, modelos y herramientas. El mejor aprendizaje es probando.</p></div>';
}}

];} /* end makeSlides */
