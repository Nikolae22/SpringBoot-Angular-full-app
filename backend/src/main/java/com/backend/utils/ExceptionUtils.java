package com.backend.utils;

import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.backend.domain.HttpResponse;
import com.backend.exception.ApiException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;

import java.io.OutputStream;

import static java.time.LocalTime.now;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class ExceptionUtils {

    public static void processError(HttpServletRequest request,
                                    HttpServletResponse response,
                                    Exception exception) {
        if (exception instanceof ApiException || exception instanceof DisabledException
                || exception instanceof LockedException || exception instanceof InvalidClaimException
                || exception instanceof TokenExpiredException|| exception instanceof BadCredentialsException) {
            HttpResponse httpResponse = getHttpResponse(response, exception.getMessage(), HttpStatus.BAD_REQUEST);
            writeResponse(response,httpResponse);
        }else {
            HttpResponse httpResponse = getHttpResponse(response,"An error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
            writeResponse(response,httpResponse);
        }
        log.error(exception.getMessage());
        exception.getStackTrace();
    }

    private static void writeResponse(HttpServletResponse response, HttpResponse httpResponse) {
        try{
            OutputStream out = response.getOutputStream();
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(out, httpResponse);
            out.flush();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private static HttpResponse getHttpResponse(HttpServletResponse response,
                                                String message, HttpStatus httpStatus) {
        HttpResponse httpResponse= HttpResponse.builder()
                .timeStamp(now().toString())
                .reason("You need to log in to access this resource")
                .status(UNAUTHORIZED)
                .statusCode(UNAUTHORIZED.value())
                .build();
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(UNAUTHORIZED.value());
        return httpResponse;
    }
}
