package com.yxh.house.common;

import lombok.Builder;
import lombok.Data;

/**
 * 作者: sxy
 * 时间: 2019/3/22
 */
@Data
@Builder
public class Response {
    private int code;
    private String msg;
    private Object data;

    public static Response Success(Object... data){
        Status success = Status.SUCCESS;
        return Response
                .builder()
                .code(success.getCode())
                .msg(success.getMsg())
                .data(data)
                .build();
    }
    public static Response Fail(){
        Status fail = Status.FAIL;
        return Response
                .builder()
                .code(fail.getCode())
                .msg(fail.getMsg())
                .build();
    }
}

enum Status{
    SUCCESS(200, "操作成功"),
    FAIL(500, "操作失败"),
    ;
    private int code;
    private String msg;

    Status(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}