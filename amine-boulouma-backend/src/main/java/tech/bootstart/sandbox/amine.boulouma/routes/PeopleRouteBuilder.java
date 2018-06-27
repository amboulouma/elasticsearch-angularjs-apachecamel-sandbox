package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.freemarker.FreemarkerConstants;
import tech.bootstart.utils.elasticsearch.ElasticsearchConstants;

import static tech.bootstart.sandbox.amine.boulouma.modules.PeopleModule.peopleModule;

public class PeopleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {


        from("direct:people.create")
            .setProperty(ElasticsearchConstants.ELASTIC_INDEX, constant("{{elasticsearch.index.name}}"))
            .setProperty(ElasticsearchConstants.ELASTIC_TYPE, constant("{{elasticsearch.type.people}}"))
            .process(peopleModule::prepareIndex)
            .bean("elasticsearch", "index")
        ;

    }

}
