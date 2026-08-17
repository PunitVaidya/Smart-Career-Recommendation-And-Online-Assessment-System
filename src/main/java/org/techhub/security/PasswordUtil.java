package org.techhub.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public final class PasswordUtil {

    private static final PasswordEncoder PASSWORD_ENCODER =
            new BCryptPasswordEncoder();

    private PasswordUtil() {

    }

    public static String encryptPassword(String password) {

        return PASSWORD_ENCODER.encode(password);

    }

    public static boolean matchPassword(String rawPassword,
                                        String encodedPassword) {

        return PASSWORD_ENCODER.matches(rawPassword, encodedPassword);

    }

}