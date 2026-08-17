package org.techhub.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http


        // Disable CSRF for REST APIs
        .csrf(csrf -> csrf.disable())



        .authorizeHttpRequests(auth -> auth



            /*
             ============================================
                    FRONTEND PAGES
             ============================================
            */

            .requestMatchers(

                    "/",
                    "/index.html",
                    "/pages/**",

                    "/css/**",
                    "/js/**",
                    "/images/**",

                    "/favicon.ico"

            ).permitAll()



            /*
             ============================================
                    STUDENT APIs
             ============================================
            */

            .requestMatchers(

                    "/api/student/**"

            ).permitAll()



            /*
             ============================================
                    ADMIN APIs
             ============================================
            */

            .requestMatchers(

                    "/api/admin/**"

            ).permitAll()



            /*
             ============================================
                    ASSESSMENT APIs
             ============================================
            */

            .requestMatchers(

                    "/api/assessment/**"

            ).permitAll()



            /*
             ============================================
                    QUESTION APIs
             ============================================
            */

            .requestMatchers(

                    "/api/question/**"

            ).permitAll()



            /*
             ============================================
                    COURSE APIs
             ============================================
            */

            .requestMatchers(

                    "/api/course/**"

            ).permitAll()



            /*
             ============================================
                    CAREER APIs
             ============================================
            */

            .requestMatchers(

                    "/api/career/**"

            ).permitAll()



            /*
             ============================================
                    RESULT APIs
             ============================================
            */

            .requestMatchers(

                    "/api/result/**"

            ).permitAll()



            /*
             ============================================
                    SWAGGER
             ============================================
            */

            .requestMatchers(

                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"

            ).permitAll()



            /*
             ============================================
                    DEVELOPMENT MODE
                    ALLOW EVERYTHING ELSE
             ============================================
            */

            .anyRequest().permitAll()



        )



        /*
        Disable default login page
        */

        .formLogin(
                form -> form.disable()
        )



        /*
        Disable basic authentication popup
        */

        .httpBasic(
                basic -> basic.disable()
        );



        return http.build();

    }

}