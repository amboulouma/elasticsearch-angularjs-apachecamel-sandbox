package tech.bootstart.sandbox.amine.boulouma.modules;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.camel.Exchange;
import tech.bootstart.utils.data.JsonBuilder;

import static tech.bootstart.utils.camel.CamelHelper.bodyAsJsonNode;

public class PeopleModule {

    public static PeopleModule peopleModule = new PeopleModule();

    public void prepareIndex(Exchange exchange) {
        JsonNode body = bodyAsJsonNode(exchange);

        JsonBuilder jsonBuilder = JsonBuilder.createObject()
                .object("people", body);
        exchange.getIn().setBody(jsonBuilder.build());
    }


    public void search(Exchange exchange) {
        int i = 0;
    }
}
