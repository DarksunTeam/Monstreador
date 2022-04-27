class Habilidade {
    constructor(_id, nome, descricao, preco, fileName) {
        this._id = _id
        this.nome = nome
        this.descricao = descricao
        this.preco = preco
        this.fileName = fileName
    }

    set(property, value) {
        this[property] = value;
    }

    convertToCard() {
        return { _id: this._id, title: this.nome, description: this.descricao }
    }
}

export default Habilidade;