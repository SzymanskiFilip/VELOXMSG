package eu.filip.backend.socket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {

    private CustomHandshakeInterceptor handshakeInterceptor;

    public SocketConfig(CustomHandshakeInterceptor handshakeInterceptor) {
        this.handshakeInterceptor = handshakeInterceptor;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp")
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        //prefix of every message
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(handshakeInterceptor);
    }
}
