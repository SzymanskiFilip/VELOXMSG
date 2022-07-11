package eu.filip.backend.entity;

import javax.persistence.*;

@Table(name = "participants")
@Entity
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class)
    private Long user_id;

    @ManyToOne(targetEntity = Room.class)
    private Long room_id;

    public Participant(Long id, Long user_id, Long room_id) {
        this.id = id;
        this.user_id = user_id;
        this.room_id = room_id;
    }

    public Participant(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }
}
