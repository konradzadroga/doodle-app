package app.rest_api.vote;

import app.rest_api.date.ProposedDate;
import app.rest_api.date.ProposedDateService;
import app.rest_api.user.User;
import app.rest_api.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class VoteService {

    private VoteRepository voteRepository;
    private ProposedDateService proposedDateService;
    private UserService userService;

    public VoteDTO addVote(long proposedDateId) {
        ProposedDate proposedDate = proposedDateService.findById(proposedDateId);
        User voter = userService.findCurrentUser();
        Vote vote = new Vote(proposedDate, voter);
        vote = voteRepository.save(vote);
        VoteDTO voteDTO = new VoteDTO(vote);

        return voteDTO;
    }

    public GetVotesDTO getVotesForProposedDate(long proposedDateId) {
        List<Vote> votes = voteRepository.findAllByProposedDateId(proposedDateId);
        List<String> usersWhoVoted = new ArrayList<>();

        votes.forEach(vote -> {
            String username = vote.getVoter().getUsername();
            if (!usersWhoVoted.contains(username)) {
                usersWhoVoted.add(username);
            }
        });

        GetVotesDTO votesDTO = new GetVotesDTO(proposedDateId, usersWhoVoted);

        return votesDTO;
    }


}
