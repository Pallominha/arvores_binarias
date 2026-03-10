class BinaryTree {
    constructor() {
        this.raiz = null;
    }

    toString() {
        function noParaString(no) {
            if (no === null) {
                return '';
            }

            let texto = '' + no.valor;
            const filhos = [];

            if (no.esquerda !== null) {
                filhos.push('left:' + noParaString(no.esquerda));
            }

            if (no.direita !== null) {
                filhos.push('right:' + noParaString(no.direita));
            }

            if (filhos.length > 0) {
                texto += ' (' + filhos.join(' ') + ')';
            }

            return texto;
        }

        if (this.raiz === null) {
            return '';
        }

        return 'root:' + noParaString(this.raiz);
    }

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

    insert(valor) {
        const novoNo = new No(valor);

        if (this.raiz === null) {
            this.raiz = novoNo;
            return;
        }

        let atual = this.raiz;

        while (atual !== null) {
            if (valor < atual.valor) {
                if (atual.esquerda === null) {
                    atual.esquerda = novoNo;
                    return;
                }
                atual = atual.esquerda;
            } else {
                if (atual.direita === null) {
                    atual.direita = novoNo;
                    return;
                }
                atual = atual.direita;
            }
        }
    }

    remove(valor) {
        function removerNo(no, valorRemover) {
            if (no === null) {
                return { no: null, removido: false };
            }

            if (valorRemover < no.valor) {
                const resultado = removerNo(no.esquerda, valorRemover);
                no.esquerda = resultado.no;
                return { no, removido: resultado.removido };
            }

            if (valorRemover > no.valor) {
                const resultado = removerNo(no.direita, valorRemover);
                no.direita = resultado.no;
                return { no, removido: resultado.removido };
            }

            // no.valor === valorRemover
            if (no.esquerda === null && no.direita === null) {
                return { no: null, removido: true };
            }

            if (no.esquerda === null) {
                return { no: no.direita, removido: true };
            }

            if (no.direita === null) {
                return { no: no.esquerda, removido: true };
            }

            // Dois filhos: encontrar successor mais à esquerda da subárvore direita
            let substituto = no.direita;
            while (substituto.esquerda !== null) {
                substituto = substituto.esquerda;
            }

            no.valor = substituto.valor;
            const resultado = removerNo(no.direita, substituto.valor);
            no.direita = resultado.no;
            return { no, removido: true };
        }

        const resultado = removerNo(this.raiz, valor);
        this.raiz = resultado.no;
        return resultado.removido;
    }

    getFather(valor) {
        if (this.raiz === null || this.raiz.valor === valor) {
            return undefined;
        }

        let pai = undefined;
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

        return undefined;
    }

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

    isComplete() {
        if (this.raiz === null) {
            return true;
        }

        const fila = [];
        fila.push(this.raiz);
        let encontrouNull = false;

        while (fila.length > 0) {
            const noAtual = fila.shift();

            if (noAtual.esquerda !== null) {
                if (encontrouNull) {
                    return false;
                }
                fila.push(noAtual.esquerda);
            } else {
                encontrouNull = true;
            }

            if (noAtual.direita !== null) {
                if (encontrouNull) {
                    return false;
                }
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

