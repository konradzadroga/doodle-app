package app.rest_api.date;

import app.rest_api.user.User;
import app.rest_api.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ProposedDateService {
    private ProposedDateRepository proposedDateRepository;

    public ProposedDate saveProposedDate(ProposedDate proposedDate) {
        return proposedDateRepository.save(proposedDate);
    }

    public ProposedDate findByMeetingIdAndUsername(long id, String username) {
        ProposedDate proposedDate = proposedDateRepository.findByMeetingIdAndProponentUsername(id, username);

        return proposedDate;
    }

    public ProposedDate findById(long id) {
        ProposedDate proposedDate = proposedDateRepository.findById(id).orElseThrow(() -> {
            throw new NoSuchElementException("Meeting not found");
        });

        return proposedDate;
    }
}
