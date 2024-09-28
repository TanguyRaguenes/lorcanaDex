package fr.app.lorcanaDex.configuration;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

                        .requestMatchers("/").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/logout").authenticated()

                        // .requestMatchers("/chocolatine").hasAuthority("ROLE_EMPLOYE")
                        // //Ou .requestMatchers("/chocolatine").hasRole("EMPLOYE")
                        // .requestMatchers("/show-aliments").hasAuthority("ROLE_FORMATEUR")
                        // .requestMatchers("/show-aliment/{id}").hasAuthority("ROLE_FORMATEUR")
                        // .requestMatchers("/demo-debug").hasAnyAuthority("ROLE_EMPLOYE",
                        // "ROLE_FORMATEUR", "ROLE_ADMIN")
                        // .requestMatchers(HttpMethod.GET,"/show-aliment-form").hasAnyAuthority("ROLE_EMPLOYE",
                        // "ROLE_FORMATEUR")
                        // .requestMatchers(HttpMethod.POST,"/aliment-form").hasAnyAuthority("ROLE_EMPLOYE",
                        // "ROLE_FORMATEUR")
                        // .requestMatchers("/show-basket-1").hasAuthority("ROLE_ADMIN")
                        // .requestMatchers("/show-basket-2").hasAuthority("ROLE_ADMIN")
                        // .requestMatchers("/clear-basket").hasAuthority("ROLE_ADMIN")

                        // Pour que notre css puisse s'exécuter
                        // .requestMatchers("/vendor/**").permitAll()

                        // Pour indiquer que toutes les URL qui commencent par :
                        // .requestMatchers("/show-aliment/**").hasAuthority("FORMATEUR")

                        .anyRequest().denyAll()
                // -> rejette toutes les requêtes non configurées

                // On pourrait aussi faire :
                // .anyRequest().authenticated()
                // -> accepte toutes les requêtes non configurées

                );

        // Pour utiliser le fonctionnement de login de Spring Security par défaut
        http.formLogin(Customizer.withDefaults());
        // ...

        return http.build();
    }

}