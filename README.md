# 🍰 Doces da Clau - Site Gourmet

Site moderno e elegante para a loja de doces gourmet "Doces da Clau".

## ✨ Características

- **Design Moderno**: Tema rosa elegante com animações suaves
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Páginas de Produtos Individuais**: Cada doce tem sua própria página
- **Sistema de Sabores**: Gerenciamento dinâmico de sabores por produto
- **Sistema de Disponibilidade**: Controle de disponibilidade (Disponível, Indisponível, Apenas Finais de Semana)
- **Integração WhatsApp**: Pedidos diretos via WhatsApp
- **Formulário de Pedidos**: Modal com formulário completo
- **Animações Premium**: Efeitos hover, glassmorphism, parallax e muito mais

## 📦 Produtos Disponíveis

1. **Pudins Mini** (Apenas finais de semana)
2. **Cones Trufados**
3. **Trufas Gourmet**
4. **Geladinhos Gourmet**
5. **Brigadeiros**
6. **Beijinhos**
7. **Brigadeiro de Ninho**

## 🚀 Como Usar

1. Abra `index.html` no navegador
2. Navegue pelos produtos na galeria
3. Clique em um produto para ver detalhes e sabores
4. Use os botões de pedido para entrar em contato via WhatsApp ou preencher o formulário

## ⚙️ Personalização

### Alterar Número do WhatsApp

Edite o arquivo `script.js` e altere a variável `whatsappNumber`:

```javascript
const whatsappNumber = '5511999999999'; // Substitua pelo número real
```

### Adicionar/Editar Produtos e Sabores

Edite o arquivo `data.js` para modificar produtos, sabores e disponibilidade:

```javascript
const productsData = {
    'id-do-produto': {
        id: 'id-do-produto',
        name: 'Nome do Produto',
        description: 'Descrição',
        price: 'R$ 10,00',
        image: '🍰',
        availability: 'available', // 'available', 'unavailable', 'weekend'
        flavors: [
            { name: 'Sabor 1', available: true },
            { name: 'Sabor 2', available: false }
        ]
    }
};
```

### Cores e Estilo

As cores principais estão definidas em `styles.css` nas variáveis CSS:

```css
:root {
    --primary-pink: #FFB6C1;
    --dark-pink: #FF91A4;
    --light-pink: #FFE4E9;
    --gold: #FFD700;
    /* ... */
}
```

## 📱 Estrutura de Arquivos

```
├── index.html          # Página principal
├── product.html        # Página de produto individual
├── styles.css          # Estilos e animações
├── script.js           # JavaScript e funcionalidades
├── data.js             # Dados dos produtos
└── README.md           # Documentação
```

## 🎨 Recursos Visuais

- **Glassmorphism**: Efeitos de vidro fosco
- **Animações Suaves**: Transições e hover effects
- **Elementos Flutuantes**: Ícones animados no hero
- **Parallax**: Efeito de profundidade no scroll
- **Sombras Suaves**: Profundidade visual premium
- **Gradientes**: Cores suaves e elegantes

## 📞 Funcionalidades de Pedido

1. **Botão WhatsApp**: Abre conversa direta no WhatsApp
2. **Formulário Modal**: Coleta informações do cliente
3. **Seleção de Produto e Sabor**: Dropdowns dinâmicos
4. **Campo de Observações**: Para eventos e quantidades especiais

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e animações)
- JavaScript (Vanilla)
- Google Fonts (Playfair Display + Poppins)

## 📝 Notas

- O sistema detecta automaticamente se é final de semana para produtos com disponibilidade "weekend"
- Todos os produtos e sabores podem ser facilmente gerenciados através do arquivo `data.js`
- O site é totalmente estático e não requer servidor

## 🎯 Próximos Passos Sugeridos

- Adicionar imagens reais dos produtos
- Integrar com sistema de pagamento
- Adicionar carrinho de compras
- Sistema de avaliações
- Blog de receitas

---

Desenvolvido com ❤️ para Doces da Clau

