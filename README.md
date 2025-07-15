# ClickBeard - Sistema de Agendamento para Barbearia

> **Observação:** Fiquei em dúvida se deveria usar Next.js, pois o PDF não mencionava esse requisito. Assim, optei por desenvolver o frontend apenas com **React**. Além disso, o visual não ficou tão elaborado, pois executei o desafio somente após meu expediente e o tempo era limitado.

Sistema  para gerenciamento de agendamentos de barbearia, desenvolvido com Node.js (NestJS) no backend e React com TypeScript no frontend.

## 🚀 Tecnologias Utilizadas

### Backend

* **Node.js** com **NestJS**
* **TypeScript**
* **Prisma ORM**
* **MySQL**
* **JWT** para autenticação
* **Docker** para o banco de dados

### Frontend

* **React** com **TypeScript**
* **React Router DOM** para navegação
* **React Hook Form** + **Zod** para validação
* **Axios** para requisições HTTP
* **CSS** puro para estilização

### . Configure o Frontend

```bash
git clone https://github.com/LucasMGaspar/ClickbeardFrontend.git

```bash
cd clickbeard-frontend
```
```bash
npm install
```

#### 3.3. Inicie a aplicação

```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`

## 🎮 Como usar

### Como Cliente (USER)

1. **Cadastro**: Acesse a aplicação e clique em "Cadastre-se"
2. **Login**: Entre com seu email e senha
3. **Agendar**:

   * Clique em "Novo Agendamento"
   * Escolha a especialidade desejada
   * Selecione o barbeiro
   * Escolha a data (exceto domingos)
   * Selecione um horário disponível
4. **Cancelar**: Você pode cancelar agendamentos com até 2h de antecedência

Como admin você pode:

* Cadastrar novos barbeiros
* Criar especialidades
* Visualizar todos os agendamentos

## 🏗️ Estrutura do Projeto

### Frontend

```
clickbeard-frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos React
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços de API
│   ├── types/          # Tipos TypeScript
│   └── App.tsx         # Componente principal
└── package.json
```

## Regras de Negócio

1. **Horário de funcionamento**: 8h às 18h
2. **Dias de funcionamento**: Segunda a Sábado (fechado aos domingos)
3. **Duração do atendimento**: 30 minutos
4. **Cancelamento**: Mínimo 2 horas de antecedência
5. **Agendamento**: Apenas em horários futuros

### Erro ao criar agendamento

* Verifique se o barbeiro possui a especialidade selecionada
* Confirme que o horário está disponível
* Certifique-se que não é domingo
