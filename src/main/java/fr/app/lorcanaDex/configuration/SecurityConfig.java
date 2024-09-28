package fr.app.lorcanaDex.configuration;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        jdbcUserDetailsManager.setUsersByUsernameQuery("SELECT pseudo, password,1 FROM account WHERE pseudo=?");

        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery("SELECT pseudo, role FROM role WHERE pseudo=?");

        return jdbcUserDetailsManager;
    }

    @Bean
    public SecurityFilterChain web(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize

                        .requestMatchers("/").authenticated()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/logout").authenticated()
                        .requestMatchers("/get-cards").authenticated()
                        .requestMatchers("/api/cards").authenticated()
                        .requestMatchers("/show-home").authenticated()

                        // .requestMatchers("/test").hasAuthority("ROLE_EMPLOYE")
                        // .requestMatchers("/test").hasAnyAuthority("ROLE_EMPLOYE","ROLE_FORMATEUR")
                        // .requestMatchers(HttpMethod.GET,"/test").hasAnyAuthority("ROLE_EMPLOYE","ROLE_FORMATEUR")
                        // .requestMatchers(HttpMethod.POST,"/test").hasAnyAuthority("ROLE_EMPLOYE","ROLE_FORMATEUR")

                        // Pour que notre css puisse s'exécuter
                        // .requestMatchers("/vendor/**").permitAll()

                        // Pour indiquer que toutes les URL qui commencent par :
                        // .requestMatchers("/show-aliment/**").hasAuthority("FORMATEUR")

                        .anyRequest().denyAll()

                // On pourrait aussi faire :
                // .anyRequest().authenticated()

                );

        // Pour utiliser le fonctionnement de login de Spring Security par défaut
        http.formLogin(Customizer.withDefaults());
        // ...

        return http.build();
    }

}