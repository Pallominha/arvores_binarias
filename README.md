# Árvore Binária (BinaryTree)

## 📄 Descrição do projeto

Projeto de estrutura de dados em JavaScript para árvore binária de busca (BST).
Implementa criação, inserção, remoção, busca de pai, cálculo de profundidade, teste de completude e conversão para string.

Focado para uso em exercícios de Estrutura de Dados II, com teste automatizado usando Jest.

## 🔧 Métodos

A classe principal é `BinaryTree`, com suporte para os métodos:

- `createTree(element)`
  - Cria/recria a árvore a partir de um valor único ou de um array de valores.
  - Retorna a raiz (`null` quando `null`/`undefined`).

- `insert(valor)`
  - Insere o valor na BST.
  - Retorna `true` quando inserido, `false` para `null`/`undefined`.

- `remove(valor)`
  - Remove o nó com o valor informado.
  - Retorna a raiz atualizada (pode ser `null` quando removido nó único).

- `getFather(valor)`
  - Retorna o nó pai do valor informado.
  - Retorna `null` quando não encontrado, ou quando for a raiz.

- `calculateTreeDepth()`
  - Retorna a profundidade/altura da árvore.

- `isComplete()`
  - Retorna `true` se a árvore for completa, `false` caso contrário.

- `toString()`
  - Converte a árvore para uma representação em string, ex.: `6(2(1 3)8)`.

## 🧪 Testes

Os testes estão em `testes/binaryTree.test.js` e cobrem:

- `toString` (vazio, raiz, filho esquerdo/direito, profundidade)
- `createTree` (null, undefined, valor único, array, recriação)
- `insert` (null/undefined, inserção em vazio, esquerdo, direito, propriedade BST)
- `remove` (vazio, inexistente, folha, um filho, dois filhos, raiz, nós únicos)
- `getFather` (vazio, raiz, inexistente, filhos esquerdo/direito, profundidade)
- `calculateTreeDepth` (vazio, raiz, balanceado, assimétrico)
- `isComplete` (vazio, completo, não completo)

Como executar:

```bash
npm install
npm test
```

## 🗂️ Estrutura de pastas

```
arvores_binarias/
  ├─ src/
  │   └─ BinaryTree.js
  ├─ testes/
  │   └─ binaryTree.test.js
  ├─ package.json
  ├─ package-lock.json
  └─ README.md
```

`src/` contém a implementação da árvore.
`testes/` contém casos de teste Jest.

---

## 💻 Tecnologias Utilizadas
[![My Skills](https://skillicons.dev/icons?i=js)](https://developer.mozilla.org/docs/Web/JavaScript)
[![My Skills](https://skillicons.dev/icons?i=nodejs)](https://nodejs.org)
[![My Skills](https://skillicons.dev/icons?i=jest)](https://jestjs.io)
[![My Skills](https://skillicons.dev/icons?i=git)](https://git-scm.com)
[![My Skills](https://skillicons.dev/icons?i=vscode)](https://code.visualstudio.com)

## 🟡 Observações

- Certifique-se de ter o `node` e `npm` instalados.
- Se `node` não for reconhecido, adicione ao PATH ou use instalação do Node.js.


## 👨‍💻 Autores

- [Gabriel Rodrigues Santos](https://github.com/gabrielrsnts)
- [Palloma Barros Dias](https://github.com/Pallominha)
- [Tássio Moraes](https://github.com/tassolas)

