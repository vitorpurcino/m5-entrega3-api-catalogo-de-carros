# Catalogo de Carros - API
### Objetivo
`Construir uma API de cadastro de automóveis (carros) com testes de validação das rotas e erros previstos no desenvolvimento da API. `
`Kenzie Academy Brasil - Módulo 5 - Entrega 3 - Desenvolvendo e testado uma API de catálogo de carros.`
***

# Comportamentos esperados
## POST /cars
### Padrão de corpo
```json
{
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}
```
### Padrão Resposta - Status (201)
```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}
```
### Possíveis erros:
STATUS (400) quando o corpo não é compatível com o padrão

**Utilize o Zod para fazer a validação correta do corpo de requisição.**

## GET /cars
### Padrão de resposta - Status (200)
```json
   {
      "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
      "name": "Car name",
      "description": "Car description",
      "brand": "Card brand",
      "year": 2023,
      "km": 10000
   }
```
## GET /cars/:id
### Padrão de resposta - Status (200)
```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000
}
```
### Possíveis erros:
**Status (404) - Carro não encontrado**
```json
{
    "message": "Car not found."
}
```
## PATCH /cars/:id
Atualização de veículo já cadastrado
### Padrão de corpo - Todos os campos deverão ser opcionais na atualização.
```json
{
    "name": "Car name updated",
    "description": "Car description updated",
    "brand": "Card brand updated",
    "year": 2022,
    "km": 20000
}
```
### Padrão de resposta - Status (200)
```json
{
    "id": "fe111d24-1b79-44df-931b-4c9fd5859014",
    "name": "Car name updated",
    "description": "Car description updated",
    "brand": "Card brand updated",
    "year": 2022,
    "km": 20000
}
```
### Possíveis erros:
STATUS (400) quando o corpo não é compatível com o padrão

**Utilize o Zod para fazer a validação correta do corpo de requisição.**

**Status (404) - Carro não encontrado**
```json
{
    "message": "Car not found."
}
```
## DELETE /cars/:id
Está rota não tem um corpo de resposta, em caso sucesso o Status retornando deverá ser o 204.

### Possíveis erros:
**Status (404) - Carro não encontrado**
```json
{
    "message": "Car not found."
}
```
