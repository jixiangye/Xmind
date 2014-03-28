package com.bysj.utils;

public class StringUtils {
    public static boolean isEmpty(String str) {
        return null == str || str.length() == 0;
    }

    public static String addPercent(String str) {
        return "%" + str + "%";
    }

    public static String checkNull(Object obj) {
        return obj == null ? "" : obj.toString();
    }
}
