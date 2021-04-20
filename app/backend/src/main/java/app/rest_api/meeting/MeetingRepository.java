package app.rest_api.meeting;

import app.rest_api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findAll();
    List<Meeting> findAllByUsersUsername(String username);
    List<Meeting> findAllByUsersUsernameAndOrganizerUsernameNotLike(String username, String username2);
    List<Meeting> findAllByOrganizerUsername(String username);
    Optional<Meeting> findDistinctById(long id);
    List<Meeting> findAllByConfirmedTrueAndConfirmedStartDateAndUsersUsername(Date date, String username);
}
