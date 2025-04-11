<div align="center">
    <img src="https://github.com/user-attachments/assets/4297188e-459f-4d62-8fe1-e945b76c1fdf" width="250"/>
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
2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o banco de dados:
```bash
docker compose up -d
```

5. Inicie o servidor:
```bash
yarn start:dev
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