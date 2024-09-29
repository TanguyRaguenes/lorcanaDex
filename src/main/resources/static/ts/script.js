var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Card } from "./bo/Card.js";
const cardsContainer = document.getElementById("cardsContainer");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
let page = 1;
previousPage.addEventListener("click", () => {
    console.log("previousPage");
    page -= 1;
    page < 1 ? page = 1 : null;
    main(page);
});
nextPage.addEventListener("click", () => {
    console.log("nextPage");
    page += 1;
    main(page);
});
function main(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield fetchCards(pageNumber);
        cards.forEach(card => {
            console.log(card);
        });
        designCards(cards);
    });
}
function fetchCards(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("fetchCards");
        let cards = [];
        try {
            const response = yield fetch("/api/cards/" + pageNumber);
            if (!response.ok) {
                console.log(console.error("Erreur lors de la récupération des cartes :", response.statusText));
                return cards;
            }
            const jsonResponse = yield response.json();
            jsonResponse.forEach((element) => {
                const card = new Card(element.Artist, element.Set_Name, element.Classifications, element.Date_Added, element.Set_Num, element.Color, element.Gamemode, element.Franchise, element.Image, element.Cost, element.Inkable, element.Name, element.Type, element.Lore, element.Rarity, element.Flavor_Text, element.Unique_ID, element.Card_Num, element.Body_Text, element.Willpower, element.Card_Variants, element.Date_Modified, element.Strength, element.Set_ID);
                cards.push(card);
            });
        }
        catch (error) {
            console.error('Erreur:', error);
        }
        return cards;
    });
}
function designCards(cards) {
    console.log("designCards");
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.insertAdjacentHTML("beforeend", `
        
            <div class="card">
            
            <p>${card.getName()}</p>

            <img src="${card.getImage()}" alt="">
            
            </div>

    
            
            `);
    });
}
main(1);
