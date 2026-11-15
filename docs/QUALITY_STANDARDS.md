# MINDVERSE — Padrões de Qualidade e Boas Práticas (Quality Standards)

## 1. Princípios Gerais de Engenharia

Para assegurar um produto de nível empresarial e classe mundial, todos os módulos do MINDVERSE devem aderir rigorosamente aos seguintes padrões de qualidade.

---

## 2. Testes Automatizados

### 2.1 Pirâmide de Testes
- **Testes Unitários (Vitest)**: Cobertura de funções utilitárias, adaptadores de IA, parse de streaming e montadores de prompt. Mínimo de 80% de cobertura nos módulos de domínio (`src/services/` e `src/lib/`).
- **Testes de Integração de Componentes (React Testing Library)**: Testes de comportamento de formulários, renderizadores de mensagens e seletores de personas, simulando ações reais do utilizador.
- **Testes Ponta-a-Ponta (Playwright)**: Testes E2E dos fluxos vitais do produto (Registo de conta -> Seleção de Persona -> Envio de Mensagem com Streaming -> Convocação de Debate).

### 2.2 Regras de Execução de Testes
- Nenhum commit é integrado em `main` se houver falha na suite de testes ou degradação da cobertura mínima.
- Mocks estritos para APIs externas (OpenAI, Anthropic, Supabase) em ambientes de teste para evitar custos acidentais e flaky tests.

---

## 3. Validação de Dados e Tipagem Estrita

### 3.1 TypeScript Estrito
- Configuração `tsconfig.json` com `"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`.
- Proibição terminante do uso de `any` no código-fonte. Quando o tipo for verdadeiramente desconhecido, utilizar `unknown` acompanhado de type narrowing com `Zod`.

### 3.2 Validação em Runtime com Zod
Todos os dados recebidos via formulários ou respostas de APIs externas são validados via esquemas Zod antes do consumo:
```typescript
import { z } from 'zod';

export const MessageRequestSchema = z.object({
  conversationId: z.string().uuid(),
  personalityId: z.string().uuid(),
  prompt: z.string().min(1).max(4000),
  mode: z.enum(['solo', 'debate', 'inquiry']).default('solo')
});

export type MessageRequest = z.infer<typeof MessageRequestSchema>;
```

---

## 4. Segurança da Aplicação e Proteção de IA

### 4.1 Gestão de Credenciais
- Nenhuma chave de API de IA é inserida no repositório nem exposta no bundle client-side (sem variáveis `VITE_OPENAI_API_KEY`, etc.).
- Verificação automatizada via ferramentas de secret detection em CI.

### 4.2 Defesa contra Injeção de Prompt (Prompt Injection)
- **Delimitação Estruturada**: Conteúdos submetidos pelo utilizador são envoltos em delimitadores XML/Markdown explícitos (`<user_inquiry>...</user_inquiry>`).
- **Sanitização de Input**: Remoção de caracteres de controlo invisíveis e rejeição de payloads com padrões de jailbreak conhecidos ("ignore previous instructions", etc.).
- **Isolamento de Papéis**: O `system` prompt tem prioridade inegociável sobre as diretivas submetidas no papel de `user`.

### 4.3 Isolamento no Banco de Dados
- Row-Level Security (RLS) habilitada por padrão em 100% das tabelas.
- Funções SECURITY DEFINER mantidas no mínimo absoluto e restritas ao esquema privado.

---

## 5. Tratamento de Erros e Resiliência

### 5.1 No Frontend
- **React Error Boundaries**: Envolvendo rotas principais e painéis de chat para impedir que falhas de renderização causem ecrã branco na aplicação.
- **Feedback Humanizado**: Mensagens de erro claras e orientadoras ao utilizador via notificações Toast, evitando termos técnicos crípticos.

### 5.2 No Backend e Chamadas de IA
- **Mecanismo de Retry com Exponential Backoff**: Implementado em falhas transitórias de rede ou rate limits (HTTP 429 / 503) de fornecedores de IA.
- **Circuit Breaker / Fallback de Fornecedor**: Se o fornecedor primário (ex: Anthropic) estiver inacessível, o sistema pode comutar dinamicamente para o fornecedor secundário (ex: OpenAI) com registo do incidente.

---

## 6. Performance e Eficiência

### 6.1 Métricas de Frontend (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: < 1.8 segundos.
- **FID / INP (Interaction to Next Paint)**: < 100 milissegundos.
- **CLS (Cumulative Layout Shift)**: < 0.05.
- **Tamanho do Bundle Inicial**: < 200 KB gzipped, utilizando `React.lazy` para rotas e componentes pesados (ex: visualizadores de debate).

### 6.2 Latência de IA
- **Time to First Token (TTFT)** em streaming: < 500ms para conversas 1:1.
- Estratégia de streaming chunk a chunk para manter a perceção de resposta imediata.

---

## 7. Acessibilidade (A11y) e Responsividade

- **Padrão**: Conformidade com **WCAG 2.1 Nível AA**.
- **Contraste de Cores**: Rácio mínimo de contraste de 4.5:1 para texto normal e 3:1 para elementos de interface e texto grande, tanto no tema claro como no escuro.
- **Navegação por Teclado**: Todo o fluxo dialógico e de navegação acessível sem rato (suporte completo a `Tab`, `Enter`, `Escape`, `Space`).
- **Leitores de Ecrã**: Uso de atributos ARIA adequados (`aria-live="polite"` para mensagens recebidas em streaming).
- **Design Responsivo**: Experiência de excelência em Mobile (360px+), Tablet (768px+) e Desktop (1280px+).

---

## 8. Monitorização e Observabilidade

- **Rastreio de Erros**: Integração com Sentry em produção.
- **Métricas de IA**: Registo sistemático de:
  - Latência de geração (ms).
  - Número de tokens consumidos (prompt e completion).
  - Custo estimado em USD por pedido.
  - Taxa de sucesso/erro por modelo.

---

## 9. Controlo de Custos de IA (Financial Guardrails)

1. **Quotas Diárias por Nível de Subscrição**:
   - `Seeker (Gratuito)`: Teto diário de 30.000 tokens de contexto processados.
   - `Scholar (Pro)`: Teto diário de 300.000 tokens com prioridade de fila.
2. **Alertas Automáticos de Consumo**:
   - Webhook para equipa técnica se o custo diário global da plataforma ultrapassar o threshold pré-definido.
3. **Limite Rígido de Comprimento de Entrada**:
   - Entrada máxima do utilizador limitada a 4.000 caracteres por mensagem em modo 1:1 e 1.500 caracteres em intervenções no Ágora.
