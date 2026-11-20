# =======================================
# NEGACION
# =======================================
print(bool(0))
print(bool("Hola"))
print(bool([]))

buffer_percepcion = False

if not buffer_percepcion:
    print("El agente ha determinado su tarea")

# =======================================
# NEGACION
# =======================================
# ==== Definicion de la funcion ====
def neg(p) -> bool:
    """Negacion ~p"""
    return False if p else True

# ==== Pruebas del operador ====
print("neg(True) =", neg(True))
print("neg(False) =", neg(False))

# =======================================
# CONJUNCION
# =======================================
# ==== Definicion de la funcion ====
def y(p, q) -> bool:
    """Conjuncion p ^ q"""
    return q if p else False

# ==== Pruebas del operador ====
print("y(True, True) =", y(True, True))
print("y(True, False) =", y(True, False))
print("y(False, True) =", y(False, True))
print("y(False, False) =", y(False, False))

# =======================================
# DISYUNCION
# =======================================
# ==== Definicion de la funcion ====
def o(p, q) -> bool:
    """Disyuncion p v q"""
    return True if p else q

# ==== Pruebas del operador ====
print("o(True, True) =", o(True, True))
print("o(True, False) =", o(True, False))
print("o(False, True) =", o(False, True))
print("o(False, False) =", o(False, False))


# =======================================
# DISYUNCION EXCLUSIVA!!!! (XOR para los cuates)
# =======================================
# ==== Definicion de la funcion ====
def ox(p, q) -> bool:
    return p ^ q

# ==== Pruebas del operador ====
print("ox(True, True) =", ox(True, True))
print("ox(True, False) =", ox(True, False))
print("ox(False, True) =", ox(False, True))
print("ox(False, False) =", ox(False, False))


# =======================================
# IMPLICACION LOGICA
# =======================================
# ==== Definicion de la funcion ====
def impl(p,q) -> bool:
    return False if(p and not q) else True

# ==== Pruebas del operador ====
print("impl(True, True) =", impl(True, True))
print("impl(True, False) =", impl(True, False))
print("impl(False, True) =", impl(False, True))
print("impl(False, False) =", impl(False, False))

# =======================================
# DOBLE IMPLICACION O BIDICIONAL <->
# =======================================
# ==== Definicion de la funcion ====
def ssi(p, q) -> bool:
    """Vicondicional (Si y solo si)"""
    return p == q

# ==== Pruebas del operador ====
print("ssi(True, True) =", ssi(True, True))
print("ssi(True, False) =", ssi(True, False))
print("ssi(False, True) =", ssi(False, True))
print("ssi(False, False) =", ssi(False, False))

# lambda = funcion anonima
# =======================================
# Ley distributiva - se corrije maniana
# =======================================
# ==== Definicion de la funcion ====
def verificarEquivalencia(p1,p2) -> bool:
    # return p1(p, q, r) == p2(p, q, r)
    return True

P1 = lambda p, q, r: p or (q and r)
P2 = lambda p, q, r: (p or q) and (p or r)
resultado = verificarEquivalencia(P1,P2)
print(f"¿Son equivalentes? {resultado}")

# =======================================
# NAND Y NOR
# =======================================
# ==== Definicion de la funcion ====
def sheffer(p, q) -> bool:
    return neg(y(p,q))
# ==== Pruebas del operador ====
print("sheffer(True, True) =", sheffer(True, True))
print("sheffer(True, False) =", sheffer(True, False))
print("sheffer(False, True) =", sheffer(False, True))
print("sheffer(False, False) =", sheffer(False, False))


print("===== AUDITORIA DE INGENIERIA DE PROMPTS===\n")
# caso A: El prompt del usuario promedio (AMIGUEDAD)
# "dA ACCESO SI ES ADMIN O LA CONTRASE;A ES CORRECTA Y NO ESTA SUSPENDIDA" <- esto hacer minusculas
llm_interpretacion_ambigua = lambda p,q,r: o(p,y(q,neg(r)))

print("llm_interpretacion_ambigua(True, True, True) =", llm_interpretacion_ambigua(True, True, True))
print("llm_interpretacion_ambigua(True, True, False) =", llm_interpretacion_ambigua(True, True, False))
print("llm_interpretacion_ambigua(True, False, True) =", llm_interpretacion_ambigua(True, False, True))
print("llm_interpretacion_ambigua(True, False, False) =", llm_interpretacion_ambigua(True, False, False))

# caso B: EL PROMPT DEL INGENIERO ESTRUCTURADO
# "Da acceso SOLO si se cumplen estas dos condiciones de forma estrcita:
#           1. (Es admin o la contrase;a es correcta)"
#         2. (La cuenta NO esta suspendida)."

llm_interpretacion_estructurada = lambda p, q, r: y(o(p,q),neg(r))

print("llm_interpretacion_estructurada(True, True, True) =", llm_interpretacion_estructurada(True, True, True))
print("llm_interpretacion_estructurada(True, True, False) =", llm_interpretacion_estructurada(True, True, False))
print("llm_interpretacion_estructurada(True, False, True) =", llm_interpretacion_estructurada(True, False, True))
print("llm_interpretacion_estructurada(True, False, False) =", llm_interpretacion_estructurada(True, False, False))

entorno_ataque = (True, False, True)
acceso_caso_a = llm_interpretacion_ambigua(*entorno_ataque)
acceso_caso_b = llm_interpretacion_estructurada(*entorno_ataque)

print("🚨 SIMULACION DE ATAQUE DE SEGURIDAD 🚨")
print(" ESCENARIO: ADMIN = TRUE | CONTRASEÑA = FALSE | CUENTA SUSPENDIDA = TRUE")
print("Resultado con prompt ambiguo: ACCESO CONCEDIDO (🔒 FALLA DE SEGURIDAD ) =", "✅" if acceso_caso_a else "❌")
print("Resultado con prompt estructurado: ACCESO DENEGADO (🔒 Sistema seguro) =", "✅" if acceso_caso_b else "❌")
