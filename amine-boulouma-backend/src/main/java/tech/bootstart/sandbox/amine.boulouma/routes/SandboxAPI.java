package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;

public class SandboxAPI extends RouteBuilder {


    @Override
    public void configure() throws Exception {
        restConfiguration().component("servlet");

        rest("/people")
                .post("/create")
                    .description("Creation of a people")
                    .route()
                        .to("direct:people.create")
                    .endRest()
                .get("/search")
                    .description("Searching people")
                    .route()
                        .to("direct:people.search")
                    .endRest()
        ;
    }
}
