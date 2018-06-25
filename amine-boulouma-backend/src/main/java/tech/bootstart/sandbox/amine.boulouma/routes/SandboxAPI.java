package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;

public class SandboxAPI extends RouteBuilder {
    @java.lang.Override
    public void configure() throws Exception {
        restConfiguration().component("servlet");

        rest("/person")
            .get("/{PersonId}")
                .route()
                    .to("direct:person.get")
                .endRest()

            .post()
                .route()
                    .to("direct:person.create")
                .endRest()

            .put("/{PersonId}")
                .route()
                    .to("direct:person.update")
                .endRest()
        ;
    }
}
