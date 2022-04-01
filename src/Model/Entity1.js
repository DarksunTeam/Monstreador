class Entity1 {
    constructor(_id, name, subtitles, description, fileName) {
        this._id = _id
        this.name = name
        this.subtitles = subtitles
        this.description = description
        this.fileName = fileName
    }

    set(property, value) {
        this[property] = value;
    }

    convertToCard() {
        return { _id: this._id, title: this.name, subtitles: this.subtitles, description: this.description }
    }
}

export default Entity1;