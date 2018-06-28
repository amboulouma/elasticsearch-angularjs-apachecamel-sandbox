package tech.bootstart.sandbox.amine.boulouma.modules;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.elasticsearch.index.query.BoolQueryBuilder;
import tech.bootstart.utils.elasticsearch.ElasticsearchConstants;

import static org.elasticsearch.index.query.QueryBuilders.boolQuery;
import static org.elasticsearch.index.query.QueryBuilders.matchPhrasePrefixQuery;


public class PeopleModule {

    public static PeopleModule peopleModule = new PeopleModule();

    public void prepareSearch(Exchange exchange) {
        Message in = exchange.getIn();
        String textSearch = in.getHeader("personTextSearch", String.class);
        BoolQueryBuilder query = boolQuery();
        if (textSearch != null && !textSearch.isEmpty()) {
            query.should(matchPhrasePrefixQuery("people.last_name", textSearch));
            query.should(matchPhrasePrefixQuery("people.first_name", textSearch));
            query.minimumNumberShouldMatch(1);
        }
        exchange.setProperty(ElasticsearchConstants.ELASTIC_QUERY, query);

    }
}
