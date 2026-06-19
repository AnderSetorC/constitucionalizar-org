# Associação Constitucionalizar - Landing Page

Landing page responsiva para a Associação Constitucionalizar, otimizada para campanhas de Google Ads.

## 🎨 Sobre

Landing page institucional com o objetivo de converter visitantes em associados da Associação Constitucionalizar, que defende o direito de ir e vir de motorcampistas, campistas, turistas e cidadãos.

## 🛠️ Tecnologias

- HTML5
- CSS3 (responsivo, mobile-first)
- JavaScript vanilla
- Sem dependências externas

## 🎯 Cores do Brasil

- **Verde**: #009C3B
- **Amarelo**: #FFDF00
- **Azul**: #002776

## 📁 Estrutura

```
├── index.html          # Página principal
├── styles.css          # Estilos responsivos
├── script.js           # Scripts de interatividade
├── vercel.json         # Configuração de deploy
└── logo certo 12-03.png # Logo da associação
```

## 🚀 Deploy no Vercel

### Opção 1: Via GitHub (recomendado)

1. Faça commit e push do projeto para o GitHub:
```bash
git init
git add .
git commit -m "feat: landing page Constitucionalizar"
git branch -M main
git remote add origin https://github.com/seu-usuario/constitucionalizar-landing.git
git push -u origin main
```

2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "New Project"
4. Importe o repositório do GitHub
5. Clique em "Deploy" (não precisa alterar nenhuma configuração)

### Opção 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints em:
- **Mobile**: até 480px
- **Tablet**: até 768px
- **Desktop**: acima de 768px

## 🔗 Links de Conversão

- **Conhecer a Associação**: `https://www.constitucionalizar.org.br`
- **Associar-se Agora**: `https://www.constitucionalizar.org.br/#section-planos`

## 📊 Google Ads

A página inclui:
- Tracking de cliques nos CTAs via `gtag`
- Suporte para `gtag_report_conversion` (Google Ads Conversion Tracking)
- Meta tags Open Graph para compartilhamento
- Estrutura semântica otimizada

### Para configurar o tracking do Google Ads:

1. Adicione o script do Google Ads no `<head>` do `index.html`:
```html
<!-- Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

2. Substitua `AW-XXXXXXXXX` pelo seu ID de conversão do Google Ads.

## ✨ Recursos

- ✅ 100% responsivo (mobile, tablet, desktop)
- ✅ Cores do Brasil (verde e amarelo)
- ✅ Logo circular com borda amarela
- ✅ Animações suaves ao rolar
- ✅ CTAs destacados
- ✅ Card de preço em destaque
- ✅ SEO otimizado (meta tags)
- ✅ Acessibilidade (foco visível, prefers-reduced-motion)
- ✅ Otimizado para performance (cache de assets)
- ✅ Headers de segurança configurados

## 📝 Licença

Projeto institucional - Associação Constitucionalizar
