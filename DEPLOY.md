# Deploy no GitHub Pages

Este projeto está configurado para fazer deploy automático no GitHub Pages sempre que houver um merge para a branch `main`.

## Configuração Inicial

Para ativar o deploy automático, siga estes passos:

### 1. Habilitar GitHub Pages no repositório

1. Vá até o repositório no GitHub: https://github.com/HASH3-dev/minijs-docs
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Origem), selecione:
   - Source: **GitHub Actions**

### 2. Verificar permissões do Workflow

1. Ainda em **Settings**, vá em **Actions** → **General**
2. Na seção **Workflow permissions**, certifique-se de que:
   - ✅ **Read and write permissions** está marcado
   - ✅ **Allow GitHub Actions to create and approve pull requests** está marcado (opcional)

### 3. Fazer o primeiro deploy

Após as configurações acima, basta fazer um push ou merge para a branch `main`:

```bash
git add .
git commit -m "Add GitHub Actions deploy workflow"
git push origin main
```

## Como funciona

O workflow de deploy (`.github/workflows/deploy.yml`) executa automaticamente quando há push para `main`:

1. **Checkout**: Clona este repositório (docs) e o repositório do MiniJS
2. **Setup MiniJS**: 
   - Instala as dependências do MiniJS (`npm ci`)
   - Builda os pacotes do MiniJS (`npm run build`)
   - Cria links globais dos pacotes (`npm run link`)
3. **Build Docs**: 
   - Instala as dependências da documentação
   - Linka os pacotes do MiniJS ao projeto
   - Builda o projeto com `npm run build`
4. **Deploy**: Faz upload dos arquivos da pasta `dist` para o GitHub Pages
5. **URL**: O site ficará disponível em: `https://hash3-dev.github.io/minijs-docs/`

### Por que clonar o MiniJS?

Os pacotes do MiniJS (`@mini/core`, `@mini/router`, `@mini/vite-plugin`) ainda não foram publicados no npm. Portanto, o workflow clona o repositório do MiniJS, builda os pacotes localmente e usa `npm link` para disponibilizá-los para o build da documentação.

## Estrutura do Workflow

- **Trigger**: Push para branch `main`
- **Jobs**:
  - `build`: Builda o projeto e prepara os arquivos
  - `deploy`: Faz o deploy no GitHub Pages

## Configurações do Vite

O `vite.config.ts` foi configurado com o base path correto para o GitHub Pages:

```typescript
base: process.env.NODE_ENV === "production" ? "/minijs-docs/" : "/"
```

Isso garante que todos os assets sejam carregados corretamente no ambiente de produção.

## Monitoramento

Para verificar o status do deploy:

1. Vá na aba **Actions** do repositório
2. Clique no último workflow executado
3. Veja os logs de build e deploy

## Troubleshooting

Se o deploy falhar:

- Verifique os logs na aba Actions
- Certifique-se de que o build funciona localmente: `npm run build`
- Verifique se as permissões do GitHub Actions estão corretas
- Confirme que a origem do GitHub Pages está configurada como "GitHub Actions"
