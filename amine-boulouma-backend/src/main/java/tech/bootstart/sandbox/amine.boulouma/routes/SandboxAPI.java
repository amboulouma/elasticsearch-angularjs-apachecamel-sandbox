package tech.bootstart.sandbox.amine.boulouma.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestParamType;

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

                .put("/update")
                    .description("Updating people")
                    .route()
                        .to("direct:people.update")
                    .endRest()

                .delete("/delete")
                    .description("Deleting people")
                    .param().name("personId")
                            .type(RestParamType.query)
                            .description("ID of the person to delete")
                            .dataType("string")
                            .required(true)
                        .endParam()
                    .route()
                        .to("direct:people.delete")
                    .endRest()
        ;
    }
}
