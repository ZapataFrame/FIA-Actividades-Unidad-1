#!/bin/bash

# Script para limpiar los datos

# ========
# Etapa 1
# ========
file_1="./oecd_bli_2015.csv"
file_2="./gdp_per_capita.csv"
dataset_merged="merged_data.csv"

echo "  Lines Words bytes"
wc $file_1
head -n 1 $file_1
# cat $file_1

echo "  Lines Words bytes"
wc $file_2
head -n 1 $file_2
# cat $file_2

# ========
# Etapa 2
# ========
sed 's/"//g' $file_1 | awk -F"," '(NR>1 && $3=="SW_LIFS" && $7=="TOT") {print $2","$15}' > temp1.csv


# ========
# Etapa 3
# ========
awk -F'\t' '(NR>1) {gsub(/,/, "");print $1","$6}' $file_2 > temp2.csv

# ========
# Etapa 4
# ========

sort -t"," -k1 temp1.csv > temp1_sorted.csv
sort -t"," -k1 temp2.csv > temp2_sorted.csv

join -t',' -1 1 -2 1 temp1_sorted.csv temp2_sorted.csv > merged_data.csv

sed -i '1i Pais,Satisfaccion_Vida,PIB_Capita' $merged_dataset

# ========
# Etapa 5
# ========

awk -F',' '(NR>1) {print $3}' $merged_dataset > x.csv
awk -F',' '(NR>1) {print $2}' $merged_dataset > y.csv
1
# clear temp files
rm temp1.csv temp1_sorted.csv temp2.csv temp2_sorted.csv

echo "Pipeline completado"

