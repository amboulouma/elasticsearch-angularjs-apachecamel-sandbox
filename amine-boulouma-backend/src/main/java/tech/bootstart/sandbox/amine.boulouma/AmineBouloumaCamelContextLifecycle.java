package tech.bootstart.sandbox.amine.boulouma;

import org.apache.camel.component.servletlistener.CamelContextLifecycle;
import org.apache.camel.component.servletlistener.ServletCamelContext;
import org.apache.camel.impl.SimpleRegistry;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tech.bootstart.utils.camel.PropertiesHelper;
import tech.bootstart.utils.elasticsearch.ElasticsearchHelper;

import java.net.InetAddress;

public class AmineBouloumaCamelContextLifecycle implements CamelContextLifecycle<SimpleRegistry> {
    static Logger LOG = LoggerFactory.getLogger(AmineBouloumaCamelContextLifecycle.class);
    TransportClient elasticsearchClient;
    @Override
    public void beforeStart(ServletCamelContext servletCamelContext, SimpleRegistry simpleRegistry) throws Exception {

    }

    @Override
    public void afterStart(ServletCamelContext servletCamelContext, SimpleRegistry simpleRegistry) throws Exception {

    }

    @Override
    public void beforeStop(ServletCamelContext servletCamelContext, SimpleRegistry simpleRegistry) throws Exception {

    }

    @Override
    public void afterStop(ServletCamelContext servletCamelContext, SimpleRegistry simpleRegistry) throws Exception {
        elasticsearchClient.close();
    }

    @Override
    public void beforeAddRoutes(ServletCamelContext camelContext, SimpleRegistry registry) throws Exception {
        int port = PropertiesHelper.property(camelContext, "elasticsearch.cluster.port", Integer.class).get();
        String[] addresses = PropertiesHelper.property(camelContext, "elasticsearch.cluster.address").get().split("\\s*,\\s*");
        Settings elasticsearchSettings = Settings.settingsBuilder()
                .put("cluster.name", PropertiesHelper.property(camelContext, "elasticsearch.cluster.name").get())
                .put("client.transport.sniff", PropertiesHelper.property(camelContext, "elasticsearch.cluster.sniff", Boolean.class).orElse(Boolean.FALSE))
                .build();
        elasticsearchClient = TransportClient.builder().settings(elasticsearchSettings).build();
        for (String address : addresses) {
            LOG.info("Adding elastic address : "+address);
            elasticsearchClient.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(address), port));
        }
        registry.put("elasticsearchClient", elasticsearchClient);
        registry.put("elasticsearch", new ElasticsearchHelper(elasticsearchClient));
    }

    @Override
    public void afterAddRoutes(ServletCamelContext servletCamelContext, SimpleRegistry simpleRegistry) throws Exception {

    }
}
