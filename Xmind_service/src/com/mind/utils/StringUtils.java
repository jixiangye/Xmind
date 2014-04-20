package com.mind.utils;

public class StringUtils {
	public static String checkNull(Object obj) {
		return obj == null ? "" : obj.toString();
	}

	public static boolean isEmpty(String str) {
		return str == null || "".equals(str);
	}
}
