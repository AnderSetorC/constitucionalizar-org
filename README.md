# Associação Constitucionalizar - Landing Page

Landing page responsiva para a Associação Constitucionalizar, otimizada para campanhas de Google Ads e conversão em associados/doadores.

## 🎨 Sobre

A Associação Constitucionalizar defende o direito de ir e vir de motorcampistas, campistas, turistas e cidadãos. A página tem como objetivo converter visitantes em **associados** (R$ 30/mês) e **doadores voluntários**, e capturar leads qualificados via download gratuito do e-book "Pílulas da Constituição".

## 🛠️ Stack

- **HTML5** + **CSS3** (responsivo, mobile-first) + **JavaScript vanilla**
- **Zero dependências externas** — sem build tool, sem framework
- Deploy estático via [Vercel](https://vercel.com)

### Otimizações já implementadas

- ✅ Imagens em **AVIF + WebP** com fallback (`<picture>`)
- ✅ Logo em múltiplas resoluções (256/512px) com `srcset`
- ✅ `loading="lazy"` em imagens abaixo da dobra
- ✅ `decoding="async"` e `fetchpriority="high"` no logo
- ✅ CSS Variables (`:root`) para cores/tipografia/espaçamentos
- ✅ Cache imutável de 1 ano para assets no Vercel
- ✅ Headers de segurança: `HSTS`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`
- ✅ Acessibilidade: `prefers-reduced-motion`, `aria-*`, foco visível, semântica HTML5

## 🎯 Cores do Brasil (variáveis CSS)

| Variável | Valor | Uso |
|---|---|---|
| `--brasil-verde` | `#009C3B` | Cor primária |
| `--brasil-verde-escuro` | `#006827` | Header, urgência, footer |
| `--brasil-verde-claro` | `#00A94F` | Hover gradiente |
| `--brasil-amarelo` | `#FFDF00` | Destaques, badges, bordas |
| `--brasil-amarelo-escuro` | `#C9A800` | Hover amarelo |
| `--brasil-azul` | `#002776` | Acentos (raro) |

## 📁 Estrutura de pastas

```
constitucionalizar-org/
├── index.html              # Página principal (13 seções)
├── styles.css              # Estilos responsivos (1 arquivo monolítico)
├── script.js               # Interatividade (smooth scroll, form, tracking)
├── vercel.json             # Configuração de deploy (cache + headers)
├── README.md               # Este arquivo
├── .gitignore              # Exclusões do git
│
└── assets/
    ├── images/
    │   ├── banner/         # Fotos principais (motor-home.*)
    │   ├── watermark/      # Marca d'água da bandeira do Brasil
    │   ├── donation/       # Imagem da seção de doação
    │   └── logo/           # Logo em AVIF/WebP (256/512px)
    └── favicon/            # Favicon ICO + PNG 16/32/48
```

## 🧩 Seções da página (em ordem)

1. **Header** — Logo + título + subtítulo
2. **Hero** — Pergunta de impacto + causa (motocampistas, campistas, turistas)
3. **Visual** — Foto do motorhome na praia com legenda
4. **Transformation** — Frase de mobilização em fundo amarelo
5. **Principles** — 3 princípios com ícone de check
6. **Why Join** — 4 razões para se associar
7. **Urgency** — CTA de urgência (fundo verde escuro)
8. **E-book** — Formulário de captura de lead (Pílulas da Constituição)
9. **Pricing** — Card do plano R$ 30/mês
10. **Final CTA** — Botões "Conhecer" e "Associar-se"
11. **Donation** — Seção de doação voluntária com SVG ilustrativo
12. **Social** — Link único para bio.bob.app.br (todas as redes)
13. **Footer** — CNPJ, domínio, frase de efeito

Mais: marca d'água da bandeira (decorativa) e botão flutuante do WhatsApp.

## 🚀 Como rodar localmente

O projeto não tem build step. Basta abrir o `index.html` no navegador:

```bash
# Opção 1: abrir direto
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux

# Opção 2: servidor local (recomendado para testar Service Workers ou futuras features)
npx serve                 # ou
python -m http.server 8000
```

## 📦 Como adicionar uma nova imagem

1. **Otimize a imagem original** usando [squoosh.app](https://squoosh.app) ou CLI:
   ```bash
   # WebP (~30% menor que JPG)
   cwebp -q 80 original.jpg -o imagem.webp
   # AVIF (~50% menor que JPG)
   avifenc --min 20 --max 30 original.jpg imagem.avif
   ```
2. **Coloque os 3 arquivos** (`.jpg`, `.webp`, `.avif`) em `assets/images/<categoria>/` com nomenclatura kebab-case (ex: `doacao.jpg`, `doacao.webp`, `doacao.avif`).
3. **No HTML**, use o padrão `<picture>`:
   ```html
   <picture>
       <source type="image/avif" srcset="assets/images/<categoria>/imagem.avif">
       <source type="image/webp" srcset="assets/images/<categoria>/imagem.webp">
       <img src="assets/images/<categoria>/imagem.jpg"
            alt="Descrição acessível da imagem"
            loading="lazy"
            decoding="async">
   </picture>
   ```
4. **Atualize o `alt`** para acessibilidade (leitores de tela).
5. **Cache:** ao substituir uma imagem existente com mesmo nome, **use nome novo** (ex: `motor-home-v2.jpg`) para evitar cache imutável de 1 ano servindo a versão antiga.

## 🧱 Como adicionar uma nova seção

1. **HTML** — Adicione a `<section class="nome-da-secao" id="ancora">` no `index.html` na ordem desejada.
2. **CSS** — Estilos vão ao final do `styles.css` (organizado por seção, com comentário `/* ==== NOME ==== */`).
3. **JS** — Se precisar de comportamento (ex: validação, tracking, animação), adicione no `script.js` ou crie uma nova função de inicialização.
4. **Tracking de CTA** — Use a classe `.cta-button` para que o tracking de Google Ads funcione automaticamente.
5. **Animações de scroll** — Adicione o seletor em `initScrollAnimations()` no `script.js` (variável `animatedElements`).

## 📊 Google Ads

A página já está instrumentada para Google Ads Conversion Tracking. Para ativar:

1. Adicione o script no `<head>` do `index.html` (substitua o bloco comentado, linhas 19-28):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'AW-XXXXXXXXX');
   </script>
   ```
2. Substitua `AW-XXXXXXXXX` pelo seu ID de conversão.
3. Os CTAs com classe `.cta-button` e texto contendo "ASSOCIAR" disparam `gtag_report_conversion` automaticamente.

## 🔐 Segurança

Headers configurados em [`vercel.json`](vercel.json):

| Header | Valor | Função |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | Bloqueia MIME sniffing |
| `X-Frame-Options` | `DENY` | Impede embedding em iframes |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita info de referrer |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Força HTTPS por 1 ano |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Desabilita APIs sensíveis |
| `X-XSS-Protection` | `0` | Desabilita filtro XSS legado (CSP cuida) |

CSP (Content-Security-Policy) será adicionado em uma fase posterior, junto com a ativação real do Google Ads.

## 💾 Estratégia de cache (Vercel)

| Recurso | Duração | Header |
|---|---|---|
| Imagens, CSS, JS, fontes (assets estáticos) | 1 ano (imutável) | `Cache-Control: public, max-age=31536000, immutable` |
| `index.html` (revalidado a cada deploy) | Default Vercel | revalidação condicional |

A regex `(.*)\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|avif)` casa em qualquer profundidade de pasta, então assets em `assets/images/...` herdam o cache de 1 ano.

## 📱 Responsividade

- **Mobile:** ≤ 480px
- **Tablet:** ≤ 768px
- **Desktop:** > 768px
- **`prefers-reduced-motion`:** Animações e transições desabilitadas quando o usuário tem motion reduzido nas preferências do SO.

## 🔗 Links de Conversão

- **Conhecer a Associação:** `https://www.constitucionalizar.org.br`
- **Associar-se Agora:** `https://www.constitucionalizar.org.br/#section-planos`
- **Doação (checkout):** `https://constitucionalizar.preview.betalabs.net/checkout/cart?code=a3e71310-6e63-11f1-b686-06d9ca475ff5`
- **Bio (redes sociais):** `https://bio.bob.app.br/constitucionalizar-org`

## 📝 Licença

Projeto institucional - Associação Constitucionalizar (CNPJ 66.183.479/0001-57)
