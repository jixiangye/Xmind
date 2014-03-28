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

	@Column(name="BUILDING_NAME")
	private String buildingName;

	@Column(name="CLEAN_PRICE")
	private BigDecimal cleanPrice;

	@Column(name="CLEAN_TOTAL_PRICE")
	private BigDecimal cleanTotalPrice;

	@Column(name="CUST_ID")
	private Integer custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="HOUSE_AREA")
	private String houseArea;

	@Column(name="HOUSE_ID")
	private Integer houseId;

	@Column(name="HOUSE_NUMBER")
	private String houseNumber;

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

	public String getBuildingName() {
		return this.buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
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

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getHouseArea() {
		return this.houseArea;
	}

	public void setHouseArea(String houseArea) {
		this.houseArea = houseArea;
	}

	public Integer getHouseId() {
		return this.houseId;
	}

	public void setHouseId(Integer houseId) {
		this.houseId = houseId;
	}

	public String getHouseNumber() {
		return this.houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
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