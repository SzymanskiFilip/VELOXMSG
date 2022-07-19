package eu.filip.backend.repository;

import eu.filip.backend.entity.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    @Query(nativeQuery = true, value = "select * from messages where room_id = ?1")
    Optional<List<Message>> findMessagesFromChatId(Long chatId);
}
