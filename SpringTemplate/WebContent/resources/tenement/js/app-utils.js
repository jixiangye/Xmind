(function(window, $) {
	window.Desktop = {};
	window.SYSURL = {
		ADDR : 'map/getAllProvince'
	};
	function getDesktop(win) {
		if (win.des == 'desktop') {
			window.Desktop = win.Desktop;
			window.ROOT = win.ROOT;
			window.WEB_ROOT = win.WEB_ROOT;
			window.token = win.token;
		} else {
			if (win == win.parent) {
				// TODO remove
				Desktop = {
					getFullAuthMap : function() {

					}
				};
				// TODO remove
				return;
			} else {
				getDesktop(win.parent);
			}
		}
	}
	getDesktop(window.parent);

	$.view = {
		tab : function(opts) {
			var tab, map = App.getFullAuthMap();
			if (opts.auths) {
				for ( var i = 0; i < opts.auths.length; i++) {
					tab = opts.auths[i];
					if (tab.code in map) {
						opts.init && opts.init(tab);
						tab = true;
						break;
					}
				}
			}
			tab !==true && opts.init && opts.init(opts.defaults);
		}
	};
		
	$.ajaxSetup({
		cache : false,
		dataType : 'json',
		type : 'POST'
	});
	
	/**
	 * 将Form数据转化为JSON对象
	 */
	var F2J = {
		FORM_PATTERN : /.+\[\d*\]+$/,
		generate : function(obj, name, value) {
			if (obj[name] === undefined) {
				obj[name] = value;
			} else {
				if (!obj[name].push) {
					obj[name] = [ obj[name] ];
				}
				obj[name].push(value);
			}
			return obj;
		},
		translate : function(arrs, opts) {
			var obj = {};
			if (opts.flat) {
				$.each(arrs, function() {
					obj[this.name] = this.value;
				});
			} else {
				$.each(arrs, function() {
					if (this.name.indexOf('.') != -1) {
						var params = this.name.split('.'), //
						innerobj = obj;
						for ( var i = 0; i < params.length - 1; i++) {
							var index = -1, //
							name = params[i], //
							tobj;
							if (F2J.FORM_PATTERN.test(name)) {
								index = name.substring(name.indexOf('[') + 1, name.indexOf(']'));
								name = name.substring(0, name.indexOf('['));
							}
							tobj = innerobj[name];
							// 未定义，则初始化
							if (tobj === undefined) {
								if (-1 === index) {
									innerobj[name] = {};
								} else {
									innerobj[name] = [];
								}
							}
							if (-1 === index) {
								innerobj = innerobj[name];
							} else {
								if (!innerobj[name][index]) {
									innerobj[name][index] = {};
								}
								innerobj = innerobj[name][index];
							}
						}
						F2J.generate(innerobj, params[params.length - 1], this.value);
					} else {
						F2J.generate(obj, this.name, this.value);
					}
				});
			}
			return obj;
		}
	};
	$.fn.f2j = function(opts) {
		var $this = $(this), //
		$els = $this.find('input[name], select[name], textarea[name]'), //
		arrs = [];
		if ($.isPlainObject(opts) || opts === undefined) {
			opts = $.extend({
				// not used(not available)
				trim : false,
				flat : false,
				all : false
			}, opts);
		} else {
			opts = {
				// not used(not available)
				trim : false,
				all : false,
				flat : opts
			};
		}
		!opts.all && ($els = $els.filter(':enabled'));
		opts.filter && ($els = $els.filter(opts.filter));

		while ($els.length > 0) {
			var $el = $els.eq(0);
			if ($el.is('input[type=text]') || $el.is('input[type=password]') || $el.is('input[type=hidden]') || $el.is('textarea')) {
				arrs.push({
					name : $el.attr('name'),
					value : $.trim($el.val())
				});
				$els = $els.not($el);
			} else if ($el.is('input[type=checkbox]')) {
				var name = $el.attr('name'), //
				$checkbox = $els.filter('[name="' + name + '"]'), //
				$checked = $checkbox.filter(':checked');
				vals = [];
				for ( var i = 0; i < $checked.length; i++) {
					vals.push($checked.eq(i).val());
				}
				arrs.push({
					name : name,
					value : vals
				});
				$els = $els.not($checkbox);
			}else if ($el.is('input[type="file"]')) {
//				var name = $el.attr('name'); //
//				$files = $els.filter('[name="' + name + '"]');
//				vals = [];
//				for ( var i = 0; i < $files.length; i++) {
//					vals.push($files.eq(i)[0].files[0]);
//					var file = $files.eq(i)[0].files[0];
//					vals.push(new Blob([ file ], {
//						type : file.type
//					}));
//				}
				arrs.push({
					name : $el.attr('name'),
					value : $el.get(0).files[0]
				});
				$els = $els.not($el);
			} else if ($el.is('input[type=radio]')) {
				var name = $el.attr('name'), //
				$radio = $els.filter('[name="' + name + '"]');
				arrs.push({
					name : name,
					value : $radio.filter(':checked').val()
				});
				$els = $els.not($radio);
			} else if ($el.is('select')) {
				var value = $el.val();
				arrs.push({
					name : $el.attr('name'),
					value : value == null ? '' : value
				});
				$els = $els.not($el);
			} else {
				console.log('解析错误', $els);
				$els = $els.not($el);
			}
		}
		return F2J.translate(arrs, opts);
	};



	//将json数据填充至调用容器
	var J2F = {
		parse : function parse($els, data, prefix) {
			var prefix = prefix || "", dataItem, $el;
			for ( var n in data) {
				if (!data.hasOwnProperty(n) || (dataItem = data[n]) == undefined)
					continue;
				$el = $els.filter("[name='" + prefix + n + "']");
				if ($el.length > 0 && !$.isPlainObject(dataItem)) {
					if ($el.is("input[type='text']") || $el.is("input[type='hidden']") || $el.is("textarea")) {
						$el.val(dataItem);
					} else if ($el.is("input[type='radio']")) {
						$el.filter("[value='" + dataItem + "']").prop("checked", true);
					} else if ($el.is("input[type='checkbox']")) {
						if ($.isArray(dataItem)) {
							$.each(dataItem, function() {
								$el.filter("[value='" + this + "']").prop("checked", true);
							});
						} else {
							$el.prop("checked", dataItem);
						}
					} else if ($el.is("select")) {
						$el.val(dataItem);
						$el.select ? $el.select("value", dataItem) : $el.find("[value='" + dataItem + "']").prop("checked");
					} else if ($el.not("input,textarea,select")) {
						typeof dataItem === "string" && !/<(?!script)\w+\s+[^\n\f\r]*>/.test(dataItem) && (dataItem = dataItem.replace(/</g,"&lt;").replace(/>/g,"&gt;"));
						$el.html(dataItem);
					}
					$els = $els.not($el);
				} else {
					if ($.isPlainObject(dataItem)) {
						parse($els, dataItem, prefix + n + ".");
					}
				}
			}
		}
	};

	$.fn.j2f = function(data) {
		var $this = $(this),
			$els = $this.find("[name]");
		if(typeof data === "string"){
			data = JSON.parse(data);
		}
		J2F.parse($els,data);
		return $this;
	};

	$.fn.mask = function(options) {
		options = options == undefined ? true : options;
		var $this = $(this);
		if (options === true) {
			$this.addClass('ui-loading');
		} else {
			$this.removeClass('ui-loading');
		}
		return $this;
	};
	
	/*
	 * 将Form数据转化为JSON字符串
	 */
	$.fn.f2s = function() {
		return JSON.stringify($(this).f2j());
	};

	$.fn.checkRequired = function(){
		var $this = $(this);
		$this.find('textarea.required,input.required,select.required').filter(':visible:enabled').trigger('blur');
		$this.find('.ui-select:not(.ui-select-disabled) .ui-select-button.required').filter(':visible').trigger('blur');
		$this.find('input.date.required').filter(':visible:enabled').trigger('changeDate');
		$this.find('input.choose-ipt.required').filter(':visible:enabled').trigger("blur");
		return !$this.find('.error').length;
	};

	var DateUtil = {
		padLeft : function(s, l, c) {
			s = '' + s;
			if (l < s.length)
				return s;
			else
				return Array(l - s.length + 1).join(c || ' ') + s;
		}
	};
	
	/**
	 * @param date
	 *            (Date对象) 需要格式化的时间 
	 *            
	 * @param ptn           
	 *            格式化标准，如yyyy-MM-dd hh:mm:ss
	 *            支持
	 *            1. yyyy 	年份
	 *            2. MM 	月份
	 *            3. dd		日期
	 *            4. hh		小时
	 *            5. mm		分
	 *            6. ss		秒
	 *            7. SSS	毫秒
	 *            8. q		季度
	 */
	$.formatDate = function(date, ptn) {
		if(typeof date !== Date){
			date = new Date(date);
		}
		ptn = ptn || "yyyy-MM-dd";
		date = date || new Date();
		var dt = {
			// 年份
			"yyyy" : date.getFullYear(),
			// 月份
			"MM" : date.getMonth() + 1,
			// 日
			"dd" : date.getDate(),
			// 小时
			"hh" : date.getHours(),
			// 分
			"mm" : date.getMinutes(),
			// 秒
			"ss" : date.getSeconds(),
			// 季度
			"q" : Math.floor((date.getMonth() + 3) / 3),
			// 毫秒
			"SSS" : date.getMilliseconds()
		};
		dt.MM = DateUtil.padLeft(dt.MM, 2, '0');
		dt.dd = DateUtil.padLeft(dt.dd, 2, '0');
		dt.hh = DateUtil.padLeft(dt.hh, 2, '0');
		dt.mm = DateUtil.padLeft(dt.mm, 2, '0');
		dt.ss = DateUtil.padLeft(dt.ss, 2, '0');
		for ( var key in dt) {
			ptn = ptn.replace(key, dt[key]);
		}
		return ptn;
	};
	
	/**
	 * @param qstr(string)
	 *            	需要获取参数的URL
	 *            
	 * @return(JSON)
	 * 				返回参数值JSON对象
	 */
	$.getQueryParams = function(qstr) {
		qstr = qstr || location.search;
		var index = qstr.indexOf('?'), //
		params = {};
		if (index != -1) {
			qstr = qstr.substring(index + 1);
		}
		if (qstr) {
			qstr = qstr.split('&');
			for ( var i in qstr) {
				var kv = qstr[i].split('=');
				params[kv[0]] = kv[1] || '';
			}
		}
		return params;
	};
	$.str2json = function(str) {
		if (typeof str !== 'string') {
			return str;
		}
		return jQuery.parseJSON(str);
	};
	$.clearJSON = function(json) {
		if ($.isPlainObject(json)) {
			for ( var key in json) {
				json[key] = '';
			}
		}
	};

	/**
	 * @param opts(string/JSON)
	 *            	String	:	提示信息内容（默认为提示）
	 *				JSON	:	生成提示框参数
	 *            		包括：
	 *						1.	msg		:	信息内容
	 *						2.	type	:	提示框类型，可选：alert/confirm/info/error
	 *						3.	title 	:	提示框标题，默认：警告/确认/提示/错误
	 * @return(jQuery Object)
	 *				返回对话框的jQuery对象
	 */
	$.msg = function(opts) {
		if (!$.isPlainObject(opts)) {
			opts = {
				msg : opts
			};
		}
		opts = $.extend({
			buttons : opts.type === 'confirm' ? {
				"确定" : function() {
					opts.ok && opts.ok.apply(this);
					$(this).dialog("destroy");
				},
				"取消" : function() {
					if($.isFunction(opts.cancel)){
						opts.cancel.apply(this);
					}
					$(this).dialog("destroy");
				}
			} : {
				"确定" : function() {
					opts.ok && opts.ok.apply(this);
					$(this).dialog("destroy");
				}
			}
		}, opts);
		if (opts.type == 'alert') {
			opts = $.extend({
				dialogClass : 'nf-dialog nf-alert',
				title : '警告'
			}, opts);
		} else if (opts.type == 'confirm') {
			opts = $.extend({
				dialogClass : 'nf-dialog nf-confirm',
				title : '确认'
			}, opts);
		} else if (opts.type == 'error') {
			opts = $.extend({
				dialogClass : 'nf-dialog nf-error',
				title : '错误'
			}, opts);
		} else {
			opts = $.extend({
				dialogClass : 'nf-dialog nf-info',
				title : '提示'
			}, opts);
		}
		var nopts = $.extend({}, {
			title : '警告',
			resizable : false,
			minHeight : 14,
			modal : true,
			close : function() {
				opts.cancel && opts.cancel.apply(this);
				$(this).dialog("destroy").remove();
			}
		}, opts);
		return $('<div>').html(opts.msg).dialog(nopts);
	};
	
	var Error = {
		generateList : function(list, needCopy) {
			var $ul = $('<ul class="error-list">'),
				length = list.length;
			needCopy && (length = Math.min(10,length));
			for ( var i = 0; i < length; i++) {
				var $li = $('<li>'), error = list[i];
				$li.text(error.errorMsg === '' ? '未知错误' : error.errorMsg);
				$ul.append($li);
			}
			$ul.hide().appendTo('body');
			
			var $dia = $ul.dialog({
				dialogClass : 'nf-dialog nf-error',
				title : '错误',
				minHeight : 14,
				maxHeight : 500,
				minWidth : $ul.outerWidth() * 1.4,
				maxWidth : 700,
				autoOpen : false,
				modal : true,
				close : function() {
					$(this).dialog("destroy").remove();
				},
				buttons : $.extend({
					'确定' : function() {
						$(this).dialog("destroy").remove();
					}
				}, needCopy && list.length > 10 ? {
					'复制错误信息' : $.noop
				} : {}
				)
			});
			if(needCopy && list.length > 10){
				$ul.append($('<li>').html('...'));
				var $btn = $dia.dialog('widget').find('.ui-dialog-buttonset>button:last');
					client = new ZeroClipboard($btn);
				client.on('load', function(client) {
					client.on('dataRequested', function(client, args) {
						var msga = '';
						for ( var i = 0; i < list.length; i++) {
							msga += list[i].errorMsg + '\r\n';
						}
						client.setText(msga);
						$dia.dialog("close");
						$.msg('复制成功！');
					});
				});
				client.on("noFlash", function(client) {
					$btn.click(function(){
						$.msg('您未安装Flash, 请先安装再使用此功能！');
					});
					$('<embed src="' + client.options.moviePath + '" type="application/x-shockwave-flash"></embed>').hide().appendTo('body');
				});
			}
			return $dia.dialog('open');
		}
	};
	
	$.fn.key = function(opts){
		$(this).keypress(function(e){
			if(e.keyCode == 13){
				opts.entry && opts.entry.apply(this,[e]);
			}
		});
	};
	

	var AJAX = {
		SCRIPT_REG : /<script[\S\s]*?<\/script>/gi,
		error : function(options, jqXHR, tStatus, errorThrown, args) {
			options.error && options.error.apply(this, args);
			// TODO abort类型重新处理
			//如果是401，表明token过期需要重新登录
			if(jqXHR.status == '401') {
				Desktop.showLogin && Desktop.showLogin(true);
				return;
			}
			if (!options.hideError) {
				$.msg({
					type : 'error',
					msg : '调用服务[' + (options.name || '') + ']失败，'
							+ ('timeout' === tStatus ? 
								'请求超时' : ('abort' === tStatus 
									? '求情已取消' : ('parsererror' === tStatus 
										? '解析错误' : ('parsererror' === tStatus 
											? '服务器错误' : '服务器错误[' + jqXHR.status + ']'))))
				});
			}
		},
		success : function(data, options, args) {
			if (data.success) {
				options.success && options.success.apply(this, args);
			} else {
				options.fail && options.fail.apply(this, args);
				if (!options.hideError) {
					Error.generateList(data.errorList, options.copy);
				}
			}
		},
		getURL : function(url) {
			return url && (url.indexOf('http://') && url.indexOf('https://') ? window.ROOT + url : url);
		},
		removeMask : function(opts) {
			if (!opts.disableMask) {
				var $el = $(opts.el);
				if ($el.is('body')) {
					$el.removeClass('ui-loading-' + opts.identify);
//					AJAX.handler && clearTimeout(AJAX.handler);
//					AJAX.handler = setTimeout(function() {
//						if (!$el.is('[class*="ui-loading-"]')) {
//							$('body').mask(false);
//						}
//					}, 50);
					if (!$el.is('[class*="ui-loading-"]')) {
						$('body').mask(false);
					}
				} else {
					$el.mask(false);
				}
			}
		},
		addMask : function(opts) {
			if (!opts.disableMask) {
				var $el = $(opts.el).mask();
				if ($el.is('body')) {
					$el.addClass('ui-loading-' + opts.identify);
				}
			}
		},
		loadData : function(opts){
			return ;
		},
		generateFormData : function(data) {
			var formData = new FormData();
			this.generateSubData(formData, data);
			return formData;
		},
		generateSubData : function(formData, data, prefix, isArray) {
			for (var key in data) {
				var subData = data[key];
				var name = isArray ? prefix + '[' + key + ']' : (prefix ? prefix + '.' + key : key);
				if ($.isArray(subData)) {
					this.generateSubData(formData, subData, name, true);
				} else {
					if ($.isPlainObject(subData)) {
						this.generateSubData(formData, subData, name);
					} else {
						formData.append(name, subData === null || subData === undefined ? '' : subData);
					}
				}
			}
		}
	};

	$.ajaxMultiForm = function(options) {
		var opts = {
			copy : true,
			el : 'body',
			identify : $.now()
		};
		AJAX.addMask(opts);
		var data = AJAX.generateFormData(options.data);
//		data.append("token", window.token);

		$.ajax({
			cache : false,
			url : AJAX.getURL(options.url),
			type : options.type,
			contentType : false,
			processData : false,
			data : data,
			success : function(data) {
				AJAX.removeMask(opts);
				AJAX.success(data, options, arguments);
			},
			error : function(jqXHR, tStatus, errorThrown) {
				AJAX.removeMask(opts);
				AJAX.error(options, jqXHR, tStatus, errorThrown, arguments);
			}
		});
	};
	
	/**
	 * @param options(JSON)
	 *            JSON : AJAX参数(基于jQuery.ajax) 扩展属性包括： 
	 *				1. data			:	发送数据（可以是JSON字符串或JSON对象,会自动转换为字符串）
	 *				2. name			: 	定义此次请求的名称（错误提示）
	 *				3. fail			：	返回data.success为false时执行
	 *				4. success		：	返回data.success为true时执行
	 *            	5. url			：	不以http或者https开头时，自动填充服务器地址（配置在desktop-utils.js中），否则直接访问url
	 *            	6. type			：	默认为POST
	 *            	7. contentType	： 	默认为JSON
	 *              8. hideError	:	隐藏错误信息
	 * @return(jQuery Ajax Object) 返回jQuery Ajax对象
	 */
	$.ajaxJSON = function(options) {
		var opts = {
				copy : true,
				cache : false,
				active : true,
				el : 'body',
				identify : $.now()
			};
		opts = $.extend(opts, options, {
			error : function(jqXHR, tStatus, errorThrown) {
				AJAX.removeMask(opts);
				AJAX.error(options, jqXHR, tStatus, errorThrown, arguments);
			},
			success : function(data) {
				AJAX.removeMask(opts);
				AJAX.success(data, options, arguments);
			},
			type : options.type,
			url : AJAX.getURL(options.url)
		});
		if (options.postType && options.postType.toLowerCase() === 'json') {
			opts.contentType = 'application/json; charset=UTF-8';
			opts.data = options.data ? JSON.stringify(options.data) : options.data;
		}
		AJAX.addMask(opts);
		return $.ajax(opts);
	};
	
	$.fn.loadHTML = function(options){
		var opts = {
				el : 'body',
				identify : $.now(),
			},
			$target = $(this);
		opts = $.extend(opts, options, {
			cache : false, // TODO switch it on in prod
			error : function(jqXHR, tStatus, errorThrown) {
				AJAX.removeMask(opts);
				AJAX.error(options, jqXHR, tStatus, errorThrown, arguments);
			},
			success : function(html) {
//				if (true) {
//					var scripts = html.match(AJAX.SCRIPT_REG), 
//						$dom = $(html.replace(AJAX.SCRIPT_REG, ''));
//					App.initAuthPage($dom);
//					$target.html($dom);
//					scripts && $.map(scripts, function(val) {
//						jQuery.ajax({
//							cache : true,
//							crossDomain : true,
//							dataType : "script",
//							url : $(val).attr('src')
//						});
//					});
//				} else {
					var $dom = $(html);
					App.initAuthPage($dom);
					$target.html($dom);
//				}
				AJAX.removeMask(opts);
				options.success && options.success.apply(this, arguments);
			},
			dataType : 'html',
			type : options.type || 'GET',
			data : options.data,
			url : options.url
		});
		AJAX.addMask(opts);
		return $.ajax(opts);
	};

	$.download = function(opts) {
		opts = $.isPlainObject(opts) ? opts : {
			url : opts
		};
		var id = opts.id || $.now(), params = opts.data ? $.param(opts.data) : '', url = AJAX.getURL(opts.url);
		if (params) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + params;
		}
		var $tpl = $('<iframe>').attr({
			name : opts.id
		}).hide();
		$(opts.el || 'body').append($tpl);
		//error Msg
		$tpl[0].onload = function(){
			var respText = $(this.contentWindow.document.body).text(),
				obj = null,
				errorMsg = '',
				parseError = false,
				serverError = false,
				errorList;
			if (respText[0] === '{') {
				try {
					obj = JSON.parse(respText);
					errorList = obj.errorList;
					for (var i = 0, len = errorList.length; i < len; i++) {
						errorMsg += (errorList[i].errorMsg || '未知错误')  + '<br/>';
					}
				} catch(e){
					parseError = true;
				}
			} else if(respText !== ''){
				var statusCode = respText.match(/\d{3}/i)[0];
				if (statusCode > 399) {
					serverError = true;
				}
			} else {
				errorMsg = '发生未知异常'; 
			}
			$.msg({
				type : 'error',
				msg : '调用服务[' + (opts.name || '') + ']失败，' + (errorMsg !== ''? errorMsg : 
						(serverError ? '服务器错误[' + statusCode + ']' : parseError ? '解析错误' : ''))
			});
		};
		$tpl.attr('src', url);
	};
	
	//tooltip
	$.fn.extend({
		"tooltip2":function(opts){
			if(opts && opts.content){
				opts.content = "<div class='ui-tooltip-arrow'></div>"+opts.content;
			}
			$(this).tooltip(opts);
		}
	});
	
	$.round = function(value, bit) {
		value = value === undefined ? 0 : value;
		bit = bit === undefined ? 2 : bit;
		var offset = Math.pow(10, bit);
		return (Math.round(value * offset) / offset).toFixed(bit);
	};
	var Num = {
		addCommaBfrDot : function(val) {
			var isNeg = val.indexOf('-') == 0;
			isNeg && (val = val.substring(1));
			return (isNeg ? '-' : '') + this.addComma(val, true);
		},
		addCommaAftDot : function(val) {
			return this.addComma(val, false);
		},
		addComma : function(val, isBfrDot) {
			var idx, length = val.length, count = parseInt((length - 1) / 3);
			for ( var i = count; i > 0; i--) {
				idx = isBfrDot ? length - (count - i + 1) * 3 : i * 3;
				val = val.substring(0, idx) + ',' + val.substring(idx);
			}
			return val;
		}
	};
	
	/**
	 * 
	 * 为数字添加千位分隔符
	 * 
	 * @param val
	 *			需要添加千位分隔符的数字
	 * @param bit 
	 *			小数位数，默认为2
	 *
	 * @return number
	 * 			转换以后的字符串
	 */
	$.num2str = function(val, bit) {
		if (isNaN(Number(val))) {
			return val;
		}
		val = $.round(val === undefined ? 0 : val, bit === undefined ? 2 : bit);
		var dotIdx = val.indexOf('.');
		if (dotIdx === -1) {
			val = Num.addCommaBfrDot(val);
		} else {
			val = Num.addCommaBfrDot(val.substring(0, dotIdx)) + '.' + Num.addCommaAftDot(val.substring(dotIdx+1));
		}
		return val;
	};
	
	/**
	 * 
	 * 删除数字字符串上的千位分隔符
	 * 
	 * @param val
	 *			需要去除千位分隔符并转换为数字的字符串
	 *        
	 * @return string
	 * 			转换以后的数字
	 */
	$.str2num = function(val) {
		if (typeof val === 'number') {
			return val;
		}
		return Number(val.replace(/,/g,''));
	};
	
	window.App = {
		options : $.getQueryParams()
	};
	window.App = {
		AUTH_REG : /\d+/gi,
		close : function() {
			if (Desktop) {
				Desktop.close(window.App.options.wid);
			} else {
				close();
			}
		},
		options : window.App.options,
		API : Desktop.getAPI && Desktop.getAPI(window.App.options.wid),
		getWin : function(){
			return Desktop.getWin(App.options.wid);
		},
		getUser: function() {
			return Desktop && Desktop.getUser() || {};
		},
		getFullAuthMap : function() {
			return Desktop && Desktop.getFullAuthMap() || {};
		},
		hasAuth : function(fid) {
			return fid in this.getFullAuthMap();
		},
		getPosAuthMap : function(pid) {
			return Desktop && Desktop.getPosAuthMap(pid) || {};
		},
		_replaceAuth : function(val) {
			return val + ' in Desktop.getFullAuthMap()';
		},
		_getAuth : function(fid) {
			return (new Function('return ' + fid.replace(App.AUTH_REG, App._replaceAuth)))();
		},
		initAuthPage : function(el) {
			(el ? $(el).find('[auth-code]') : $('[auth-code]')).each(function(){
				var $this = $(this),
					fid = $this.attr('auth-code');
				if(!App._getAuth(fid)){
					if ($this.is('select')) {
						$this.select('widget').remove();
//						$this.select('widget').hide();
					}else{
						$this.remove();
//						$this.hide();
					}
				}
			});
		},
		freshAuthUI: function(AUTH_MODULES) {
			var appAuth =  this.getAuth();
			for(var moduleId in AUTH_MODULES) {
				//是否有权限操作该module
				var hasAuth = false;
				for (var i = 0; i < appAuth.modules.length; i++) {
					var module = appAuth.modules[i];
					if(moduleId == module.moduleId) {
						hasAuth = true;
						break;
					}
				};
				//fresh UI
				$moduleUI = $(AUTH_MODULES[moduleId]);
				// if(hasAuth && $moduleUI.hasClass('hide')){
				// 	$moduleUI.show();
				// }
				if(!hasAuth) {
					$moduleUI.hide();
				}
			}
		}
	};
	if (window.Desktop) {
		if (!window.ignoreLoading) {
			if (window.App.options && window.App.options['wid']) {
				Desktop.moveLoadingFlag && Desktop.moveLoadingFlag(window.App.options['wid']);
			}
		}
	}
})(window, jQuery);

