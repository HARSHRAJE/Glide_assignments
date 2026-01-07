package crud.demo.service;

import crud.demo.models.User;
import crud.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testCreateUser() {
        // Given
        User user = new User("John", "john@example.com", 30);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        User createdUser = userService.createUser(user);

        // Then
        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getName()).isEqualTo("John");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testGetAllUsers() {
        // Given
        User user1 = new User("John", "john@example.com", 30);
        User user2 = new User("Jane", "jane@example.com", 25);
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        // When
        List<User> users = userService.getAllUsers();

        // Then
        assertThat(users).hasSize(2);
        assertThat(users.get(0).getName()).isEqualTo("John");
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        // Given
        User user = new User("John", "john@example.com", 30);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        // When
        Optional<User> foundUser = userService.getUserById("1");

        // Then
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getName()).isEqualTo("John");
        verify(userRepository, times(1)).findById("1");
    }

    @Test
    void testUpdateUser() {
        // Given
        User existingUser = new User("John", "john@example.com", 30);
        User updateDetails = new User("John Updated", "john.updated@example.com", 31);
        when(userRepository.findById("1")).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updateDetails);

        // When
        User updatedUser = userService.updateUser("1", updateDetails);

        // Then
        assertThat(updatedUser).isNotNull();
        assertThat(updatedUser.getName()).isEqualTo("John Updated");
        verify(userRepository, times(1)).findById("1");
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    void testPatchUser() {
        // Given
        User existingUser = new User("John", "john@example.com", 30);
        User patchDetails = new User();
        patchDetails.setName("John Patched");
        when(userRepository.findById("1")).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        // When
        User patchedUser = userService.patchUser("1", patchDetails);

        // Then
        assertThat(patchedUser).isNotNull();
        assertThat(patchedUser.getName()).isEqualTo("John Patched");
        assertThat(patchedUser.getEmail()).isEqualTo("john@example.com"); // unchanged
        verify(userRepository, times(1)).findById("1");
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    void testDeleteUser() {
        // When
        userService.deleteUser("1");

        // Then
        verify(userRepository, times(1)).deleteById("1");
    }
}