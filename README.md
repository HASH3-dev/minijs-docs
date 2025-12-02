<div align="center">

# 📚 MiniJS Documentation

**Documentação oficial do MiniJS Framework**

Um framework JavaScript moderno, leve e poderoso para construção de aplicações web.

[🌐 Ver Documentação](https://hash3-dev.github.io/minijs-docs/) • [📦 Repositório MiniJS](https://github.com/HASH3-dev/minijs)

---

</div>

## ✨ Sobre

Este repositório contém a documentação completa do **MiniJS**, um framework JavaScript que oferece:

- 🚀 **Reatividade nativa** - Sistema reativo eficiente e intuitivo
- 🧩 **Componentização** - Componentes reutilizáveis e modulares
- 🛣️ **Roteamento integrado** - Sistema de rotas completo
- 💉 **Dependency Injection** - Gerenciamento de dependências robusto
- 🎯 **TypeScript First** - Suporte total e nativo ao TypeScript
- ⚡ **Performance** - Extremamente leve e rápido

## 🚀 Desenvolvimento Local

### Pré-requisitos

- Node.js 20+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/HASH3-dev/minijs-docs.git
cd minijs-docs

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📦 Estrutura do Projeto

```
minijs-docs/
├── src/
│   ├── features/          # Páginas de documentação
│   │   ├── (core)/       # Conceitos fundamentais
│   │   ├── (features)/   # Features avançadas
│   │   └── (gettingStarted)/ # Guia de início
│   ├── shared/           # Componentes compartilhados
│   │   └── components/   # UI components
│   └── styles/           # Estilos globais
├── .github/
│   └── workflows/        # CI/CD automatizado
└── public/               # Assets estáticos
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você encontrou um erro na documentação ou quer adicionar conteúdo:

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova seção sobre X'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 🔄 Deploy Automático

Este projeto utiliza GitHub Actions para deploy automático no GitHub Pages. Cada push para `main` dispara automaticamente:

1. Clone e build do MiniJS
2. Build da documentação
3. Deploy para GitHub Pages

Ver [`DEPLOY.md`](./DEPLOY.md) para mais detalhes sobre o processo de deploy.

## 🛠️ Tecnologias

- ⚡ **Vite** - Build tool ultrarrápido
- 🎨 **TailwindCSS** - Framework CSS utilitário
- 🎯 **TypeScript** - JavaScript com tipos
- 📝 **Marked** - Parser de Markdown
- 🌈 **Prism.js** - Syntax highlighting

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Documentação Online](https://hash3-dev.github.io/minijs-docs/)
- [Repositório MiniJS](https://github.com/HASH3-dev/minijs)
- [Reportar Bug](https://github.com/HASH3-dev/minijs-docs/issues)

---

<div align="center">

Feito com ❤️ pela equipe [HASH3](https://github.com/HASH3-dev)

</div>
