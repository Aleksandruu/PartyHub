package com.partyhub.PartyHub.service.impl;

import com.partyhub.PartyHub.dto.ProfileDto;
import com.partyhub.PartyHub.entities.User;
import com.partyhub.PartyHub.entities.UserDetails;
import com.partyhub.PartyHub.service.ProfileService;
import com.partyhub.PartyHub.service.UserService;
import com.partyhub.PartyHub.service.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileDto getProfile(String email) {
        User user = userService.findByEmail(email);

        UserDetails details = user.getUserDetails();

        ProfileDto profile = new ProfileDto();
        profile.setUserId(user.getId());
        profile.setEmail(user.getEmail());
        profile.setPromoCode(user.getPromoCode());
        profile.setFullName(details.getFullName());
        profile.setAge(details.getAge());


        return profile;
    }

    @Override
    public void updateProfileDetails(String email, ProfileDto updatedProfile) {
        User user = userService.findByEmail(email);

        UserDetails details = user.getUserDetails();

        details.setFullName(updatedProfile.getFullName());
        details.setAge(updatedProfile.getAge());


        userDetailsService.save(details);
    }

    @Override
    public void deleteProfile(String email) {
        User user = userService.findByEmail(email);

        UserDetails userDetails = user.getUserDetails();

        user.setUserDetails(null);
        userDetailsService.delete(userDetails);
        userService.delete(user);
    }

    @Override
    public void resetPassword(String email, String newPassword) {
        User user = userService.findByEmail(email);

        System.out.println(newPassword);

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);

        userService.save(user);
    }

}
