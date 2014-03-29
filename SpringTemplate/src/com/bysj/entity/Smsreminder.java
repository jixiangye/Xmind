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

	@Temporal(TemporalType.DATE)
	private Date deadline;

	@Column(name="CUST_ID")
    private Integer custId;
	
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

	public Integer getCustId() {
        return this.custId;
    }

    public void setCustId(Integer custId) {
        this.custId = custId;
    }
	
	public Date getDeadline() {
		return this.deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
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