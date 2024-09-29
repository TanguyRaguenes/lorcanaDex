
import { Card } from "./bo/Card.js";
import { ICardApi } from "./bo/ICardApi.js"

const cardsContainer = document.getElementById("cardsContainer") as HTMLDivElement;
const previousPage = document.getElementById("previousPage") as HTMLSpanElement;
const nextPage = document.getElementById("nextPage") as HTMLSpanElement;
const modal = document.getElementById("modal") as HTMLDivElement;

const main = document.querySelector("main") as HTMLDivElement;

let page: number = 1;
let cards: Array<Card> = [];

modal.addEventListener("click", () => {
    modal.style.visibility = "hidden"
    main.style.filter = "none"
})

previousPage.addEventListener("click", () => {
    console.log("previousPage")
    page -= 1;
    page < 1 ? page = 1 : null;
    mainFunction(page);
})

nextPage.addEventListener("click", () => {
    console.log("nextPage")
    page += 1;
    mainFunction(page);
})

async function mainFunction(pageNumber: number): Promise<void> {

    await fetchCards(pageNumber);
    cards.forEach(card => {
        console.log(card);
    })
    designCards();

}

async function fetchCards(pageNumber: number): Promise<void> {

    console.log("fetchCards")

    cards = [];

    try {

        const response = await fetch("/api/cards/" + pageNumber);


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


    for (let i = 0; i < cards.length; i++) {

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
            console.log(cardsCreated[i].id);

            modal.innerHTML = "";
            modal.insertAdjacentHTML('afterbegin', `
                <img src="${cards[Number(cardsCreated[i].id)].getImage()}" alt="">
            `)
            modal.style.visibility = "visible";

            main.style.filter = "blur(8px)"

        })

    }

}

mainFunction(1)