$(function() {
	App.initAuthPage();
	$('.ht-select').select();
	// 8        - 退格 
    // 9        - Tab 
    // 13       - 回车 
    // 16~18    - Shift, Ctrl, Alt 
    // 37~40    - 左上右下 
    // 35~36    - End Home 
    // 46       - Del 
    // 112~123  - F1-F12 
	var KEY = /[\x08\x09\x0D\x10\x11\x12\x23\x24\x25\x26\x27\x28\x2E\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x7B]/,
		BDKEY = /[\x58\x52\x43\x41]/;
	
	function ValidationBase(attach){
	    return function(e) {
	        var code = e.keyCode;
	        if (KEY.test(String.fromCharCode(code)) || (BDKEY.test(String.fromCharCode(code)) && e.ctrlKey)) {
	            return true;
	        }
	        if (e.ctrlKey && code === 86) {
	            return true;
	        }
	        if (((code > 47 && code < 58) || (code > 95 && code < 106)) && !e.shiftKey) {
	            return true;
	        }
	        
	        if(attach) return attach.call(this,e,code);
	        
	        return false;
	    };
	}
	
	var Validation = {
		//数字
	    "ht-number":ValidationBase(),
	    //数字，小数
	    "ht-decimal":ValidationBase(function(e,code){
	        if ((code == 110 || code == 190) && !e.shiftKey && $(this).val().indexOf('.')=== -1) {
                return true;
	        }
	        return false;
	    }),
	    //身份证
	    "ht-identitycard":ValidationBase(function(e,code){
	    	if(code >= 65 && code <= 90){
	    		return true;
	    	}
	    	return false;
	    }),
	    //电话号码
	    "ht-phone":ValidationBase(function(e,code){
	    	//firefox下”-“的keyCode为173，chrome下为189
	    	if((code === 109 || code === 189 || code === 173) && !e.shiftKey){
	    		return true;
	    	}
	    	return false;
	    })
	};
	//粘贴验证
	var PasteValidation = {
			"ht-number" : /^\d*$/,
			"ht-decimal": /^\d*(\.\d+)?$/,
			"ht-identitycard" : /^\d{17}(\d|x)$/i
	};
	
	$.each(Validation,function(i,n){
	    $("body").on("keydown","input."+i,n);
	});
	
	$.each(PasteValidation, function(i ,n){
		$("body").on("paste","input."+i, function(e){
			var p = $.trim(e.originalEvent.clipboardData.getData("text/plain"));
			return n.test(p);
		});
	});
	
	var required = function(e) {
		var $tag = $(this), $el = $tag;
		if ($tag.is('.ui-select-button')) {
			if(e.isSimulated) return;
			$el = $tag.prev();
		}
		if ($.trim($el.val())) {
			$tag.removeClass('error');
		} else {
			$tag.addClass('error');
		}
	};
	$('body').on('blur', 'textarea.required,input:not(.date).required,select.required,.ui-select-button.required', required);
	$('body').on('changeDate', 'input.date.required', required);
	//stop the default action of backspace
	$('body').on('keydown', function(e){
		if (e.keyCode === 8) {
			if ($(e.target).is("input, textarea")) {
				return true;
			} else {
				return false;
			}
		}
	});
	//$('body').on('changeDate', 'input.date.required', required);
	ZeroClipboard.config({
		moviePath : window.WEB_ROOT + '/common/swf/ZeroClipboard.swf',
		swfPath : window.WEB_ROOT + '/common/swf/ZeroClipboard.swf',
		useNoCache : false,
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active"
	});
});

(function($,window){
	$.debounce = function(func, wait){
		var timeout;
		return function(){
			var context = this, args = arguments;
			var throttler = function() {
				timeout = null;
				func.apply(context,args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(throttler, wait);
		};
	};
	
	$.autoAdjustContentHeight = function(selector, minus, delay) {
		var win = $(window),
		measureHeight = function(){
			var sel = $(selector);
			if(sel.length){
				sel.outerHeight(win.height() - sel.offset().top - minus||0);
			}
		};
		measureHeight();
		win.off("resize.autoadjust");
		win.on("resize.autoadjust", $.debounce(measureHeight, delay||100));
	};
})($,window);