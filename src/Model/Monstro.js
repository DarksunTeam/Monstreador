class Monstro {
    constructor(_id, nome, forca, destreza, constituicao, inteligencia, sabedoria, carisma, pontosDeVida,
        pontosDeMana, iniciativa, percepcao, defesa, fortitude, reflexo, vontade, velocidadeAndar,
        velocidadeEscalar, velocidadeNadar, velocidadeVoar, nd, fileName) {
        this._id = _id
        this.nome = nome
        this.forca = forca
        this.destreza = destreza
        this.constituicao = constituicao
        this.inteligencia = inteligencia
        this.sabedoria = sabedoria
        this.carisma = carisma
        this.pontosDeVida = pontosDeVida
        this.pontosDeMana = pontosDeMana
        this.iniciativa = iniciativa
        this.percepcao = percepcao
        this.defesa = defesa
        this.fortitude = fortitude
        this.reflexo = reflexo
        this.vontade = vontade
        this.velocidadeAndar = velocidadeAndar
        this.velocidadeEscalar = velocidadeEscalar
        this.velocidadeNadar = velocidadeNadar
        this.velocidadeVoar = velocidadeVoar
        this.nd = nd
        this.fileName = fileName
    }

    set(property, value) {
        this[property] = value;
    }

    convertToCard() {
        return { _id: this._id, title: this.nome, description: this.nd }
    }
}

export default Monstro;