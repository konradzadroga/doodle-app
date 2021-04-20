package app.rest_api.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteDTO {

    private long id;
    private long proposedDateId;
    private String voter;

    public VoteDTO(Vote vote) {
        this.id = vote.getId();
        this.proposedDateId = vote.getProposedDate().getId();
        this.voter = vote.getVoter().getUsername();
    }

}
