package app.rest_api.vote;
import app.rest_api.date.ProposedDate;
import app.rest_api.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "votes")
@NoArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProposedDate proposedDate;

    @ManyToOne
    private User voter;

    public Vote(ProposedDate proposedDate, User voter) {
        this.proposedDate = proposedDate;
        this.voter = voter;
    }
}
