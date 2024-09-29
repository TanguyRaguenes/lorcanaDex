
import { Card } from "./bo/Card.js";
import { ICardApi } from "./bo/ICardApi.js"

const cardsContainer = document.getElementById("cardsContainer") as HTMLDivElement;
const previousPage = document.getElementById("previousPage") as HTMLSpanElement;
const nextPage = document.getElementById("nextPage") as HTMLSpanElement;
const modal = document.getElementById("modal") as HTMLDivElement;

const h1 = document.querySelector("h1") as HTMLElement;

const main = document.querySelector("main") as HTMLDivElement;

let page: number = 1;
let nbCardsPerPage: number = 12;
let cards: Array<Card> = [];

previousPage.addEventListener("click", () => {
    console.log("previousPage")
    page -= 1;
    page < 1 ? page = 1 : null;
    mainFunction();
})

nextPage.addEventListener("click", () => {
    console.log("nextPage")
    page += 1;
    mainFunction();
})

async function mainFunction(): Promise<void> {

    await fetchCards("rarity", "Legendary");
    cards.forEach(card => {
        console.log(card);
    })
    designCards();

    h1.innerHTML = `Cards' list : ${cards.length} cards`



}

async function fetchCards<T>(filterKey: String, filterValue: T): Promise<void> {

    console.log("fetchCards")

    cards = [];

    try {

        // const response = await fetch("/api/cards/" + page);

        const response = await fetch(`/get-cards/${filterKey}/${filterValue}`);

        if (!response.ok) {
            console.log(console.error("Erreur lors de la récupération des cartes :", response.statusText));
        }

        const jsonResponse = await response.json();

        jsonResponse.forEach((element: ICardApi) => {
            const card = new Card(
                element.Artist,
                element.Set_Name,
                element.Classifications,
                element.Date_Added,
                element.Set_Num,
                element.Color,
                element.Gamemode,
                element.Franchise,
                element.Image,
                element.Cost,
                element.Inkable,
                element.Name,
                element.Type,
                element.Lore,
                element.Rarity,
                element.Flavor_Text,
                element.Unique_ID,
                element.Card_Num,
                element.Body_Text,
                element.Willpower,
                element.Card_Variants,
                element.Date_Modified,
                element.Strength,
                element.Set_ID
            );

            cards.push(card);
        })


    } catch (error) {
        console.error('Erreur:', error);
    }

}




function designCards(): void {

    console.log("designCards")
    cardsContainer.innerHTML = "";


    for (let i = (page - 1) * 11; i < (page - 1) * 11 + 12; i++) {

        cardsContainer?.insertAdjacentHTML("beforeend", `
        
            <div id="${i}" class="card">
                
                <img src="${cards[i].getImage()}" alt="">

            </div>

    
            
            `
        )

    }

    const cardsCreated = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLDivElement>;

    for (let i = 0; i < cardsCreated.length; i++) {

        cardsCreated[i].addEventListener("click", () => {

            modal.innerHTML = "";
            modal.insertAdjacentHTML('afterbegin', `

                <span id="close" class="material-symbols-rounded button">close</span>

                <img src="${cards[Number(cardsCreated[i].id)].getImage()}" alt="">
                <div id="modalBtnContainer">
                    <span id="favorite" class="material-symbols-rounded button">favorite</span>
                    <span id="add" class="material-symbols-rounded button">add</span>
                </div>

            `)
            modal.style.visibility = "visible";
            main.style.filter = "blur(8px)"
            main.style.pointerEvents = "none";

            const close = document.getElementById("close") as HTMLSpanElement;
            const favorite = document.getElementById("favorite") as HTMLSpanElement;
            const add = document.getElementById("add") as HTMLSpanElement;

            close.addEventListener("click", () => {
                console.log("close");
                modal.style.visibility = "hidden"
                main.style.filter = "none"
                main.style.pointerEvents = "auto";
            })

            favorite.addEventListener("click", () => {
                console.log("favorite");
            })

            add.addEventListener("click", () => {
                console.log("add");
            })

        })

    }

}

mainFunction();