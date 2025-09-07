# Guia de Integração do Frontend - Portal de Aplicações de Manutenção

## Organização Recomendada de Pastas

O ideal é manter este frontend em uma pasta separada dos projetos Flask (backends), funcionando como um portal independente. Assim, cada aplicação pode ser atualizada ou reiniciada sem afetar o portal.

Exemplo de estrutura:

```
/portal-frontend/        ← Este projeto (index.html, style.css, etc)
/app-notas-fiscais/      ← Projeto Flask 1
/app-demandas/           ← Projeto Flask 2
/app-pm05/               ← Projeto Flask 3
...
```

O frontend referencia cada aplicação Flask via URL, facilitando manutenção, deploy e escalabilidade.

---

## 1. Estrutura do Projeto

- `index.html`: Página principal do portal.
- `style.css`: Estilos visuais (glassmorphism, gradientes, responsividade).
- `script.js`: Lógica do menu/carrossel e interatividade.
- `wordcloud.js`: Nuvem de palavras animada.
- `assets/`: Imagens e logos.

## 2. Como Referenciar Suas Aplicações Flask

Cada aplicação Flask deve ser acessível por uma URL (pode ser IP, domínio ou localhost com porta diferente).

### Exemplo de URLs:
- Notas Fiscais: `http://10.0.0.10:5001`
- Demandas: `http://10.0.0.10:5002`
- PM05: `http://10.0.0.10:5003`
- Gerador de Etiqueta: `http://10.0.0.10:5004`
- Catálogo de Estoque: `http://10.0.0.10:5005`

### Como Integrar no Frontend

No arquivo `index.html`, cada card do menu carrossel tem um atributo `onclick`. Basta substituir pelo endereço da aplicação correspondente:

```html
<div class="carousel-item" onclick="window.open('http://10.0.0.10:5001', '_blank')">
  <i class="fas fa-file-invoice"></i>
</div>
```

Repita para cada card, mudando a URL.

- Use `window.open(url, '_blank')` para abrir em nova aba.
- Use `window.location.href=url` para abrir na mesma aba.

## 3. Personalização

- Altere ícones e textos dos cards conforme sua necessidade.
- Troque a imagem da logo em `assets/` e ajuste o nome no HTML.
- Edite as palavras da nuvem em `wordcloud.js`.
- Ajuste cores e efeitos em `style.css`.

## 4. Hospedagem

- Pode ser hospedado em qualquer servidor web (Nginx, Apache, Python SimpleHTTPServer, etc).
- Basta servir os arquivos estáticos.

## 5. Dicas

- Mantenha as URLs das aplicações Flask sempre atualizadas.
- Para maior segurança, use HTTPS e autenticação nas aplicações Flask.
- O frontend é independente: pode ser usado com qualquer backend que forneça uma URL.

---

Dúvidas ou sugestões? Fale com Hendel Santos ou Ederson Moraes.
