package eu.filip.backend.socket;

import org.hibernate.query.criteria.internal.predicate.PredicateImplementor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeFailureException;
import org.springframework.web.socket.server.HandshakeHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

import static eu.filip.backend.util.ConsoleColors.TEXT_RED;
import static eu.filip.backend.util.ConsoleColors.TEXT_RESET;

public class CustomHandshakeHandler implements HandshakeHandler {
    @Override
    public boolean doHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws HandshakeFailureException {
        System.out.println(TEXT_RED + " Connecting to socket" + TEXT_RESET);
        return true;
    }
}
