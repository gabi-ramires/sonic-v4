# 🚀 Como Fazer Deploy no Render

## 📋 Pré-requisitos
- Conta no [Render](https://render.com)
- Projeto no GitHub/GitLab/Bitbucket
- Node.js 18+ instalado localmente

## 🔧 Passos para Deploy

### 1. **Preparar o Projeto Localmente**
```bash
# Instalar dependências
npm install

# Fazer build do projeto
npm run build

# Testar localmente
npm run preview
```

### 2. **Subir para o GitHub**
```bash
git add .
git commit -m "Configuração para deploy no Render"
git push origin main
```

### 3. **Configurar no Render**

#### A. Criar Nova Web Service
1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub

#### B. Configurações do Serviço
- **Name**: `sonic-runner-game`
- **Environment**: `Node`
- **Region**: Escolha a mais próxima
- **Branch**: `main`
- **Build Command**: `npm run render-build`
- **Start Command**: `npm start`
- **Auto-Deploy**: ✅ Ativado

#### C. Variáveis de Ambiente
- `NODE_ENV`: `production`
- `NODE_VERSION`: `18`

### 4. **Deploy Automático**
- O Render fará o deploy automaticamente
- Aguarde a mensagem "Deploy successful"
- Seu jogo estará disponível em: `https://seu-projeto.onrender.com`

## 🎮 Testando o Deploy
1. Acesse a URL fornecida pelo Render
2. Teste todas as funcionalidades do jogo
3. Verifique se os controles funcionam
4. Teste em diferentes dispositivos

## 🔧 Solução de Problemas

### Build Falhou
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js 18+ está sendo usado
- Verifique os logs de build no Render

### Jogo Não Carrega
- Verifique se o build foi bem-sucedido
- Confirme se o `startCommand` está correto
- Verifique os logs de runtime no Render

### Assets Não Carregam
- Confirme se o `base: "./"` está no `vite.config.js`
- Verifique se a pasta `dist` foi criada corretamente

## 📱 URLs Importantes
- **Local**: `http://localhost:3000`
- **Render**: `https://seu-projeto.onrender.com`
- **GitHub**: `https://github.com/seu-usuario/seu-repo`

## 🎯 Dicas
- Sempre teste localmente antes do deploy
- Use o auto-deploy para atualizações automáticas
- Monitore os logs para identificar problemas
- Configure alertas de saúde do serviço

---

**🎮 Seu jogo do Sonic estará rodando na nuvem em poucos minutos!** 