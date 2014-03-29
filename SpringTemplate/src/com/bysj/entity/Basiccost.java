package com.bysj.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the BASICCOST database table.
 * 
 */
@Entity
@Table(name="APP.BASICCOST")
public class Basiccost implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="BASIC_TOTAL_PRICE")
	private BigDecimal basicTotalPrice;

	@Column(name="CLEAN_PRICE")
	private BigDecimal cleanPrice;

	@Column(name="CLEAN_TOTAL_PRICE")
	private BigDecimal cleanTotalPrice;

	@Column(name="CUST_ID")
	private Integer custId;

	@Column(name="HOUSE_AREA")
	private String houseArea;

	@Column(name="SECURITY_PRICE")
	private BigDecimal securityPrice;

	@Column(name="SECURITY_TOTAL_PRICE")
	private BigDecimal securityTotalPrice;

	public Basiccost() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public BigDecimal getBasicTotalPrice() {
		return this.basicTotalPrice;
	}

	public void setBasicTotalPrice(BigDecimal basicTotalPrice) {
		this.basicTotalPrice = basicTotalPrice;
	}

	public BigDecimal getCleanPrice() {
		return this.cleanPrice;
	}

	public void setCleanPrice(BigDecimal cleanPrice) {
		this.cleanPrice = cleanPrice;
	}

	public BigDecimal getCleanTotalPrice() {
		return this.cleanTotalPrice;
	}

	public void setCleanTotalPrice(BigDecimal cleanTotalPrice) {
		this.cleanTotalPrice = cleanTotalPrice;
	}

	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getHouseArea() {
		return this.houseArea;
	}

	public void setHouseArea(String houseArea) {
		this.houseArea = houseArea;
	}

	public BigDecimal getSecurityPrice() {
		return this.securityPrice;
	}

	public void setSecurityPrice(BigDecimal securityPrice) {
		this.securityPrice = securityPrice;
	}

	public BigDecimal getSecurityTotalPrice() {
		return this.securityTotalPrice;
	}

	public void setSecurityTotalPrice(BigDecimal securityTotalPrice) {
		this.securityTotalPrice = securityTotalPrice;
	}

}