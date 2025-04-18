<div align="center">
    <img src="https://github.com/user-attachments/assets/1d64055c-721a-4d05-80e0-4eaf9b6ace33" width="250"/>
</div>

# Trabalho do bimestre - Desafio Profissional VII

Este projeto é um sistema de gerenciamento para um jogo de RPG (Role-Playing Game), desenvolvido em NestJS.

## Funcionalidades

### Personagens
- Cadastrar personagem
- Listar personagens
- Buscar personagem por ID
- Atualizar nome aventureiro
- Remover personagem
- Adicionar item mágico ao personagem
- Listar itens mágicos do personagem
- Remover item mágico do personagem
- Buscar amuleto do personagem

### Itens Mágicos
- Cadastrar item mágico
- Listar itens mágicos
- Buscar item mágico por ID
- Atualizar item mágico
- Remover item mágico

## Instalação

1. Clone o repositório

2. Inicie o banco de dados e a aplicação com Docker:
```bash
docker compose up -d
```

## Documentação da API

A documentação da API está disponível em `/api` quando o servidor estiver rodando.

### Personagens
- Cada personagem tem 10 pontos para distribuir entre força e defesa.
- Os valores de força e defesa são somados com os valores dos itens mágicos.
- As classes disponíveis são: Guerreiro, Mago, Arqueiro, Ladino e Bardo.

### Itens Mágicos
- Tipos: Arma, Armadura e Amuleto.
- Armas têm defesa obrigatoriamente zero.
- Armaduras têm força obrigatoriamente zero.
- Amuletos podem ter força e defesa.
- Um personagem só pode ter um amuleto.
- Os valores de força e defesa não podem exceder 10.
- Não podem existir itens com zero de força e zero de defesa.
