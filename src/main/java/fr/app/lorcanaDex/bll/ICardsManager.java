package fr.app.lorcanaDex.bll;

import java.util.List;

import fr.app.lorcanaDex.bo.Card;

public interface ICardsManager {

    public abstract void bulkData(List<Card> cards);

    public abstract <T> List<Card> getCards(String filterKey, T filterValue);

}
