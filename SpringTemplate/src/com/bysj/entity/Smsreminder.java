package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the SMSREMINDER database table.
 * 
 */
@Entity
@Table(name="APP.SMSREMINDER")
public class Smsreminder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="BUILDING_NAME")
	private String buildingName;

	@Column(name="CUST_NAME")
	private String custName;

	@Temporal(TemporalType.DATE)
	private Date deadline;

	@Column(name="HOUSE_NUMBER")
	private String houseNumber;

	@Column(name="OWE_PRICE")
	private BigDecimal owePrice;

	private String phone;

	public Smsreminder() {
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

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Date getDeadline() {
		return this.deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public String getHouseNumber() {
		return this.houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public BigDecimal getOwePrice() {
		return this.owePrice;
	}

	public void setOwePrice(BigDecimal owePrice) {
		this.owePrice = owePrice;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}