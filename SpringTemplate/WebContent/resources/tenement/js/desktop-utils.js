(function(window, $) {
	$.ajaxSetup({
		cache : true,
		dataType : 'json',
		type : 'POST'
	});
	/*
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
		translate : function(arrs) {
			var obj = {};
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
			return obj;
		}
	};
	$.fn.f2j = function(opts) {
		var $this = $(this), //
		$els = $this.find('input[name]:enabled, select[name]:enabled, textarea[name]:enabled'), //
		arrs = [];
		opts = {
			trim : true
		};

		while ($els.length > 0) {
			var $el = $els.eq(0),
				name = $el.attr('name');
			if ($el.is('input[type=text]') || $el.is('input[type=password]') || $el.is('input[type=hidden]') || $el.is('textarea')) {
				arrs.push({
					name : name,
					value : $.trim($el.val())
				});
				$els = $els.not($el);
			} else if ($el.is('input[type=checkbox]')) {
				var $checkbox = $els.filter('[name="' + name + '"]'), //
					$checked = $checkbox.filter(':checked');
				vals = [];
				for ( var i = 0; i < $checked.length; i++) {
					vals.push($checked.eq(i).val());
				}
				vals.length !=0 && arrs.push({
					name : name,
					value : vals.length == 1 ? vals[0] : vals
				});
				$els = $els.not($checkbox);
			} else if ($el.is('input[type=radio]')) {
				var $radio = $els.filter('[name="' + name + '"]');
				arrs.push({
					name : name,
					value : $radio.filter(':checked').val()
				});
				$els = $els.not($radio);
			} else if ($el.is('select')) {
				arrs.push({
					name : name,
					value : $el.val()
				});
				$els = $els.not($el);
			} else {
				console.log('解析错误', $els);
				$els = $els.not($el);
			}
		}
		return F2J.translate(arrs);
	};

	$.fn.j2f = function() {

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
	
	/**
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
	
	$.fn.key = function(opts){
		$(this).keypress(function(e){
			if(e.keyCode == 13){
				opts.entry && opts.entry.apply(this,[e]);
			}
		});
	};
	
	/**
	 * @param date(Date)
	 *            	(Date对象) 需要格式化的时间 
	 *            
	 * @param ptn(string)           
	 * 				格式化标准，如yyyy-MM-dd hh:mm:ss
	 *            	支持
	 *            	1. yyyy 	年份
	 *            	2. MM 		月份
	 *            	3. dd		日期
	 *            	4. hh		小时
	 *            	5. mm		分
	 *            	6. ss		秒
	 *            	7. SSS		毫秒
	 *            	8. q		季度
	 * 
	 * @return(string)
	 * 				返回格式化字符串
	 */
	$.formatDate = function(date, ptn) {
		if (date === "" || date === null || date === undefined) {
			return date;
		} 
		else if(typeof date === "number") {
			date = new Date(date);
		}
		else if (typeof date === 'string') {
			ptn = date;
			date = new Date();
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
		dt.mm = padLeft(dt.mm, 2, '0');
		for ( var key in dt) {
			ptn = ptn.replace(key, dt[key]);
		}
		return ptn;
	};
	function padLeft(s, l, c) {
		s = '' + s;
		if (l < s.length)
			return s;
		else
			return Array(l - s.length + 1).join(c || ' ') + s;
	}
	
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
			width: opts.width,
			modal : opts.modal
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
				var client = new ZeroClipboard($dia.dialog('widget').find('.ui-dialog-buttonset>button:last'));
				client.on('load', function(client) {
					client.on('complete', function(client, args) {
						var msga = '';
						for ( var i = 0; i < list.length; i++) {
							msga += list[i].errorMsg + '\r\n';
						}
						client.setText(msga);
						$.msg('复制成功！');
					});
				});
			}
			return $dia.dialog('open');
		}
	};
	
	var AJAX = {
		error : function(options, jqXHR, tStatus, errorThrown, args) {
			options.error && options.error.apply(this, args);
			// TODO abort类型重新处理
			//如果是401，表明token过期需要重新登录
			if(jqXHR.status == '401') {
				Desktop.showLogin && Desktop.showLogin();
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
			options.active && this.resetSession();
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
			return (url.indexOf('http://') && url.indexOf('https://')) ? window.ROOT + url : url;
		},
		removeMask : function(opts) {
			var $el = $(opts.el);
			if ($el.is('body')) {
				$el.removeClass('ui-loading-' + opts.identify);
				AJAX.handler && clearTimeout(AJAX.handler);
				AJAX.handler = setTimeout(function() {
					if (!$el.is('[class*="ui-loading-"]')) {
						$('body').mask(false);
					}
				}, 200);
			}else{
				$el.mask(false);
			}
		},
		addMask : function(opts) {
			var $el = $(opts.el).mask();
			if ($el.is('body')) {
				$el.addClass('ui-loading-' + opts.identify);
			}
		},
		resetSession : function() {
			this.sesHandler && clearTimeout(this.sesHandler);
			this.sesHandler = setTimeout(function() {
				var $dia = $.msg({
					type : 'confirm',
					msg : '会话即将超时，是否需要重新激活？'
				});
			}, window.SESSION.TIMEOUT);
		}
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
			dataType : 'json',
			type : options.type ? options.type : 'POST',
			url : AJAX.getURL(options.url)
		});
		if (options.postType == 'JSON') {
			opts.contentType = 'application/json; charset=UTF-8';
			opts.data = options.data ? JSON.stringify(options.data) : options.data;
		}
		AJAX.addMask(opts);
		return $.ajax(opts);
	};
})(window, jQuery);

(function($,window){
	$('body').on('blur', 'textarea.required,input.required,select.required,.ui-select-button.required', function(e) {
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
	});
	window.ROOT = "http://localhost:8080/SpringTemplate/";
	window.SESSION = {
		TIMEOUT : 3 * 1000,
		LEFT : 3 * 1000
	};
	if(!(typeof ZeroClipboard)){
		ZeroClipboard.config({
			moviePath : window.ROOT + '/common/swf/ZeroClipboard.swf',
			useNoCache : false,
			hoverClass: "ui-state-hover",
			activeClass: "ui-state-active"
		});
	}
	$('body').on('keydown', function(e){
		if (e.keyCode === 8) {
			if ($(e.target).is("input, textarea")) {
				return true;
			} else {
				return false;
			}
		}
	});
})($,window);
