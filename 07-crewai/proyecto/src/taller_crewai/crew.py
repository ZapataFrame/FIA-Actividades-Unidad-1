import os
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.llm import LLM
from dotenv import load_dotenv
from crewai_tools import SerperDevTool

search_tool = SerperDevTool()

load_dotenv()
ollama_llm = LLM(
    model="ollama/gemma4",
    base_url=os.getenv("OLLAMA_BASE_URL", "https://ollama.com"),
    api_key=os.getenv("OLLAMA_API_KEY")
)

@CrewBase
class TallerCrewai():
    """TallerCrewai crew"""

    agents: list[BaseAgent]
    tasks: list[Task]

    @agent
    def investigador_tendencias(self) -> Agent:
        return Agent(
            config=self.agents_config['investigador_tendencias'],
            verbose=True,
            llm=ollama_llm,
            tools=[search_tool]
        )

    @agent
    def redactor_noticias(self) -> Agent:
        return Agent(
            config=self.agents_config['redactor_noticias'],
            verbose=True,
            llm=ollama_llm
        )

    @task
    def tarea_investigacion(self) -> Task:
        return Task(
            config=self.tasks_config['tarea_investigacion'],
        )

    @task
    def tarea_redaccion(self) -> Task:
        return Task(
            config=self.tasks_config['tarea_redaccion']
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
