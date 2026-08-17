package org.techhub.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    private static final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    private PasswordUtil() {

    }

    public static String encryptPassword(String password) {

        return encoder.encode(password);

    }

    public static boolean matchPassword(
            String rawPassword,
            String encodedPassword) {

        return encoder.matches(rawPassword, encodedPassword);

    }

}