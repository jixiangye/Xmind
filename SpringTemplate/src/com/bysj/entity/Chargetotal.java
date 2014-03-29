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

	@Column(name="CUST_ID")
	private Integer custId;

	@Temporal(TemporalType.DATE)
	private Date deadline;

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

	public Date getDeadline() {
		return this.deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = DateUtils.parse(deadline, "yyyy-MM-dd");
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

	public Integer getCustId() {
        return this.custId;
    }

    public void setCustId(Integer custId) {
        this.custId = custId;
    }
}