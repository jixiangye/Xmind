package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.bysj.utils.DateUtils;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the CHARGETOTAL database table.
 * 
 */
@Entity
@Table(name="APP.CHARGETOTAL")
public class Chargetotal implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="BASIC_TOTAL_PRICE")
	private BigDecimal basicTotalPrice;

	@Column(name="BUILDING_NAME")
	private String buildingName;

	@Column(name="CUST_NAME")
	private String custName;

	@Temporal(TemporalType.DATE)
	private Date deadline;

	@Column(name="HOUSE_NUMBER")
	private String houseNumber;

	@Column(name="INSTRUMENT_TOTAL_PRICE")
	private BigDecimal instrumentTotalPrice;

	private String status;

	@Column(name="TOTAL_PRICE")
	private BigDecimal totalPrice;

	public Chargetotal() {
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

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Date getDeadline() {
		return this.deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = DateUtils.parse(deadline, "yyyy-MM-dd");
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

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

}