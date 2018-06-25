package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.freemarker.FreemarkerConstants;

public class SandboxPerson extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("direct:person.get")
            .recipientList(simple("freemarker://stubs/person/example.${header.PersonId}.ftl.json"))
            .removeHeaders("CamelHttp*")
            .to("log:retrieve?showHeaders=true")
        ;

        from("direct:person.create")
            .to("log:create")
        ;

        from("direct:person.update")
            .to("log:update")
        ;
    }

}
