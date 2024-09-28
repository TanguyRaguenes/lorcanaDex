package fr.app.lorcanaDex.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.client.WebClient;

import fr.app.lorcanaDex.bo.Card;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class CardsController {

    WebClient.Builder builder = WebClient.builder();

    @GetMapping("/api/cards")
    @ResponseBody
    public List<Card> getCards(Model model) {

        String url = "https://api.lorcana-api.com/cards/all?pagesize=10&page=1";

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

}
