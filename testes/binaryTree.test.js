const BinaryTree = require('../src/BinaryTree');

// Helpers
function makeTree(...values) {
    const bt = new BinaryTree();
    bt.createTree(values.length === 1 ? values[0] : values);
    return bt;
}

// toString
describe('toString', () => {
    test('árvore vazia retorna string vazia', () => {
        const bt = new BinaryTree();
        expect(bt.toString()).toBe('');
    });

    test('apenas raiz retorna só o valor', () => {
        expect(makeTree(6).toString()).toBe('6');
    });

    test('árvore completa: "6(2(1 3)8)"', () => {
        expect(makeTree(6, 2, 8, 1, 3).toString()).toBe('6(2(1 3)8)');
    });

    test('apenas filho esquerdo', () => {
        expect(makeTree(5, 3).toString()).toBe('5(3)');
    });

    test('apenas filho direito usa placeholder vazio', () => {
        expect(makeTree(5, 7).toString()).toBe('5( 7)');
    });

    test('árvore mais profunda', () => {
        expect(makeTree(10, 5, 15, 2).toString()).toBe('10(5(2)15)');
    });
});

// createTree
describe('createTree', () => {
    test('null retorna null', () => {
        const bt = new BinaryTree();
        expect(bt.createTree(null)).toBeNull();
    });

    test('undefined retorna null', () => {
        const bt = new BinaryTree();
        expect(bt.createTree(undefined)).toBeNull();
    });

    test('elemento único: retorna nó raiz com valor correto', () => {
        const bt = new BinaryTree();
        const root = bt.createTree(10);
        expect(root).not.toBeNull();
        expect(root.valor).toBe(10);
        expect(root.esquerda).toBeNull();
        expect(root.direita).toBeNull();
    });

    test('array: retorna nó raiz correto', () => {
        const bt = new BinaryTree();
        const root = bt.createTree([6, 2, 8]);
        expect(root.valor).toBe(6);
        expect(root.esquerda.valor).toBe(2);
        expect(root.direita.valor).toBe(8);
    });

    test('chamadas sucessivas recriam a árvore do zero', () => {
        const bt = new BinaryTree();
        bt.createTree([6, 2, 8]);
        const root = bt.createTree([1]);
        expect(root.valor).toBe(1);
        expect(root.esquerda).toBeNull();
        expect(root.direita).toBeNull();
    });
});

// insert
describe('insert', () => {
    test('retorna false para null', () => {
        const bt = new BinaryTree();
        expect(bt.insert(null)).toBe(false);
    });

    test('retorna false para undefined', () => {
        const bt = new BinaryTree();
        expect(bt.insert(undefined)).toBe(false);
    });

    test('retorna true ao inserir na árvore vazia', () => {
        const bt = new BinaryTree();
        expect(bt.insert(5)).toBe(true);
    });

    test('retorna true ao inserir valor menor (filho esquerdo)', () => {
        const bt = makeTree(10);
        expect(bt.insert(5)).toBe(true);
        expect(bt.raiz.esquerda.valor).toBe(5);
    });

    test('retorna true ao inserir valor maior (filho direito)', () => {
        const bt = makeTree(10);
        expect(bt.insert(15)).toBe(true);
        expect(bt.raiz.direita.valor).toBe(15);
    });

    test('inserção mantém propriedade BST', () => {
        const bt = makeTree(10, 5, 15, 3, 7);
        expect(bt.raiz.valor).toBe(10);
        expect(bt.raiz.esquerda.valor).toBe(5);
        expect(bt.raiz.direita.valor).toBe(15);
        expect(bt.raiz.esquerda.esquerda.valor).toBe(3);
        expect(bt.raiz.esquerda.direita.valor).toBe(7);
    });
});

