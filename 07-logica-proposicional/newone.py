"""
Sistema de Operadores Lógicos y Motor de Inferencia
Simula validación de seguridad con lógica proposicional
"""

from inspect import signature


# ===============================================
# PARTE 1: OPERADORES LÓGICOS BASE
# ===============================================

def neg(p) -> bool:
    """Negación: ~p"""
    return False if p else True


def y(p, q) -> bool:
    """Conjunción: p ∧ q"""
    return q if p else False


def o(p, q) -> bool:
    """Disyunción: p ∨ q"""
    return True if p else q


print("✓ Operadores base (neg, y, o) cargados en memoria.\n")


# ===============================================
# PARTE 2: MOTOR DE INFERENCIA
# ===============================================

def aridad(fun) -> int:
    """
    Obtiene la cantidad de parámetros que requiere una función.

    Args:
        fun: Función a analizar

    Returns:
        int: Número de parámetros
    """
    return len(signature(fun).parameters)


def casos_prueba(n: int, res=None) -> list:
    """
    Genera recursivamente todas las 2^n combinaciones booleanas posibles.

    Args:
        n: Número de variables booleanas
        res: Acumulador (uso interno)

    Returns:
        list: Lista de todas las combinaciones [True/False]^n
    """
    if res is None:
        res = [[]]

    if n == 0:
        return res

    # Agregar True y False al inicio de cada combinación previa
    res_true = list(map(lambda t: [True] + t, res))
    res_false = list(map(lambda t: [False] + t, res))

    return casos_prueba(n - 1, res_true + res_false)


def vector_resultados(predicado) -> list:
    """
    Evalúa un predicado en todos sus casos de prueba.

    Args:
        predicado: Función lógica a evaluar

    Returns:
        list: Columna de resultados booleanos para todas las combinaciones
    """
    ar = aridad(predicado)

    if ar == 0:
        return [predicado()]

    combinaciones = casos_prueba(ar)
    return list(map(lambda t: predicado(*t), combinaciones))


def logicamente_equivalente(predicado1, predicado2) -> bool:
    """
    Verifica si dos predicados son lógicamente equivalentes.
    Compara si sus vectores de resultados son idénticos: P ≡ Q

    Args:
        predicado1: Primer predicado
        predicado2: Segundo predicado

    Returns:
        bool: True si son equivalentes, False en caso contrario
    """
    return vector_resultados(predicado1) == vector_resultados(predicado2)


# ===============================================
# PARTE 3: DEFINICIÓN DE ESCENARIOS
# ===============================================

# Prompt ambiguo: p ∨ (q ∧ ~r)
prompt_ambiguo = lambda p, q, r: o(p, y(q, neg(r)))

# Prompt estructurado: (p ∨ q) ∧ ~r
prompt_estructurado = lambda p, q, r: y(o(p, q), neg(r))


# ===============================================
# PARTE 4: SIMULACIÓN DE ATAQUE DE SEGURIDAD
# ===============================================

# Escenario: (administrador, contraseña_correcta, cuenta_suspendida)
entorno_ataque = (True, False, True)

# Evaluación de decisiones
decision_ambigua = prompt_ambiguo(*entorno_ataque)
decision_estructurada = prompt_estructurado(*entorno_ataque)

# Resultados
print("=" * 55)
print("SIMULACIÓN DE ATAQUE DE SEGURIDAD")
print("=" * 55)
print("\n📋 Escenario actual:")
print(f"   • Es administrador:        {entorno_ataque[0]}")
print(f"   • Contraseña correcta:     {entorno_ataque[1]}")
print(f"   • Cuenta suspendida:       {entorno_ataque[2]}")

print("\n🔓 Decisión con prompt AMBIGUO [p ∨ (q ∧ ~r)]:")
print(f"   Resultado: {decision_ambigua}")
print(f"   → {'⚠️  ACCESO CONCEDIDO - Sistema vulnerable' if decision_ambigua else '✓ Acceso denegado'}")

print("\n🔐 Decisión con prompt ESTRUCTURADO [(p ∨ q) ∧ ~r]:")
print(f"   Resultado: {decision_estructurada}")
print(f"   → {'⚠️  ACCESO CONCEDIDO - Sistema vulnerable' if decision_estructurada else '✓ Acceso denegado'}")

print("\n" + "=" * 55)
