(function() {
    var URL = {
        CUSTOMER_QUERY: "customer/query",
        CUSTOMER_SAVE: "customer/save",
        CUSTOMER_DELETE: "customer/delete",
        CUSTOMER_EXPORT: "customer/export",
        HOUSE_QUERY: "houseinfo/query",
        HOUSE_SAVE: "houseinfo/save",
        HOUSE_CHECKIN: "houseinfo/checkIn",
        HOUSE_DELETE: "houseinfo/delete",
        HOUSE_EXPORT: "houseinfo/export",
        CHARGETOTAL_QUERY: "chargetotal/query",
        CHARGETOTAL_SAVE: "chargetotal/save",
        CHARGETOTAL_DELETE: "chargetotal/delete",
        CHARGETOTAL_EXPORT: "chargetotal/export",
        BASICCOST_QUERY: "basiccost/query",
        BASICCOST_SAVE: "basiccost/save",
        BASICCOST_DELETE: "basiccost/delete",
        BASICCOST_EXPORT: "basiccost/export",
        INSTRUMENTCOST_QUERY: "instrumentcost/query",
        INSTRUMENTCOST_SAVE: "instrumentcost/save",
        INSTRUMENTCOST_DELETE: "instrumentcost/delete",
        INSTRUMENTCOST_EXPORT: "instrumentcost/export",
        SMSREMINDER_QUERY: "smsreminder/query",
        SMSREMINDER_EXPORT: "smsreminder/export",
        SYSREMINDER_QUERY: "sysreminder/query",
        SYSREMINDER_EXPORT: "sysreminder/export",
        CHARGEDETAIL_QUERY: "chargedetail/query",
        CHARGEDETAIL_SAVE: "chargedetail/save",
        CHARGEDETAIL_EXPORT: "chargedetail/export",
        SYSREMINDER_DELETE: "sysreminder/delete",
        SYSREMINDER_SAVE: "sysreminder/save"
    };
    // 日常管理
    var DailyManagement = {
        $module: $("#m-daily-management"),
        $editDom: $("#m-edit-daily-management"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                columns: [{
                    title: '业主姓名',
                    field: 'custName',
                    width: "15%",
                    formatter: function(ui, data) {
                        return $('<a href="javascript:void(0);" class="edit-item">' + data.cell + '</a>');
                    }
                },
                {
                    title: '身份证号 ',
                    field: 'idNumber',
                    width: "15%"
                },
                {
                    title: '联系电话',
                    field: 'phone',
                    width: "15%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '楼宇名称',
                    field: 'buildingName',
                    width: "15%"
                },
                {
                    title: '门牌编号',
                    field: 'houseNumber',
                    width: "20%"
                },
                {
                    title: '入住日期',
                    field: 'checkinTime',
                    width: "20%",
                    formatter: function(ui, data) {
                        return $.formatDate(data.cell, "yyyy-MM-dd");
                    }
                }]
            });

            $editDom.dialog({
                title: "编辑日常管理",
                width: 555,
                height: 172,
                autoOpen: false,
                modal: true,
                resizable: false
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom;

            // 编辑
            $tplBox.on('click', '.edit-item',
            function() {
                var index = $(this).closest("tr").index(),
                data = $tplBox.find(".daily-management-list").grid("getRow", index);
                $editDom.find("input").val("").removeClass("error");
                $editDom.j2f(data);
                $editDom.dialog("open");
            });

            // 取消
            $editDom.find('.cancel-btn').click(function() {
                $editDom.dialog("close");
            });

            // 保存
            $editDom.find('.save-btn').click(function() {
                var data = $editDom.f2j();
                $.ajaxJSON({
                    name: "业主信息修改",
                    url: URL.CUSTOMER_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".search-btn").click();
                        $editDom.dialog("close");
                    }
                });
            });

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.f2j();
                $.ajaxJSON({
                    name: "业主信息查询",
                    url: URL.CUSTOMER_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.f2j();
                $.download({
                    url: URL.CUSTOMER_EXPORT,
                    data: data
                });
            });
        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费管理--业主入住
    var OwnerManagement = {
        $module: $("#m-owner-management"),
        $editDom: $("#m-add-owner-management"),
        $editDom2: $("#m-edit-daily-management2"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom;
            $editDom2 = _self.$editDom2;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                single: true,
                columns: [{
                    title: '房屋状态',
                    field: 'status',
                    width: "10%",
                    formatter: function(ui, data) {
                        return data.row.custName ? "已售": "空闲";
                    }
                },
                {
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "10%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "10%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "10%"
                },
                {
                    title: '单元号',
                    field: 'unitNumber',
                    width: "10%"
                },
                {
                    title: '楼层',
                    field: 'floorNumber',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "户型",
                    field: "doorModel",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: '房屋面积',
                    field: 'houseArea',
                    width: "10%"
                },
                {
                    title: '产权状况',
                    field: 'houseRights',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "操作",
                    field: "isConfirmed",
                    width: "10%",
                    formatter: function(ui, data) {
                        if (data.row.custName) {
                            return $('<a href="javascript:void(0)" class="edit-item clean"> ' + "置空" + '</a>');
                        } else {
                            return $('<a href="javascript:void(0)" class="edit-item checkIn"> ' + "入住" + '</a>');
                        }

                    }
                }]
            });

            $editDom.dialog({
                title: "添加楼宇信息",
                width: 555,
                height: 250,
                autoOpen: false,
                modal: true,
                resizable: false
            });

            $editDom2.dialog({
                title: "入住",
                width: 555,
                height: 250,
                autoOpen: false,
                modal: true,
                resizable: false
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom,
            $editDom2 = _self.$editDom2;

            //入住时间
            $editDom2.find("input[name='checkinTime']").datetimepicker();

            // 新增
            $tplBox.find(".add-btn").click(function() {
                $editDom.dialog("open");
            });

            // 删除
            $tplBox.find(".del-btn").click(function() {
                var selected = $tplBox.find(".daily-management-list").grid("getSelected");
                if (!selected) {
                    $.msg("请选择一条记录");
                    return false;
                }
                $.ajaxJSON({
                    name: "楼宇信息保存",
                    url: URL.HOUSE_DELETE,
                    data: {
                        id: selected.id
                    },
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("删除成功");
                        $editDom.dialog("close");
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 保存
            $editDom.find(".save-btn1").click(function() {
                var data = $editDom.f2j();
                $.ajaxJSON({
                    name: "楼宇信息保存",
                    url: URL.HOUSE_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $editDom.dialog("close");
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 取消
            $editDom.find(".cancel-btn").click(function() {
                $editDom.dialog("close");
            });

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.f2j();
                $.ajaxJSON({
                    name: "楼宇信息查询",
                    url: URL.HOUSE_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.f2j();
                $.download({
                    url: URL.HOUSE_EXPORT,
                    data: data
                });
            });

            // 入住
            $tplBox.on('click', '.checkIn',
            function() {
                var index = $(this).closest("tr").index(),
                data = $tplBox.find(".daily-management-list").grid("getRow", index);
                $editDom2.find("input").val("").removeClass("error");
                $editDom2.j2f(data);
                $editDom2.dialog("open");
            });

            // 置空
            $tplBox.on('click', '.clean',
            function() {
                var index = $(this).closest("tr").index(),
                data = $tplBox.find(".daily-management-list").grid("getRow", index);
                data.custName = "";
                data.status = "1";
                $.ajaxJSON({
                    name: "置空",
                    url: URL.HOUSE_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 取消
            $editDom.find('.cancel-btn').click(function() {
                $editDom.dialog("close");
            });

            // 保存
            $editDom2.find('.save-btn').click(function() {
                var data = $editDom2.f2j();

                $.ajaxJSON({
                    name: "入住保存",
                    url: URL.HOUSE_CHECKIN,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $tplBox.find(".search-btn").click();
                        $editDom2.dialog("close");
                    }
                });
            });
        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费管理--收费合计
    var TotalManagement = {
        $module: $("#m-total-management"),
        $dialogDom: $('#m-total-dialog'),
        $dialogDom1: $("#m-add-base"),
        $dialogDom2: $("#m-add-meter"),
        $dialogDom3: $("#m-add-total"),
        $dialogDom4: $("#m-pay"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module,
            $dialogDom = _self.$dialogDom,
            $dialogDom1 = _self.$dialogDom1,
            $dialogDom2 = _self.$dialogDom2,
            $dialogDom3 = _self.$dialogDom3,
            $dialogDom4 = _self.$dialogDom4;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                single: true,
                columns: [{
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "10%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "30%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "15%"
                },
                {
                    title: '应缴费用合计',
                    field: 'totalPrice',
                    width: "10%"
                },
                {
                    title: '基本物业费',
                    field: 'basicTotalPrice',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "仪表物业费",
                    field: "instrumentTotalPrice",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: '是否已缴清',
                    field: 'status',
                    width: "10%",
                    formatter: function(ui, data) {
                        return data.cell == 0 ? "是": "否";
                    }
                },
                {
                    title: '缴费限期',
                    field: 'deadline',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "操作",
                    field: "isConfirmed",
                    width: "10%",
                    formatter: function(ui, data) {
                        if (data.row.status == 1) {
                            return $('<a href="javascript:void(0)" class="edit-item"> ' + "缴费" + '</a>');
                        }
                    }
                }]
            });

            $dialogDom.find(".base-management-list").grid({
                height: 325,
                single: true,
                columns: [{
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "10%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "15%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "15%"
                },
                {
                    title: '房屋面积',
                    field: 'houseArea',
                    width: "10%"
                },
                {
                    title: '卫生费单价',
                    field: 'cleanPrice',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "卫生费",
                    field: "cleanTotalPrice",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: '治安费单价',
                    field: 'securityPrice',
                    width: "10%"
                },
                {
                    title: '治安费',
                    field: 'securityTotalPrice',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "基本物业费合计",
                    field: "basicTotalPrice",
                    width: "10%",
                    formatter: function(ui, data) {

}
                }]
            });

            $dialogDom.find(".meter-management-list").grid({
                height: 325,
                single: true,
                columns: [{
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "10%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "10%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "10%"
                },
                {
                    title: '电单价',
                    field: 'electriPrice',
                    width: "10%"
                },
                {
                    title: '公用电度费',
                    field: 'publicElectriAmount',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "自用电度费",
                    field: "privateElectriAmount",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: '水单价',
                    field: 'waterPrice',
                    width: "10%"
                },
                {
                    title: '公用水吨数',
                    field: 'publicWaterAmount',
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "自用水吨数",
                    field: "privateWaterAmount",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "仪表类物业费合计",
                    field: "instrumentTotalPrice",
                    width: "10%",
                    formatter: function(ui, data) {

}
                }]
            });

            $dialogDom.dialog({
                width: 800,
                height: 500,
                autoOpen: false,
                modal: true,
                resizable: false
            });

            $dialogDom1.dialog({
                width: 550,
                height: 180,
                autoOpen: false,
                modal: true,
                resizable: false
            });

            $dialogDom2.dialog({
                width: 550,
                height: 250,
                autoOpen: false,
                modal: true,
                resizable: false
            });

            $dialogDom3.dialog({
                width: 550,
                height: 250,
                autoOpen: false,
                modal: true,
                resizable: false
            });

            $dialogDom4.dialog({
                width: 550,
                height: 250,
                autoOpen: false,
                modal: true,
                resizable: false
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module,
            $dialogDom = _self.$dialogDom,
            $dialogDom1 = _self.$dialogDom1,
            $dialogDom2 = _self.$dialogDom2,
            $dialogDom3 = _self.$dialogDom3,
            $dialogDom4 = _self.$dialogDom4;

            // 编辑
            $tplBox.on('click', '.edit-item',
            function() {
                var index = $(this).closest("tr").index(),
                data = $tplBox.find(".daily-management-list").grid("getRow", index);
                $dialogDom4.find("input").val("").removeClass("error");
                $dialogDom4.j2f(data);
                $dialogDom4.dialog("open");
            });

            // 取消
            $dialogDom4.find('.cancel-btn').click(function() {
                $dialogDom4.dialog("close");
            });

            // 保存
            $dialogDom4.find('.save-btn').click(function() {
                var data = $dialogDom4.f2j();
                delete data.payMethod;
                delete data.totalPrice;
                $.ajaxJSON({
                    name: "缴费",
                    url: URL.CHARGEDETAIL_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".search-btn").click();
                        $dialogDom4.dialog("close");
                    }
                });
            });

            //缴费限期
            $dialogDom3.find("input[name='deadline']").datetimepicker();

            // 新增
            $tplBox.find(".add-btn").click(function() {
                $dialogDom3.dialog("open");
            });

            // 删除
            $tplBox.find(".del-btn").click(function() {
                var selected = $tplBox.find(".daily-management-list").grid("getSelected");
                if (!selected) {
                    $.msg("请选择一条记录");
                    return false;
                }
                $.ajaxJSON({
                    name: "基本物业费删除",
                    url: URL.CHARGETOTAL_DELETE,
                    data: {
                        id: selected.id
                    },
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("删除成功");
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 保存
            $dialogDom3.find(".save-btn").click(function() {
                var data = $dialogDom3.f2j();
                $.ajaxJSON({
                    name: "物业费新增",
                    url: URL.CHARGETOTAL_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $dialogDom3.dialog("close");
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 取消
            $dialogDom3.find(".cancel-btn").click(function() {
                $dialogDom3.dialog("close");
            });

            // 新增
            $dialogDom.find(".m-base").find(".add-btn").click(function() {
                $dialogDom1.dialog("open");
            });

            // 删除
            $dialogDom.find(".m-base").find(".del-btn").click(function() {
                var selected = $dialogDom.find(".base-management-list").grid("getSelected");
                if (!selected) {
                    $.msg("请选择一条记录");
                    return false;
                }
                $.ajaxJSON({
                    name: "基本物业费删除",
                    url: URL.BASICCOST_DELETE,
                    data: {
                        id: selected.id
                    },
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("删除成功");
                        $dialogDom.find(".search-btn1").click();
                    }
                });
            });

            // 新增
            $dialogDom.find(".m-meter").find(".add-btn").click(function() {
                $dialogDom2.dialog("open");
            });

            // 删除
            $dialogDom.find(".m-meter").find(".del-btn").click(function() {
                var selected = $dialogDom.find(".meter-management-list").grid("getSelected");
                if (!selected) {
                    $.msg("请选择一条记录");
                    return false;
                }
                $.ajaxJSON({
                    name: "仪表类物业费删除",
                    url: URL.INSTRUMENTCOST_DELETE,
                    data: {
                        id: selected.id
                    },
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("删除成功");
                        $dialogDom.find(".search-btn2").click();
                    }
                });
            });

            // 保存
            $dialogDom1.find(".save-btn").click(function() {
                var data = $dialogDom1.f2j();
                $.ajaxJSON({
                    name: "基本物业费新增",
                    url: URL.BASICCOST_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $dialogDom1.dialog("close");
                        $dialogDom.find(".search-btn1").click();
                    }
                });
            });

            // 取消
            $dialogDom1.find(".cancel-btn").click(function() {
                $dialogDom1.dialog("close");
            });

            // 保存
            $dialogDom2.find(".save-btn").click(function() {
                var data = $dialogDom2.f2j();
                $.ajaxJSON({
                    name: "仪表物业费新增",
                    url: URL.INSTRUMENTCOST_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $dialogDom2.dialog("close");
                        $dialogDom.find(".search-btn2").click();
                    }
                });
            });

            // 取消
            $dialogDom2.find(".cancel-btn").click(function() {
                $dialogDom2.dialog("close");
            });

            $tplBox.find('.base-btn').click(function() {
                $dialogDom.dialog('open').dialog({
                    "title": "基本物业费"
                });
                $dialogDom.find('.m-base').removeClass('hide').end().find('.m-meter').addClass('hide');
            });

            $tplBox.find('.meter-btn').click(function() {
                $dialogDom.dialog('open').dialog({
                    "title": "仪表类物业费"
                });
                $dialogDom.find('.m-meter').removeClass('hide').end().find('.m-base').addClass('hide');
            });

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.f2j();
                $.ajaxJSON({
                    name: "收费合计查询",
                    url: URL.CHARGETOTAL_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.f2j();
                $.download({
                    url: URL.CHARGETOTAL_EXPORT,
                    data: data
                });
            });

            // 基本物业费查询
            $dialogDom.find(".search-btn1").click(function() {
                var data = $dialogDom.find(".m-base").f2j();
                $.ajaxJSON({
                    name: "基本物业费查询",
                    url: URL.BASICCOST_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $dialogDom.find(".base-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 基本物业费导出
            $dialogDom.find(".export-btn1").click(function() {
                var data = $dialogDom.find(".m-base").f2j();
                $.download({
                    url: URL.BASICCOST_EXPORT,
                    data: data
                });
            });

            // 仪表类物业费查询
            $dialogDom.find(".search-btn2").click(function() {
                var data = $dialogDom.find(".m-meter").f2j();
                $.ajaxJSON({
                    name: "仪表类物业费查询",
                    url: URL.INSTRUMENTCOST_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $dialogDom.find(".meter-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 仪表类物业费导出
            $dialogDom.find(".export-btn2").click(function() {
                var data = $dialogDom.find(".m-meter").f2j();
                $.download({
                    url: URL.INSTRUMENTCOST_EXPORT,
                    data: data
                });
            });

        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费报表--收费明细
    var ChargeManagement = {
        $module: $("#m-charge-management"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                columns: [{
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "15%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "25%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "25%"
                },
                {
                    title: '收费金额',
                    field: 'payCost',
                    width: "15%"
                },
                {
                    title: '收费日期',
                    field: 'payTime',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "记录人",
                    field: "operater",
                    width: "10%",
                    formatter: function(ui, data) {

}
                }]
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module;

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.f2j();
                $.ajaxJSON({
                    name: "收费明细查询",
                    url: URL.CHARGEDETAIL_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.f2j();
                $.download({
                    url: URL.CHARGEDETAIL_EXPORT,
                    data: data
                });
            });
        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费报表--已收款明细
    var MoneyManagement = {
        $module: $("#m-money-management"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                columns: [{
                    title: '收费日期 ',
                    field: 'planId',
                    width: "15%"
                },
                {
                    title: '单据编号',
                    field: 'mprName',
                    width: "25%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '费用金额',
                    field: 'functionName',
                    width: "15%"
                },
                {
                    title: '实收金额',
                    field: 'reporter',
                    width: "10%"
                },
                {
                    title: '收款方式',
                    field: 'reportDate',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "收款人",
                    field: "isConfirmed",
                    width: "10%",
                    formatter: function(ui, data) {

}
                }]
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module;

        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费提醒--短信提醒
    var MessageManagement = {
        $module: $("#m-message-management"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module;

            $tplBox.find(".daily-management-list").grid({
                height: 500,
                columns: [{
                    title: '',
                    field: 'id',
                    width: "5%",
                    checkbox: true
                },
                {
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "15%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "25%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "15%"
                },
                {
                    title: '欠费金额',
                    field: 'owePrice',
                    width: "10%"
                },
                {
                    title: '缴费限期',
                    field: 'deadline',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "手机号",
                    field: "phone",
                    width: "10%",
                    formatter: function(ui, data) {

}
                }]
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module;

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.find("div").eq(0).f2j();
                $.ajaxJSON({
                    name: "短信提醒查询",
                    url: URL.SMSREMINDER_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.find("div").eq(0).f2j();
                $.download({
                    url: URL.SMSREMINDER_EXPORT,
                    data: data
                });
            });
        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    // 收费提醒--系统提醒
    var SystemManagement = {
        $module: $("#m-system-management"),
        $editDom: $("#m-add-sys-remind"),
        pageSize: 30,
        _init: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom;

            $tplBox.find(".daily-management-list").grid({
                height: 470,
                single: true,
                columns: [{
                    title: '',
                    field: 'id',
                    width: "5%",
                    checkbox: true
                },
                {
                    title: '楼宇名称 ',
                    field: 'buildingName',
                    width: "10%"
                },
                {
                    title: '门牌号',
                    field: 'houseNumber',
                    width: "10%",
                    formatter: function(ui, data) {}
                },
                {
                    title: '业主姓名',
                    field: 'custName',
                    width: "15%"
                },
                {
                    title: '欠费金额',
                    field: 'owePrice',
                    width: "10%"
                },
                {
                    title: '缴费限期',
                    field: 'deadline',
                    width: "15%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: "提醒时间",
                    field: "redminerTime",
                    width: "10%",
                    formatter: function(ui, data) {

}
                },
                {
                    title: '提醒内容',
                    field: 'redminerContent',
                    width: "10%"
                },
                {
                    title: '是否已提醒',
                    field: 'status',
                    width: "15%",
                    formatter: function(ui, data) {

}
                }]
            });

            $editDom.dialog({
                title: "新增系统提醒",
                width: 555,
                height: 200,
                autoOpen: false,
                modal: true,
                resizable: false
            });
        },
        bindEvent: function() {
            var _self = this,
            $tplBox = _self.$module,
            $editDom = _self.$editDom;

            //缴费限期
            $editDom.find("input[name='deadline']").datetimepicker();

            //提醒时间
            $editDom.find("input[name='redminerTime']").datetimepicker();

            // 查询
            $tplBox.find(".search-btn").click(function() {
                var data = $tplBox.find("div").eq(0).f2j();
                $.ajaxJSON({
                    name: "系统提醒查询",
                    url: URL.SYSREMINDER_QUERY,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $tplBox.find(".daily-management-list").grid("loadData", d.list);
                    }
                });
            });

            // 导出
            $tplBox.find(".export-btn").click(function() {
                var data = $tplBox.find("div").eq(0).f2j();
                $.download({
                    url: URL.SYSREMINDER_EXPORT,
                    data: data
                });
            });

            // 新增
            $tplBox.find(".add-btn").click(function() {
                $editDom.dialog("open");
            });

            // 删除
            $tplBox.find(".del-btn").click(function() {
                var selected = $tplBox.find(".daily-management-list").grid("getSelected");
                if (!selected) {
                    $.msg("请选择一条记录");
                    return false;
                }
                $.ajaxJSON({
                    name: "系统提醒删除",
                    url: URL.SYSREMINDER_DELETE,
                    data: {
                        id: selected.id
                    },
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("删除成功");
                        $editDom.dialog("close");
                        $tplBox.find(".search-btn").click();
                    }
                });
            });

            // 取消
            $editDom.find('.cancel-btn').click(function() {
                $editDom.dialog("close");
            });

            // 保存
            $editDom.find('.save-btn1').click(function() {
                var data = $editDom.f2j();

                $.ajaxJSON({
                    name: "系统提醒保存",
                    url: URL.SYSREMINDER_SAVE,
                    data: data,
                    postType: 'JSON',
                    success: function(d) {
                        $.msg("保存成功");
                        $tplBox.find(".search-btn").click();
                        $editDom.dialog("close");
                    }
                });
            });
        },
        init: function() {
            var _self = this;

            _self._init();
            _self.bindEvent();
        }
    };

    var Tenement = {
        $box: $("#content-box"),
        tabModule: {
            "daily": DailyManagement,
            "owner": OwnerManagement,
            "total": TotalManagement,
            "charge": ChargeManagement,
            "money": MoneyManagement,
            "message": MessageManagement,
            "system": SystemManagement
        },
        tabUrl: {
            "order": "config-order"
        },
        loadHTML: function(mark, callback) {
            var url = "./" + mark + ".html";

            if (!mark) return;

            this.$box.loadHTML({
                url: url,
                success: function() {
                    callback && callback();
                }
            });
        },
        setTabName: function() {
            $(".hd>li").each(function(i, n) {
                var $this = $(n);
                $this.data("text", $this.contents().eq(0));
            });
        },
        bindEvent: function() {
            var _self = this;

            $(".hd").on("click", ">li",
            function(e) {
                var $targetLi = $(this),
                $this = $targetLi,
                module = $targetLi.attr("data-module");

                var $li = $(".hd").find(".hd-active").removeClass("hd-active").not("[data-module]");
                $li.contents().eq(0).remove();
                $li.prepend($li.data("text"));

                if (!module) {
                    $targetLi = $(e.target).closest("li");
                    module = $targetLi.attr("data-module");

                    if ($targetLi.hasClass("hd-active") || $targetLi[0] === $(this)[0]) return false;

                    $this.contents().eq(0).remove().end().end().prepend($targetLi.text());
                }

                if (_self.tabModule[module]) {
                    if (_self.tabModule[module].init !== true) {
                        _self.tabModule[module].init();
                        _self.tabModule[module].init = true;
                    }

                    $(".tab-con").not(".hide").addClass("hide").end().filter("div[data-module=" + module + "]").removeClass("hide");
                } else {
                    $(".tab-con").not(".hide").addClass("hide");

                    _self.loadHTML(_self.tabUrl[module],
                    function() {
                        _self.$box.removeClass("hide");
                    });
                }

                $targetLi.add($this).addClass("hd-active");
            });
            $(".hd").find("li:first").click();
        },
        init: function() {
            var _self = this;
            _self.setTabName();
            _self.bindEvent();
        }
    };
    Tenement.init();
})();