package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.bysj.utils.DateUtils;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the SYSREMINDER database table.
 * 
 */
@Entity
@Table(name="APP.SYSREMINDER")
public class Sysreminder implements Serializable {
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

	@Column(name="REDMINER_CONTENT")
	private String redminerContent;

	@Temporal(TemporalType.DATE)
	@Column(name="REDMINER_TIME")
	private Date redminerTime;

	private String status;

	public Sysreminder() {
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

	public void setDeadline(String deadline) {
		this.deadline = DateUtils.parse(deadline, "yyyy-MM-dd");
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

	public String getRedminerContent() {
		return this.redminerContent;
	}

	public void setRedminerContent(String redminerContent) {
		this.redminerContent = redminerContent;
	}

	public Date getRedminerTime() {
		return this.redminerTime;
	}

	public void setRedminerTime(String redminerTime) {
		this.redminerTime = DateUtils.parse(redminerTime, "yyyy-MM-dd");
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}