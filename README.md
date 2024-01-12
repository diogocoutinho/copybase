<p align="center">
  <img src="frontend/src/assets/copybase_logo.png" alt="Logo do CopyBase">
</p>

# CopyBase - Projeto para teste técnico

Este projeto foi desenvolvido para o teste técnico da CopyBase. O projeto consiste num sistema de cálculo de métricas a partir do ‘upload’ de uma planilha com modelo específico. O sistema foi desenvolvido com o ‘framework’ Nest.js no backend e Vue.js no frontend.

## Começando

Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Para executar o projeto, é recomendado o uso de docker e docker-compose. Caso não tenha, é necessário instalar o Node.js e o NPM para a execução deste sem docker.
Porém, para a execução do teste com cypress, é necessário ter Node.js e NPM instalados.

### Instalação

Para instalar o projeto, é necessário clonar o repositório e instalar as dependências.

```
git clone https://github.com/diogocoutinho/copybase.git
cd copybase
cd backend
cp .env.example .env
cd ~
docker-compose up -d
```

## Documentação da API

A documentação da API pode ser acessada em http://localhost:3000/api que foi gerada com o Swagger.

## Executando os testes

No backend, os testes podem ser executados com o comando:

```
cd backend
docker-compose exec backend npm run test
```

No frontend, os testes podem ser executados com o comando:

```
cd frontend
npm run cypress:open
```

## Desdobramento, desenvolvimento

Apesar de não ter experiencia com Nest.js, consegui desenvolver o backend com sucesso. O frontend foi desenvolvido com Vue.js, que é o ‘framework’ que tenho mais experiencia. O frontend foi desenvolvido para ser responsivo, mas não foi testado em dispositivos móveis.

## Construído com

* [Nest.js](https://nestjs.com/) - O framework web usado no backend
* [Vue.js](https://vuejs.org/) - O framework web usado no frontend
* [NPM](https://www.npmjs.com/) - Gestão de dependência
* [Cypress](https://www.cypress.io/) - Usado para testes de ponta a ponta para o frontend
* [Jest](https://jestjs.io/) - Usado para testes unitários para o backend

## Autores

* **Diogo C. Coutinho** - *GitHub* - [diogocoutinho](https://github.com/diogocoutinho) - *LinkedIn* - [diogocoutinho](https://www.linkedin.com/in/diogocoutinho/)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes

## Agradecimentos

* Agradeço a oportunidade de participar do processo seletivo.