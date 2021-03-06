prototype.bind = prototype.on = function(key, func, type) {
	if(func) {
		this.each(function(ele) {
			if(ele.addEventListener){
				ele.addEventListener(key, func);    
			} else if(ele.attachEvent){ // IE < 9 :(
			    ele.attachEvent("on" + key, function(e){ func.call(ele, e )});
				if(_isIeCustomEvent) {
					if(!_customEvents[key])
						_customEvents[key] = [];
					_customEvents[key].push({element: ele, handler: func, bubble: type=== undefined? true : !type, capture: !!type});
				}
			} else{
				ele["on" + key] = handler;
			}
		});
	} else {
		this.trigger(key);
	}
	return this;
};


"scroll load dblclick click mousedown mouseover mousemove mouseup mouseleave focus keydown keypress keyup select selectstart resize".split(" ").forEach(function(name, index, arr) {
	if(typeof name !== "string")
		return;

	prototype[name] = function(func) {
		this.on(name, func);
		return this;
	}
});
