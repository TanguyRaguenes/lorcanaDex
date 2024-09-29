package fr.app.lorcanaDex.dao;

import java.util.List;

import fr.app.lorcanaDex.bo.Card;

public interface ICardsDao {
    public abstract void bulkData(List<Card> cards);

    public abstract Card getCardById(String uniqueId);

    public abstract <T> List<Card> getCards(String filterKey, T filterValue);
}
