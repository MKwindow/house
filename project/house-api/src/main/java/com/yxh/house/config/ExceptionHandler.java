package com.yxh.house.config;

import com.yxh.house.common.Response;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequestWrapper;

/**
 * 作者: sxy
 * 时间: 2019/3/29
 */

@RestController
public class ExceptionHandler implements ErrorController {
    private static final String ERROR_PATH = "error";

    @RequestMapping(ERROR_PATH)
    public Response errorPage(Throwable throwable){
        throwable.printStackTrace();
        return Response.Fail();
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
