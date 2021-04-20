package app.rest_api.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetVotesDTO {
    private long proposedDateId;
    private List<String> usersWhoVoted;
}