// remove
describe('remove', () => {
    test('remover de árvore vazia retorna null', () => {
        const bt = new BinaryTree();
        expect(bt.remove(5)).toBeNull();
    });

    test('remover valor inexistente não altera a árvore', () => {
        const bt = makeTree(6, 2, 8);
        const root = bt.remove(99);
        expect(root.valor).toBe(6);
        expect(root.esquerda.valor).toBe(2);
        expect(root.direita.valor).toBe(8);
    });

    test('remover folha', () => {
        const bt = makeTree(6, 2, 8);
        const root = bt.remove(2);
        expect(root.valor).toBe(6);
        expect(root.esquerda).toBeNull();
        expect(root.direita.valor).toBe(8);
    });

    test('remover nó com apenas filho direito', () => {
        const bt = makeTree(6, 8, 10);
        // árvore: 6 -> direita: 8 -> direita: 10
        bt.remove(8);
        expect(bt.raiz.direita.valor).toBe(10);
    });

    test('remover nó com apenas filho esquerdo', () => {
        const bt = makeTree(10, 6, 4);
        // 10 -> esquerda: 6 -> esquerda: 4
        bt.remove(6);
        expect(bt.raiz.esquerda.valor).toBe(4);
    });

    test('remover nó com dois filhos', () => {
        const bt = makeTree(6, 2, 8, 1, 3);
        // remove 2 (tem filhos 1 e 3); successor in-order é 3
        const root = bt.remove(2);
        expect(root.esquerda.valor).toBe(3);
        expect(root.esquerda.esquerda.valor).toBe(1);
        expect(root.esquerda.direita).toBeNull();
    });

    test('remover a raiz', () => {
        const bt = makeTree(6, 2, 8);
        const root = bt.remove(6);
        expect(root.valor).toBe(8);
    });

    test('remover único nó retorna null', () => {
        const bt = makeTree(5);
        expect(bt.remove(5)).toBeNull();
    });
});

// getFather
describe('getFather', () => {
    test('árvore vazia retorna null', () => {
        const bt = new BinaryTree();
        expect(bt.getFather(5)).toBeNull();
    });

    test('pai da raiz retorna null', () => {
        const bt = makeTree(6, 2, 8);
        expect(bt.getFather(6)).toBeNull();
    });

    test('valor inexistente retorna null', () => {
        const bt = makeTree(6, 2, 8);
        expect(bt.getFather(99)).toBeNull();
    });

    test('pai do filho esquerdo direto é a raiz', () => {
        const bt = makeTree(6, 2, 8);
        expect(bt.getFather(2).valor).toBe(6);
    });

    test('pai do filho direito direto é a raiz', () => {
        const bt = makeTree(6, 2, 8);
        expect(bt.getFather(8).valor).toBe(6);
    });

    test('pai de nó mais profundo', () => {
        const bt = makeTree(6, 2, 8, 1, 3);
        expect(bt.getFather(1).valor).toBe(2);
        expect(bt.getFather(3).valor).toBe(2);
    });
});

// calculateTreeDepth
describe('calculateTreeDepth', () => {
    test('árvore vazia tem profundidade 0', () => {
        const bt = new BinaryTree();
        expect(bt.calculateTreeDepth()).toBe(0);
    });

    test('apenas raiz tem profundidade 1', () => {
        expect(makeTree(5).calculateTreeDepth()).toBe(1);
    });

    test('árvore balanceada de 3 nós tem profundidade 2', () => {
        expect(makeTree(6, 2, 8).calculateTreeDepth()).toBe(2);
    });

    test('profundidade correta para árvore assimétrica', () => {
        // 6 -> 2 -> 1 (cadeia à esquerda): profundidade 3
        expect(makeTree(6, 2, 1).calculateTreeDepth()).toBe(3);
    });

    test('profundidade correta para árvore maior', () => {
        expect(makeTree(6, 2, 8, 1, 3).calculateTreeDepth()).toBe(3);
    });
});

// isComplete
describe('isComplete', () => {
    test('árvore vazia é completa', () => {
        const bt = new BinaryTree();
        expect(bt.isComplete()).toBe(true);
    });

    test('apenas raiz é completa', () => {
        expect(makeTree(1).isComplete()).toBe(true);
    });

    test('árvore completa com 3 nós', () => {
        expect(makeTree(2, 1, 3).isComplete()).toBe(true);
    });

    test('não é completa quando falta filho esquerdo mas há direito', () => {
        // Construção manual: raiz=5, apenas filho direito=8
        const bt = new BinaryTree();
        bt.createTree(5);
        bt.raiz.direita = { valor: 8, esquerda: null, direita: null };
        expect(bt.isComplete()).toBe(false);
    });

    test('não é completa quando há nó no segundo nível após lacuna', () => {
        const bt = makeTree(4, 2, 6, 5);
        expect(bt.isComplete()).toBe(false);
    });

    test('é completa quando todos os nós do penúltimo nível têm dois filhos', () => {
        expect(makeTree(4, 2, 6, 1, 3, 5, 7).isComplete()).toBe(true);
    });
});