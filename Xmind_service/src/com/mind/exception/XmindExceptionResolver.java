package com.mind.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

public class XmindExceptionResolver extends SimpleMappingExceptionResolver {
    @Override
    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (ex instanceof NotLoggedInException) {
            try {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ModelAndView();
    }
}
