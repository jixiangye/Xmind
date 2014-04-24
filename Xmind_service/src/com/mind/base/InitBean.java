package com.mind.base;

import java.util.TimeZone;

public class InitBean {
	static {
		TimeZone timezone = TimeZone.getTimeZone("Asia/Shanghai");
		TimeZone.setDefault(timezone);
	}
}
