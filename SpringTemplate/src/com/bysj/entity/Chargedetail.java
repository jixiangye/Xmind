package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the CHARGEDETAIL database table.
 * 
 */
@Entity
@Table(name="APP.CHARGEDETAIL")
public class Chargedetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="CUST_ID")
	private Integer custId;

	private String operater;

	@Column(name="PAY_COST")
	private BigDecimal payCost;

	@Temporal(TemporalType.DATE)
	@Column(name="PAY_TIME")
	private Date payTime;

	public Chargedetail() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getOperater() {
		return this.operater;
	}

	public void setOperater(String operater) {
		this.operater = operater;
	}

	public BigDecimal getPayCost() {
		return this.payCost;
	}

	public void setPayCost(BigDecimal payCost) {
		this.payCost = payCost;
	}

	public Date getPayTime() {
		return this.payTime;
	}

	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

}