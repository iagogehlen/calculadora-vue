new Vue({
    el: '#calculadora',
    data: {
        visor: '',
    },
    methods: {
        add(valor) {
            if (this.verificacao(valor)) return;
            this.visor += valor;
        },
        apagar() {
            this.visor = '';
        },
        verificacao(valor) {
            let ultimoChar = this.visor.slice(-1);
            console.log('Ultimo caracter: ' + ultimoChar)

            if (this.ehOperador(valor) && this.ehOperador(ultimoChar)) {
                return true;
            }
            if (valor === '.' && this.decimalInvalido()) {
                return true;
            }

            if (valor == '0' && this.zerosEsquerda()) {
                return true;
            }

            return false;
        },
        ehOperador(valor) {
            return ['+', '-', '*', '/', '%'].includes(valor);
        },
        decimalInvalido() {
            let partes = this.visor.split(/[\+\-\*\/%]/);
            let ultNum = partes[partes.length - 1];
            return ultNum.includes('.');
        },
        zerosEsquerda() {
            let partes = this.visor.split(/[\+\-\*\/%]/);
            let ultNum = partes[partes.length - 1];

            return ultNum.length > 1 && ultNum[0] == '0' && ultNum[1] !== '.';
        },
        calcular() {
            try {
                if (this.ehOperador(this.visor.slice(-1))) {
                    console.log('teste de verificação ' + this.visor.slice(-1))
                    return;
                }
                this.visor = eval(this.visor);
            } catch {
                this.visor = "Erro";
            }
        },
        teclas(click) {
            const validos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%'];
            if (validos.includes(click.key)) {
                this.add(click.key);
            } else if (click.key === 'Enter') {
                this.calcular();
            } else if (click.key === 'Backspace') {
                this.visor = this.visor.slice(0, -1);
            } else if (click.key === 'Escape') {
                this.apagar();
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.teclas);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.teclas);
    }
});
