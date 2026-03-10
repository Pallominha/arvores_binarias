class BinaryTree {
    constructor() {
        this.raiz = null;
    }

    // Formato esperado: "6(2(1 3)8)"
    toString() {
        function noParaString(no) {
            if (no === null) {
                return '';
            }

            let texto = '' + no.valor;

            if (no.esquerda !== null || no.direita !== null) {
                const esq = no.esquerda !== null ? noParaString(no.esquerda) : '';
                const dir = no.direita !== null ? noParaString(no.direita) : null;

                if (dir !== null) {
                    const esqEhFolha = no.esquerda === null ||
                        (no.esquerda.esquerda === null && no.esquerda.direita === null);
                    const sep = esqEhFolha ? ' ' : '';
                    texto += '(' + esq + sep + dir + ')';
                } else {
                    texto += '(' + esq + ')';
                }
            }

            return texto;
        }

        if (this.raiz === null) {
            return '';
        }

        return noParaString(this.raiz);
    }

    // Cria a árvore e retorna o nó raiz
    createTree(element) {
        this.raiz = null;

        if (element === null || element === undefined) {
            return this.raiz;
        }

        if (Array.isArray(element)) {
            for (let i = 0; i < element.length; i += 1) {
                this.insert(element[i]);
            }
            return this.raiz;
        }

        this.insert(element);
        return this.raiz;
    }

    // Insere e retorna true se inserido com sucesso, false caso contrário
    insert(valor) {
        if (valor === null || valor === undefined) {
            return false;
        }

        const novoNo = new No(valor);

        if (this.raiz === null) {
            this.raiz = novoNo;
            return true;
        }

        let atual = this.raiz;

        while (atual !== null) {
            if (valor < atual.valor) {
                if (atual.esquerda === null) {
                    atual.esquerda = novoNo;
                    return true;
                }
                atual = atual.esquerda;
            } else {
                if (atual.direita === null) {
                    atual.direita = novoNo;
                    return true;
                }
                atual = atual.direita;
            }
        }

        return false;
    }

    // Remove o valor e retorna a árvore atualizada (nó raiz)
    remove(valor) {
        function removerNo(no, valorRemover) {
            if (no === null) {
                return null;
            }

            if (valorRemover < no.valor) {
                no.esquerda = removerNo(no.esquerda, valorRemover);
                return no;
            }

            if (valorRemover > no.valor) {
                no.direita = removerNo(no.direita, valorRemover);
                return no;
            }

            // no.valor === valorRemover
            if (no.esquerda === null && no.direita === null) {
                return null;
            }

            if (no.esquerda === null) {
                return no.direita;
            }

            if (no.direita === null) {
                return no.esquerda;
            }

            // Dois filhos: encontrar successor mais à esquerda da subárvore direita
            let substituto = no.direita;
            while (substituto.esquerda !== null) {
                substituto = substituto.esquerda;
            }

            no.valor = substituto.valor;
            no.direita = removerNo(no.direita, substituto.valor);
            return no;
        }

        this.raiz = removerNo(this.raiz, valor);
        return this.raiz;
    }

    // Retorna o nó pai; retorna null quando não encontrado (em vez de undefined)
    getFather(valor) {
        if (this.raiz === null || this.raiz.valor === valor) {
            return null;
        }

        let pai = null;
        let atual = this.raiz;

        while (atual !== null) {
            if (valor === atual.valor) {
                return pai;
            }

            pai = atual;
            if (valor < atual.valor) {
                atual = atual.esquerda;
            } else {
                atual = atual.direita;
            }
        }

        return null;
    }

    // Retorna a profundidade (altura) da árvore
    calculateTreeDepth() {
        function profundidade(no) {
            if (no === null) {
                return 0;
            }

            const profundidadeEsquerda = profundidade(no.esquerda);
            const profundidadeDireita = profundidade(no.direita);

            if (profundidadeEsquerda > profundidadeDireita) {
                return profundidadeEsquerda + 1;
            }
            return profundidadeDireita + 1;
        }

        return profundidade(this.raiz);
    }

    // Verifica se a árvore é completa (nenhum nó após um null no BFS)
    isComplete() {
        if (this.raiz === null) {
            return true;
        }

        const fila = [];
        fila.push(this.raiz);
        let encontrouNull = false;

        while (fila.length > 0) {
            const noAtual = fila.shift();

            if (encontrouNull) {
                if (noAtual.esquerda !== null || noAtual.direita !== null) {
                    return false;
                }
                continue;
            }

            // Filho esquerdo
            if (noAtual.esquerda !== null) {
                fila.push(noAtual.esquerda);
            } else {
                encontrouNull = true;
            }
            

            // Filho direito
            if (noAtual.direita !== null) {
                if (encontrouNull) return false;
                fila.push(noAtual.direita);
            } else {
                encontrouNull = true;
            }
        }

        return true;
    }
}

class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

module.exports = BinaryTree;