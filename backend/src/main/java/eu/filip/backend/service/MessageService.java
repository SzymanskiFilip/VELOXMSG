package eu.filip.backend.service;

import eu.filip.backend.dto.MessageDto;
import eu.filip.backend.entity.Message;
import eu.filip.backend.repository.MessageReposiroty;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.Arrays;
import java.util.List;

@Service
public class MessageService {
    private MessageReposiroty messageReposiroty;

    public MessageService(MessageReposiroty messageReposiroty) {
        this.messageReposiroty = messageReposiroty;
    }

    public List<Message> getMessages(Long chatId){
        return messageReposiroty.findMessagesFromChatId(chatId)
                .orElseThrow(() -> new ResourceAccessException("Cant find messages"));
    }
}
