package com.bysj.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ExcelUtils {
    /**
     * 描述:		导出excel
     *
     * @param fileName 文件名
     * @param titles 标题列名
     * @param contents 内容
     * @return
     */
    public static ResponseEntity<byte[]> export(String fileName, String[] titles, List<List<String>> contents) {
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("sheet1");
        HSSFRow row = sheet.createRow((int) 0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell;
        for (int i = 0, len = titles.length; i < len; i++) {
            cell = row.createCell(i, HSSFCell.CELL_TYPE_STRING);
            cell.setCellValue(titles[i]);
            cell.setCellStyle(style);
        }

        for (int i = 0, len = contents.size(); i < len; i++) {
            row = sheet.createRow(i + 1);
            for (int j = 0, len2 = contents.get(i).size(); j < len2; j++) {
                row.createCell(j, HSSFCell.CELL_TYPE_STRING).setCellValue(contents.get(i).get(j));

            }
        }
        return download(wb, fileName);
    }

    /**
     * 下载Excel文件
     * @param workbook
     * @param fileName          文件名称(带上文件后缀)
     * @return
     */
    public static ResponseEntity<byte[]> download(Workbook workbook, String fileName) {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        try {
            workbook.write(os);
            return download(getBytes(workbook), fileName);
        } catch (IOException e) {
            throw new RuntimeException("获取文件流失败！", e);
        } finally{
            try {
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /** 通过Workbook得到一个byte[]： */
    public static byte[] getBytes(Workbook workbook) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        workbook.write(os);
        return os.toByteArray();
    }

    /**
     * 下载文件
     * @param b                 字节数组
     * @param fileName          文件名称(带上文件后缀)
     * @return
     */
    public static ResponseEntity<byte[]> download(byte[] b, String fileName) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        try {
            headers.setContentDispositionFormData("attachment", new String(fileName.getBytes("UTF-8"), "iso-8859-1"));
        } catch (Exception e) {
            throw new RuntimeException("文件名称编码异常！", e);
        }
        return new ResponseEntity<byte[]>(b, headers, HttpStatus.CREATED);
    }

}
