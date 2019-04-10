package com.yxh.house.config;

import com.yxh.house.common.Response;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



//@RestController
public class ExceptionHandler implements ErrorController {
    private static final String ERROR_PATH = "error";

    @RequestMapping(ERROR_PATH)
    public Response errorPage(){
        return Response.Fail();
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
