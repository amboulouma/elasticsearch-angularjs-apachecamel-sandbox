package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;
import tech.bootstart.utils.elasticsearch.ElasticsearchConstants;

public class PeopleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {


        from("direct:people.create")
                .setProperty(ElasticsearchConstants.ELASTIC_INDEX, constant("{{elasticsearch.index.name}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_TYPE, constant("{{elasticsearch.type.people}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_REFRESH, constant(true))
                .bean("elasticsearch", "index")
                .log("People created")
        ;


        from("direct:people.search")
                .setProperty(ElasticsearchConstants.ELASTIC_INDEX, constant("{{elasticsearch.index.name}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_TYPE, constant("{{elasticsearch.type.people}}"))
                .bean("elasticsearch", "search")
        ;


        from("direct:people.update")
                .setProperty(ElasticsearchConstants.ELASTIC_INDEX, constant("{{elasticsearch.index.name}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_TYPE, constant("{{elasticsearch.type.people}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_REFRESH, constant(true))
                .setProperty(ElasticsearchConstants.ELASTIC_ID, header("personId"))
                .bean("elasticsearch", "update")
                .log("People ${in.header.personId} updated")
        ;


        from("direct:people.delete")
                .setProperty(ElasticsearchConstants.ELASTIC_INDEX, constant("{{elasticsearch.index.name}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_TYPE, constant("{{elasticsearch.type.people}}"))
                .setProperty(ElasticsearchConstants.ELASTIC_REFRESH, constant(true))
                .setProperty(ElasticsearchConstants.ELASTIC_ID, header("personId"))
                .bean("elasticsearch", "delete")
                .log("People ${in.header.personId} deleted")
        ;
    }
}
