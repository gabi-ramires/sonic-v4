# 🚀 Como Fazer Deploy do Sonic Runner Game

## 📋 Pré-requisitos
- Conta no [GitHub](https://github.com) com o projeto `sonic-v4`
- Credenciais FTP para `sonic.gamer.gd` configuradas como GitHub Secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- Node.js 18+ instalado localmente (para testes e desenvolvimento)

## 🔧 Passos para Deploy

### 1. **Preparar o Projeto Localmente**
```bash
# Instalar dependências
npm install

# Fazer build do projeto (opcional para testes locais)
npm run build

# Testar localmente (opcional, requer o server.js para servir os arquivos)
npm run preview
```

### 2. **Configurar GitHub Secrets (se ainda não o fez)**
Para o GitHub Actions conseguir se conectar ao seu servidor FTP, você precisa configurar as seguintes variáveis de ambiente como "Secrets" no seu repositório GitHub:
- `FTP_SERVER`: Endereço do seu servidor FTP.
- `FTP_USERNAME`: Nome de usuário do FTP.
- `FTP_PASSWORD`: Senha do FTP.

Você pode fazer isso em: `Seu Repositório` -> `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.

### 3. **Deploy Automático via GitHub Actions**
O deploy para `https://sonic.gamer.gd/` é configurado para ser totalmente automático através do GitHub Actions.
1.  **Faça suas alterações no código localmente.**
2.  **Commit e push para a branch `master` do seu repositório GitHub.**
    ```bash
    git add .
    git commit -m "Minha mensagem de commit"
    git push origin master
    ```
3.  **O GitHub Action `deploy.yml` será automaticamente acionado.**
    -   Ele instalará as dependências.
    -   Executará o comando `npm run build`, que gerará os arquivos estáticos do seu jogo na pasta `dist/`.
    -   Copiará o conteúdo da pasta `dist/` para o diretório `htdocs/` do seu servidor FTP em `sonic.gamer.gd`.
4.  **Aguarde a conclusão do workflow.** Você pode acompanhar o progresso em `Seu Repositório` -> `Actions`.

### 4. **Verificar a Integração do Servidor (se necessário)**
Como o `server.js` não é utilizado no ambiente de produção via FTP, certifique-se de que o seu servidor web (Apache, Nginx, etc.) esteja configurado para:
-   Servir arquivos estáticos do diretório `/htdocs/`.
-   Para SPAs (Single Page Applications) como este, reescrever URLs para `index.html` (ex: configurações de `mod_rewrite` para Apache ou `try_files` para Nginx) para que todas as rotas sejam tratadas pelo seu aplicativo Vue/Vite.

## 🎮 Testando o Deploy
1.  Acesse a URL de produção: `https://sonic.gamer.gd/`
2.  Testar todas as funcionalidades do jogo.
3.  Verifique se os controles e assets funcionam corretamente.
4.  Teste em diferentes navegadores e dispositivos.

## 🔧 Solução de Problemas

### Build Falhou no GitHub Actions
-   Verifique os logs do workflow no GitHub Actions para mensagens de erro.
-   Confirme se todas as dependências estão listadas no `package.json`.
-   Verifique se o Node.js 18+ está sendo usado no ambiente de build do GitHub Actions (geralmente é configurado automaticamente, mas pode ser especificado).

### Jogo Não Carrega ou Exibe Erros no Servidor
-   Verifique se o build foi bem-sucedido no GitHub Actions.
-   Confirme se a pasta `dist` está sendo gerada corretamente.
-   Verifique se os arquivos foram transferidos para o diretório `htdocs/` via FTP.
-   Inspecione o console do navegador e a aba de rede para erros de carregamento de recursos ou de JavaScript.

### Assets (imagens, sons) Não Carregam
-   Confirme se a opção `base: "./"` está configurada corretamente no seu `vite.config.js`. Isso garante que os caminhos dos assets sejam relativos à raiz do deploy.
-   Verifique as permissões dos arquivos e pastas no servidor FTP.

## 📱 URLs Importantes
-   **Local**: `http://localhost:3000` (quando rodando `npm run dev` ou `npm run preview` localmente)
-   **GitHub**: `https://github.com/gabi-ramires/sonic-v4` (assumindo este é o URL do seu repositório)
-   **Produção**: `https://sonic.gamer.gd/`

## 🎯 Dicas
-   Sempre teste suas alterações localmente antes de fazer o push para a branch `master`.
-   Monitore os logs do GitHub Actions para identificar e resolver problemas de deploy rapidamente.
-   Faça commits pequenos e frequentes para facilitar o rastreamento de problemas.

---

**🎮 Seu jogo do Sonic estará rodando online em `https://sonic.gamer.gd/` após cada push para a branch `master`!** 