package eu.filip.backend.repository;

import eu.filip.backend.entity.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageReposiroty extends CrudRepository<Message, Long> {
}
