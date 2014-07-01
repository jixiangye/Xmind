package com.mind.aspect;

import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.mind.controller.LoginController;
import com.mind.exception.NotLoggedInException;

@Aspect
@Component
public class LogAspect {
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object aroundController(ProceedingJoinPoint joinPoint) {
        if (!(joinPoint.getTarget() instanceof LoginController)) {
            Object[] args = joinPoint.getArgs();
            for (Object object : args) {
                if (object instanceof HttpSession) {
                    if (((HttpSession) object).getAttribute("id") == null) {
                        throw new NotLoggedInException();
                    }
                }
            }
        }
        long st = System.nanoTime();
        Object obj = null;
        try {
            obj = joinPoint.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        System.out.println(joinPoint);
        System.out.println(System.nanoTime() - st);
        return obj;
    }
}
