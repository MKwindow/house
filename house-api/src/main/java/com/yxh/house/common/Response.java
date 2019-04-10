package com.yxh.house.common;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class Response {
    private int code;
    private String msg;
    private Object data;

    private static Response buildResponse(Status status, Object... data){
        return Response
                .builder()
                .code(status.getCode())
                .msg(status.getMsg())
                .data(data)
                .build();
    }

    public static Response Success(Object... data){
        Status success = Status.SUCCESS;
        return buildResponse(success, data);
    }
    public static Response Fail(Object... data){
        Status fail = Status.FAIL;
        return buildResponse(fail, data);
    }
    public static Response PermissionDenied(Object... data){
        return buildResponse(Status.PERMISSION_DENIED,data);
    }
}

enum Status{
    SUCCESS(200, "操作成功"),
    FAIL(500, "操作失败"),
    PERMISSION_DENIED(401,"无权操作")
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