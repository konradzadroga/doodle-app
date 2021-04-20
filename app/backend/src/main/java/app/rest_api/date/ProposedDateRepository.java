package app.rest_api.date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProposedDateRepository extends JpaRepository<ProposedDate, Long> {
    ProposedDate findByMeetingIdAndProponentUsername(long id, String username);
    Optional<ProposedDate> findById(long id);
}
