export const defaultCode = {
  javascript: `// Bem-vindo à IDE CodeKids! 🚀
// Vamos criar algo incrível juntos!

console.log("Olá, mundo! 🌟");

// Vamos criar uma função divertida
function saudar(nome) {
    return "Oi, " + nome + "! Pronto para programar? 🎉";
}

// Teste a função
console.log(saudar("Programador"));

// Desafio: Crie uma função que calcule a idade em dias
function idadeEmDias(anos) {
    return anos * 365;
}

console.log("10 anos são " + idadeEmDias(10) + " dias! 📅");`,

  lua: `-- Bem-vindo à programação Lua! 🌙
-- Lua é uma linguagem simples e poderosa!

print("Olá, mundo Lua! ✨")

-- Vamos criar uma função
function saudar(nome)
    return "Oi, " .. nome .. "! Vamos explorar Lua! 🚀"
end

-- Teste a função
print(saudar("Explorador"))

-- Trabalhando com tabelas (arrays em Lua)
local frutas = {"maçã", "banana", "laranja"}

print("Minhas frutas favoritas:")
for i, fruta in ipairs(frutas) do
    print(i .. ". " .. fruta .. " 🍎")
end

-- Exemplo com matemática
local numero = math.random(1, 10)
print("Número aleatório: " .. numero)

-- Execute o código e veja a magia do Lua! ✨`,

  python: `# Bem-vindo ao Python! 🐍
# Python é perfeito para iniciantes!

print("Olá, mundo Python! 🌟")

# Vamos criar uma função
def saudar(nome):
    return f"Oi, {nome}! Vamos aprender Python! 🎉"

# Teste a função
print(saudar("Pythonista"))

# Trabalhando com listas
frutas = ["maçã", "banana", "laranja"]

print("Minhas frutas favoritas:")
for i, fruta in enumerate(frutas, 1):
    print(f"{i}. {fruta} 🍎")

# Desafio: Crie um jogo de adivinhação simples
import random

numero_secreto = random.randint(1, 10)
print(f"Número gerado entre 1 e 10: {numero_secreto}")
print("Execute o código e veja a mágica do Python! ✨")`,
};
