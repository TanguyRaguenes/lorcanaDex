package fr.app.lorcanaDex.dao;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import fr.app.lorcanaDex.bo.Card;

@Component
public class CardsDao implements ICardsDao {

    private JdbcTemplate jdbcTemplate;
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public CardsDao(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public void bulkData(List<Card> cards) {

        System.out.println("//////////////////////////////////////////////");
        System.out.println("nb cartes : " + cards.size());
        System.out.println("//////////////////////////////////////////////");

        if (cards != null) {
            cards.forEach(card -> {

                if (getCardById(card.getUniqueId()) != null) {
                    // System.out.println("La carte est déjà dans la BDD");
                } else {
                    System.out.println("Il faut ajouter la carte à la BDD");

                    String sql = "INSERT INTO cards(artist,lorcanaSetName,classifications,dateAdded,setNum,color,gamemode,franchise,image,cost,inkable,"
                            + "name,type,lore,rarity,flavorText,uniqueId,cardNum,bodyText,willpower,cardVariants,dateModified,strength,setId)"
                            + "VALUES (:artist,:lorcanaSetName,:classifications,:dateAdded,:setNum,:color,:gamemode,:franchise,:image,:cost,:inkable,"
                            + ":name,:type,:lore,:rarity,:flavorText,:uniqueId,:cardNum,:bodyText,:willpower,:cardVariants,:dateModified,:strength,:setId)";
                    MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
                    mapSqlParameterSource.addValue("artist", card.getArtist());
                    mapSqlParameterSource.addValue("lorcanaSetName", card.getLorcanaSetName());
                    mapSqlParameterSource.addValue("classifications", card.getClassifications());
                    mapSqlParameterSource.addValue("dateAdded", card.getDateAdded());
                    mapSqlParameterSource.addValue("setNum", card.getSetNum());
                    mapSqlParameterSource.addValue("color", card.getColor());
                    mapSqlParameterSource.addValue("gamemode", card.getGamemode());
                    mapSqlParameterSource.addValue("franchise", card.getFranchise());
                    mapSqlParameterSource.addValue("image", card.getImage());
                    mapSqlParameterSource.addValue("cost", card.getCost());
                    mapSqlParameterSource.addValue("inkable", card.isInkable());
                    mapSqlParameterSource.addValue("name", card.getName());
                    mapSqlParameterSource.addValue("type", card.getType());
                    mapSqlParameterSource.addValue("lore", card.getLore());
                    mapSqlParameterSource.addValue("rarity", card.getRarity());
                    mapSqlParameterSource.addValue("flavorText", card.getFlavorText());
                    mapSqlParameterSource.addValue("uniqueId", card.getUniqueId());
                    mapSqlParameterSource.addValue("cardNum", card.getCardNum());
                    mapSqlParameterSource.addValue("bodyText", card.getBodyText());
                    mapSqlParameterSource.addValue("willpower", card.getWillpower());
                    mapSqlParameterSource.addValue("cardVariants", card.getCardVariants());
                    mapSqlParameterSource.addValue("dateModified", card.getDateModified());
                    mapSqlParameterSource.addValue("strength", card.getStrength());
                    mapSqlParameterSource.addValue("setId", card.getSetId());

                    namedParameterJdbcTemplate.update(sql, mapSqlParameterSource);
                }
            });
        }

    }

    @Override
    public Card getCardById(String uniqueId) {

        List<Card> cards = jdbcTemplate.query("SELECT * FROM cards WHERE uniqueId=?",
                new BeanPropertyRowMapper<Card>(Card.class), uniqueId);
        return cards.isEmpty() ? null : cards.get(0);
    }

    @Override
    public <T> List<Card> getCards(String filterKey, T filterValue) {

        List<Card> cards = null;

        if (filterKey != null) {

            cards = jdbcTemplate.query("SELECT * FROM cards WHERE " + filterKey + "=?",
                    new BeanPropertyRowMapper<Card>(Card.class), filterValue);

        } else {
            cards = jdbcTemplate.query("SELECT * FROM cards", new BeanPropertyRowMapper<Card>(Card.class));
        }

        return cards;
    }

}
