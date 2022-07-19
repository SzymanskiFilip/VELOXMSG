package eu.filip.backend.service;

import eu.filip.backend.entity.Message;
import eu.filip.backend.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageReposiroty;

    public MessageService(MessageRepository messageReposiroty) {
        this.messageReposiroty = messageReposiroty;
    }

    public List<Message> getMessages(Long chatId){
        return messageReposiroty.findMessagesFromChatId(chatId)
                .orElseThrow(() -> new ResourceAccessException("Cant find messages"));
    }
}
