package com.bysj.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the CUSTOMER database table.
 * 
 */
@Entity
@Table(name="APP.CUSTOMER")
public class Customer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Temporal(TemporalType.DATE)
	@Column(name="CHECKIN_TIME")
	private Date checkinTime;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="HOUSE_ID")
	private Integer houseId;

	@Column(name="ID_NUMBER")
	private String idNumber;

	private String phone;

	@OneToOne
	@JoinColumn(name = "HOUSE_ID", insertable = false, updatable = false)
	private Houseinfo houseinfo;
	
	public Customer() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCheckinTime() {
		return this.checkinTime;
	}

	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Integer getHouseId() {
		return this.houseId;
	}

	public void setHouseId(Integer houseId) {
		this.houseId = houseId;
	}

	public String getIdNumber() {
		return this.idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

    /**
     * @return 返回变量houseinfo的值
     */
    public Houseinfo getHouseinfo() {
        return houseinfo;
    }

    /**
     * @param houseinfo 设置houseinfo的值
     */
    public void setHouseinfo(Houseinfo houseinfo) {
        this.houseinfo = houseinfo;
    }

}