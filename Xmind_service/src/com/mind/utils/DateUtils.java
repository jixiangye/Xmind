package com.mind.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateUtils {
    private static final Log logger = LogFactory.getLog(DateUtils.class);

    /**
     * 字符串转换为Date对象
     * 
     * @param source
     *            字符串
     * @param format
     *            日期格式
     * @return 为空，或转换失败时皆返回null
     */
    public static Date parse(String source, String format) {
        if (StringUtils.isEmpty(source) || StringUtils.isEmpty(format)) {
            return null;
        }

        try {
            return new SimpleDateFormat(format).parse(source);
        } catch (Exception e) {
            logger.error("字符串转换为Date对象时异常", e);
            return null;
        }
    }

    /**
     * Date对象转换为字符串
     * 
     * @param date
     *            Date
     * @param format
     *            日期格式
     * @return 为空，或转换失败时皆返回null
     */
    public static String format(Date date, String format) {
        if (null == date || StringUtils.isEmpty(format)) {
            return null;
        }

        try {
            return new SimpleDateFormat(format).format(date);
        } catch (Exception e) {
            logger.error("Date对象转换为字符串时异常", e);
            return null;
        }
    }

    public static void main(String[] args) {
        System.out.println(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    }
}
