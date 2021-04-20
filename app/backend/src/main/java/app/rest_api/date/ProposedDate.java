package app.rest_api.date;

import app.rest_api.meeting.Meeting;
import app.rest_api.user.User;
import app.rest_api.vote.Vote;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "proposed_dates")
@NoArgsConstructor
public class ProposedDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat
    private Date proposedStartDate;

    @NotBlank
    private int proposedStartTime;

    @NotBlank
    private int proposedEndTime;

    @ManyToOne
    private Meeting meeting;

    @OneToOne
    private User proponent;

    @OneToMany(mappedBy = "proposedDate")
    private List<Vote> votes;

    public ProposedDate(Date proposedStartDate, @NotBlank int proposedStartTime, @NotBlank int proposedEndTime, Meeting meeting, User proponent) {
        this.proposedStartDate = proposedStartDate;
        this.proposedStartTime = proposedStartTime;
        this.proposedEndTime = proposedEndTime;
        this.meeting = meeting;
        this.proponent = proponent;
    }
}
