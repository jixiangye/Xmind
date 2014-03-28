package com.bysj.utils;

import java.util.Collection;
import java.util.List;

import org.dozer.DozerBeanMapper;

import com.google.common.collect.Lists;

public class BeanUtils {
    private static final DozerBeanMapper DOZER = new DozerBeanMapper();

    /**
     * @param source
     * @param destinationClass
     * @return
     */
    public static <T> T map(Object source, Class<T> destinationClass) {
        return DOZER.map(source, destinationClass);
    }

    /**
     * @param sourceList
     * @param destinationClass
     * @return
     */
    public static <T> List<T> mapList(Collection<?> sourceList, Class<T> destinationClass) {
        List<T> destinationList = Lists.newArrayList();
        for (Object sourceObject : sourceList) {
            T destinationObject = DOZER.map(sourceObject, destinationClass);
            destinationList.add(destinationObject);
        }
        return destinationList;
    }

    /**
     * @param source
     * @param destinationObject
     */
    public static void copy(Object source, Object destinationObject) {
        DOZER.map(source, destinationObject);
    }
}
