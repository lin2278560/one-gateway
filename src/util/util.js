
let util = {

    /**
     * 时间戳转时间对象
     * 该返回对象可以根据表达式进行格式化输出时间（Date.format('yyyy-MM-dd h:m:s')）
     * @param time_stamp  毫秒时间戳
     * @returns {Date}    时间对象
     */
    time_stamp2time_date: (time_stamp) => {
        let date = new Date();
        if (time_stamp)
            date.setTime(time_stamp);

        //给日期对象原型添加一个方法
        date.format = function (format) {
            let date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        };

        return date;
    },

    time_format: (time, format) => {
        let date = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            "q+": Math.floor((time.getMonth() + 3) / 3),
            "S+": time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                    date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },

    //检验数字
    queryNum:(ip) =>{  
        let exp = /^[0-9]*$/
        let flag = String(ip).match(exp);  
        if(flag != undefined && flag!=""){  
            return true;  
        } else {  
            return false;  
        }  
    },
    //检验mac地址
    queryMAC:(num) =>{  
        let exp = /^[A-F0-9]{2}([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})$/
        let flag = String(num).match(exp);  
        if(flag != undefined && flag!=""){  
            return true;  
        } else {  
            return false;  
        }  
    },
    //检验ipv4
    queryDevIP4:(ip) =>{  
        let exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;  
        let flag = String(ip).match(exp);  
        if(flag != undefined && flag!=""){  
            return true;  
        } else {  
            return false;  
        }  
    },

    //校验ipv6
    queryDevIP6:(ipvalue)=>{
        let matchStr = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        let ret = String(ipvalue).match(matchStr);
        if (ret != undefined && ret!="") {
            return true;
        } else {
            return false;
        }
    },
    //校验端口号
    testportnumber:(port) =>{
        let exp=/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        let flag = String(port).match(exp);  
        if(flag != undefined && flag!=""){  
            return true;  
        } else {  
            return false;  
        }  
    },
}


export default util;
