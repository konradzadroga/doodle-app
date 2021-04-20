package app.rest_api.meeting;
import app.rest_api.date.ProposedDate;
import app.rest_api.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Data
@Entity
@Table(name = "meetings")
@NoArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String location;

    @NotBlank
    private String description;

    @DateTimeFormat
    private Date confirmedStartDate;

    @NotBlank
    private int confirmedStartTime;

    @NotBlank
    private int confirmedEndTime;

    @Column
    private Boolean confirmed;

    @ManyToMany
    private List<User> users;

    @OneToOne
    private User organizer;

    @OneToMany(mappedBy = "meeting")
    private List<ProposedDate> proposedDates;

    public Meeting(@NotBlank String name, @NotBlank String location, @NotBlank String description, List<User> users, User organizer) throws ParseException {
        this.name = name;
        this.location = location;
        this.description = description;
        this.confirmedStartDate = new SimpleDateFormat("dd/MM/yyyy").parse("01/01/2001");
        this.confirmedStartTime = -2;
        this.confirmedEndTime = -1;
        this.confirmed = false;
        this.users = users;
        this.organizer = organizer;
    }
}
