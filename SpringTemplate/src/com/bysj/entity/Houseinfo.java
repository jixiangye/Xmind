package com.bysj.entity;

import java.io.Serializable;

import javax.persistence.*;


/**
 * The persistent class for the HOUSEINFO database table.
 * 
 */
@Entity
@Table(name="APP.HOUSEINFO")
public class Houseinfo implements Serializable {
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

	@Column(name="DOOR_MODEL")
	private String doorModel;

	@Column(name="FLOOR_NUMBER")
	private String floorNumber;

	@Column(name="HOUSE_AREA")
	private String houseArea;

	@Column(name="HOUSE_RIGHTS")
	private String houseRights;

	private String status;

	@Column(name="UNIT_NUMBER")
	private String unitNumber;

	@Column(name="HOUSE_NUMBER")
    private String houseNumber;
	
	public Houseinfo() {
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

	public String getDoorModel() {
		return this.doorModel;
	}

	public void setDoorModel(String doorModel) {
		this.doorModel = doorModel;
	}

	public String getFloorNumber() {
		return this.floorNumber;
	}

	public void setFloorNumber(String floorNumber) {
		this.floorNumber = floorNumber;
	}

	public String getHouseArea() {
		return this.houseArea;
	}

	public void setHouseArea(String houseArea) {
		this.houseArea = houseArea;
	}

	public String getHouseRights() {
		return this.houseRights;
	}

	public void setHouseRights(String houseRights) {
		this.houseRights = houseRights;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUnitNumber() {
		return this.unitNumber;
	}

	public void setUnitNumber(String unitNumber) {
		this.unitNumber = unitNumber;
	}

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
	
	

}