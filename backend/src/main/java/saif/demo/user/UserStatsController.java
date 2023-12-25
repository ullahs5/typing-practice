package saif.demo.user;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
public class UserStatsController {

    private final UserRepository userRepository;

    public UserStatsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    record statsRequest(String username, int averageWpm, int averageAccuracy){}
    @PostMapping("/api/stats/postuser")
    public ResponseEntity<User> putStats(@RequestBody statsRequest statsrequest){
        User user = userRepository.findByUsername(statsrequest.username()).orElseThrow();
        user.setAverageAccuracy((user.getAverageAccuracy() + statsrequest.averageAccuracy()) / 2);
        user.setAverageWPM((user.getAverageWPM() + statsrequest.averageWpm()) / 2);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/api/stats/getuser/{username}")
    public ResponseEntity<List<Integer>> getStats(@PathVariable("username") String username){
        User user = userRepository.findByUsername(username).orElseThrow();
        List<Integer> stats = new ArrayList<>();
        stats.add(user.getAverageAccuracy());
        stats.add(user.getAverageWPM());
        return ResponseEntity.ok(stats);
    }



}
