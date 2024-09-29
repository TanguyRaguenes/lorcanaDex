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
const modal = document.getElementById("modal");
const main = document.querySelector("main");
let page = 1;
let cards = [];
modal.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    main.style.filter = "none";
});
previousPage.addEventListener("click", () => {
    console.log("previousPage");
    page -= 1;
    page < 1 ? page = 1 : null;
    mainFunction(page);
});
nextPage.addEventListener("click", () => {
    console.log("nextPage");
    page += 1;
    mainFunction(page);
});
function mainFunction(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchCards(pageNumber);
        cards.forEach(card => {
            console.log(card);
        });
        designCards();
    });
}
function fetchCards(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("fetchCards");
        cards = [];
        try {
            const response = yield fetch("/api/cards/" + pageNumber);
            if (!response.ok) {
                console.log(console.error("Erreur lors de la récupération des cartes :", response.statusText));
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
    });
}
function designCards() {
    console.log("designCards");
    cardsContainer.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        cardsContainer === null || cardsContainer === void 0 ? void 0 : cardsContainer.insertAdjacentHTML("beforeend", `
        
            <div id="${i}" class="card">
                
                
                <img src="${cards[i].getImage()}" alt="">

            
            </div>

    
            
            `);
    }
    const cardsCreated = document.getElementsByClassName("card");
    for (let i = 0; i < cardsCreated.length; i++) {
        cardsCreated[i].addEventListener("click", () => {
            console.log(cardsCreated[i].id);
            modal.innerHTML = "";
            modal.insertAdjacentHTML('afterbegin', `
                <img src="${cards[Number(cardsCreated[i].id)].getImage()}" alt="">
            `);
            modal.style.visibility = "visible";
            main.style.filter = "blur(8px)";
        });
    }
}
mainFunction(1);
