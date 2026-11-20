#!/bin/bash

PROJECT_DIR="/home/zapata/Documents/Uni/Fundamentos_IA/Unidad_1/crewai/taller_crewai"
RESULTS_DIR="$PROJECT_DIR/results"

# change to the project directory
cd "$PROJECT_DIR"

# run the crewai command
/home/zapata/.cargo/bin/uv run crewai run

# open the results directory
cd "$RESULTS_DIR"
xdg-open .
