package eu.filip.backend.entity;

import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.util.List;

@Table(name = "rooms")
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean type;

    @OneToMany
    @JoinColumn(name = "participants")
    List<Participant> participant;

    public Room(Long id, String name, boolean type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Room(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isType() {
        return type;
    }

    public void setType(boolean type) {
        this.type = type;
    }
}
