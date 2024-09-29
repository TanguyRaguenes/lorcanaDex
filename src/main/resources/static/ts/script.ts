
import { Card } from "./bo/Card.js";
import { ICardApi } from "./bo/ICardApi.js"

const cardsContainer = document.getElementById("cardsContainer") as HTMLDivElement;
const previousPage = document.getElementById("previousPage") as HTMLSpanElement;
const nextPage = document.getElementById("nextPage") as HTMLSpanElement;

let page: number = 1;


previousPage.addEventListener("click", () => {
    console.log("previousPage")
    page -= 1;
    page < 1 ? page = 1 : null;
    main(page);
})

nextPage.addEventListener("click", () => {
    console.log("nextPage")
    page += 1;
    main(page);
})

async function main(pageNumber: number): Promise<void> {

    const cards = await fetchCards(pageNumber);
    cards.forEach(card => {
        console.log(card);
    })
    designCards(cards);

}

async function fetchCards(pageNumber: number): Promise<Card[]> {

    console.log("fetchCards")

    let cards: Array<Card> = [];

    try {

        const response = await fetch("/api/cards/" + pageNumber);


        if (!response.ok) {
            console.log(console.error("Erreur lors de la récupération des cartes :", response.statusText));
            return cards;
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

    return cards;

}




function designCards(cards: Array<Card>): void {

    console.log("designCards")
    cardsContainer.innerHTML = "";

    cards.forEach(card => {

        cardsContainer?.insertAdjacentHTML("beforeend", `
        
            <div class="card">
            
            <p>${card.getName()}</p>

            <img src="${card.getImage()}" alt="">
            
            </div>

    
            
            `
        )

    })

}

main(1)