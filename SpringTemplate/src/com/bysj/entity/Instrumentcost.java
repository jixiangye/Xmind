package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;

import java.math.BigDecimal;


/**
 * The persistent class for the INSTRUMENTCOST database table.
 * 
 */
@Entity
@Table(name="APP.INSTRUMENTCOST")
public class Instrumentcost implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="BUILDING_NAME")
	private String buildingName;

	@Column(name="CUST_ID")
	private Integer custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="ELECTRI_PRICE")
	private BigDecimal electriPrice;

	@Column(name="HOUSE_ID")
	private Integer houseId;

	@Column(name="HOUSE_NUMBER")
	private String houseNumber;

	@Column(name="INSTRUMENT_TOTAL_PRICE")
	private BigDecimal instrumentTotalPrice;

	@Column(name="PRIVATE_ELECTRI_AMOUNT")
	private Integer privateElectriAmount;

	@Column(name="PRIVATE_WATER_AMOUNT")
	private Integer privateWaterAmount;

	@Column(name="PUBLIC_ELECTRI_AMOUNT")
	private Integer publicElectriAmount;

	@Column(name="PUBLIC_WATER_AMOUNT")
	private Integer publicWaterAmount;

	@Column(name="WATER_PRICE")
	private BigDecimal waterPrice;

	public Instrumentcost() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBuildingName() {
		return this.buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
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

	public BigDecimal getElectriPrice() {
		return this.electriPrice;
	}

	public void setElectriPrice(BigDecimal electriPrice) {
		this.electriPrice = electriPrice;
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

	public BigDecimal getInstrumentTotalPrice() {
		return this.instrumentTotalPrice;
	}

	public void setInstrumentTotalPrice(BigDecimal instrumentTotalPrice) {
		this.instrumentTotalPrice = instrumentTotalPrice;
	}

	public Integer getPrivateElectriAmount() {
		return this.privateElectriAmount;
	}

	public void setPrivateElectriAmount(Integer privateElectriAmount) {
		this.privateElectriAmount = privateElectriAmount;
	}

	public Integer getPrivateWaterAmount() {
		return this.privateWaterAmount;
	}

	public void setPrivateWaterAmount(Integer privateWaterAmount) {
		this.privateWaterAmount = privateWaterAmount;
	}

	public Integer getPublicElectriAmount() {
		return this.publicElectriAmount;
	}

	public void setPublicElectriAmount(Integer publicElectriAmount) {
		this.publicElectriAmount = publicElectriAmount;
	}

	public Integer getPublicWaterAmount() {
		return this.publicWaterAmount;
	}

	public void setPublicWaterAmount(Integer publicWaterAmount) {
		this.publicWaterAmount = publicWaterAmount;
	}

	public BigDecimal getWaterPrice() {
		return this.waterPrice;
	}

	public void setWaterPrice(BigDecimal waterPrice) {
		this.waterPrice = waterPrice;
	}

}