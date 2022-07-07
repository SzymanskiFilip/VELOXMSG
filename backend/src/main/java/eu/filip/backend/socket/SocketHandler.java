package eu.filip.backend.socket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import static eu.filip.backend.util.ConsoleColors.TEXT_RED;

@Component
public class SocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println(TEXT_RED + "CONNECTION HANDLER" + session.getPrincipal());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println(TEXT_RED + " - " + session.getPrincipal() + " " + message.toString());
    }
}
