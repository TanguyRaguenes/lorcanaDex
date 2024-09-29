package fr.app.lorcanaDex.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.client.WebClient;

import fr.app.lorcanaDex.bll.ICardsManager;
import fr.app.lorcanaDex.bo.Card;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class CardsController {

    private ICardsManager cardsManager;

    public CardsController(ICardsManager cardsManager) {
        this.cardsManager = cardsManager;
    }

    WebClient.Builder builder = WebClient.builder();

    @GetMapping("/api/cards/{pageNumber}")
    @ResponseBody
    public List<Card> getCards(@PathVariable(name = "pageNumber", required = false) Long pageNumber) {

        if (pageNumber == null) {
            pageNumber = 1L;
        }

        String url = "https://api.lorcana-api.com/cards/all?pagesize=12&page=" + pageNumber;

        System.out.println(url);

        Flux<Card> cardsFlux = builder.build()
                .get()
                .uri(url)
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), clientResponse -> {
                    return Mono.error(new RuntimeException("Client error: " + clientResponse.statusCode()));
                })
                .onStatus(status -> status.is5xxServerError(), clientResponse -> {
                    return Mono.error(new RuntimeException("Server error: " + clientResponse.statusCode()));
                })
                .bodyToFlux(Card.class);

        List<Card> cardsList = cardsFlux.collectList().block();

        System.out.println("--------------------------------------");

        cardsList.forEach(card -> {
            System.out.println(card);
        });

        System.out.println("--------------------------------------");

        return cardsList;
    }

    @GetMapping("/bulk-data")
    public String bulkData() {

        String url = "https://api.lorcana-api.com/bulk/cards";

        Flux<Card> cardsFlux = builder.build()
                .get()
                .uri(url)
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), clientResponse -> {
                    return Mono.error(new RuntimeException("Client error: " + clientResponse.statusCode()));
                })
                .onStatus(status -> status.is5xxServerError(), clientResponse -> {
                    return Mono.error(new RuntimeException("Server error: " + clientResponse.statusCode()));
                })
                .bodyToFlux(Card.class);

        List<Card> cardsList = cardsFlux.collectList().block();

        cardsManager.bulkData(cardsList);

        return ("/cards-list");
    }

    @GetMapping("/get-cards/{filterKey}/{filterValue}")
    @ResponseBody
    public <T> List<Card> getCards(@PathVariable(name = "filterKey", required = false) String filterKey,
            @PathVariable(name = "filterValue", required = false) T filterValue) {

        return cardsManager.getCards(filterKey, filterValue);

    }

    @GetMapping("/show-cards-list")
    public String showCardsList() {

        return ("/cards-list");

    }

}
