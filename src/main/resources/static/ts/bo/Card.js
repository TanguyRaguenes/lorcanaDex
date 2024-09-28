export class Card {
    constructor(artist, lorcanaSetName, classifications, dateAdded, setNum, color, gamemode, franchise, image, cost, inkable, name, type, lore, rarity, flavorText, uniqueId, cardNum, bodyText, willpower, cardVariants, dateModified, strength, setId) {
        this.artist = artist;
        this.lorcanaSetName = lorcanaSetName;
        this.classifications = classifications;
        this.dateAdded = dateAdded;
        this.setNum = setNum;
        this.color = color;
        this.gamemode = gamemode;
        this.franchise = franchise;
        this.image = image;
        this.cost = cost;
        this.inkable = inkable;
        this.name = name;
        this.type = type;
        this.lore = lore;
        this.rarity = rarity;
        this.flavorText = flavorText;
        this.uniqueId = uniqueId;
        this.cardNum = cardNum;
        this.bodyText = bodyText;
        this.willpower = willpower;
        this.cardVariants = cardVariants;
        this.dateModified = dateModified;
        this.strength = strength;
        this.setId = setId;
    }
    // Getters
    getArtist() {
        return this.artist;
    }
    getLorcanaSetName() {
        return this.lorcanaSetName;
    }
    getClassifications() {
        return this.classifications;
    }
    getDateAdded() {
        return this.dateAdded;
    }
    getSetNum() {
        return this.setNum;
    }
    getColor() {
        return this.color;
    }
    getGamemode() {
        return this.gamemode;
    }
    getFranchise() {
        return this.franchise;
    }
    getImage() {
        return this.image;
    }
    getCost() {
        return this.cost;
    }
    isInkable() {
        return this.inkable;
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getLore() {
        return this.lore;
    }
    getRarity() {
        return this.rarity;
    }
    getFlavorText() {
        return this.flavorText;
    }
    getUniqueId() {
        return this.uniqueId;
    }
    getCardNum() {
        return this.cardNum;
    }
    getBodyText() {
        return this.bodyText;
    }
    getWillpower() {
        return this.willpower;
    }
    getCardVariants() {
        return this.cardVariants;
    }
    getDateModified() {
        return this.dateModified;
    }
    getStrength() {
        return this.strength;
    }
    getSetId() {
        return this.setId;
    }
    // Setters
    setArtist(artist) {
        this.artist = artist;
    }
    setLorcanaSetName(lorcanaSetName) {
        this.lorcanaSetName = lorcanaSetName;
    }
    setClassifications(classifications) {
        this.classifications = classifications;
    }
    setDateAdded(dateAdded) {
        this.dateAdded = dateAdded;
    }
    setSetNum(setNum) {
        this.setNum = setNum;
    }
    setColor(color) {
        this.color = color;
    }
    setGamemode(gamemode) {
        this.gamemode = gamemode;
    }
    setFranchise(franchise) {
        this.franchise = franchise;
    }
    setImage(image) {
        this.image = image;
    }
    setCost(cost) {
        this.cost = cost;
    }
    setInkable(inkable) {
        this.inkable = inkable;
    }
    setName(name) {
        this.name = name;
    }
    setType(type) {
        this.type = type;
    }
    setLore(lore) {
        this.lore = lore;
    }
    setRarity(rarity) {
        this.rarity = rarity;
    }
    setFlavorText(flavorText) {
        this.flavorText = flavorText;
    }
    setUniqueId(uniqueId) {
        this.uniqueId = uniqueId;
    }
    setCardNum(cardNum) {
        this.cardNum = cardNum;
    }
    setBodyText(bodyText) {
        this.bodyText = bodyText;
    }
    setWillpower(willpower) {
        this.willpower = willpower;
    }
    setCardVariants(cardVariants) {
        this.cardVariants = cardVariants;
    }
    setDateModified(dateModified) {
        this.dateModified = dateModified;
    }
    setStrength(strength) {
        this.strength = strength;
    }
    setSetId(setId) {
        this.setId = setId;
    }
    // toString method
    toString() {
        return `Card {
            artist: ${this.artist},
            setName: ${this.lorcanaSetName},
            classifications: ${this.classifications},
            dateAdded: ${this.dateAdded},
            setNum: ${this.setNum},
            color: ${this.color},
            gamemode: ${this.gamemode},
            franchise: ${this.franchise},
            image: ${this.image},
            cost: ${this.cost},
            inkable: ${this.inkable},
            name: ${this.name},
            type: ${this.type},
            lore: ${this.lore},
            rarity: ${this.rarity},
            flavorText: ${this.flavorText},
            uniqueId: ${this.uniqueId},
            cardNum: ${this.cardNum},
            bodyText: ${this.bodyText},
            willpower: ${this.willpower},
            cardVariants: ${this.cardVariants},
            dateModified: ${this.dateModified},
            strength: ${this.strength},
            setId: ${this.setId}
        }`;
    }
}
