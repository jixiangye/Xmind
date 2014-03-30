package com.mind.utils;

public class StringUtils {
	public static String checkNull(Object obj) {
		return obj == null ? "" : obj.toString();
	}
}
