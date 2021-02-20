const Mock = require('mockjs');
const Random = Mock.Random;


const produceData = function (opt) {
    console.log('opt', opt);
    let articles = [];
    for (let i = 0; i < 30; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), // Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        };
        articles.push(newArticleObject)
    }
    return {
        data: articles
    }
};

const devinfo = function (opt) {

    let count = 40;
    //let page = opt.page | ( opt.page>0 ? opt.page : 1 );
    let size = JSON.parse(opt.body).size || 10;
    let num = size >= count ? count : size;

    console.log(JSON.parse(opt.body), JSON.parse(opt.body).size, count, size, num);

    let articles = [];
    for (let i = 0; i < num; i++) {
        let mock = Mock.mock({phone: /^1[358][1-9]\d{8}/});
        let newArticleObject = {
            uuid: Random.csentence(32, 32),
            name: Random.csentence(1, 16),
            number: Random.csentence(0, 16),
            ipv4: Random.ip(),
            applyLocation: Random.integer(0, 1),
            state: Random.integer(0, 1),
            version: Random.natural(),
            type: Random.csentence(1, 16),
            snmpModule: Random.csentence(1, 16),
            alarmModule: Random.csentence(1, 16),

            date: Random.date("yyyy-MM-dd"),
            cname: Random.cname(),
            phone: mock.phone
        };
        articles.push(newArticleObject)
    }
    return {
        code: 200,
        title: '',
        desc: '',
        data: {
            count: count,
            data: articles
        }
    }
};


const rMailNoticeCfg = function (opt) {

    let cfg = {
        state: Random.boolean(),
        serverIp: Random.ip(),
        serverPort: Random.integer(0, 65535),
        account: Random.email(),
        pwd: Random.name(),
        receiveMail: Random.email(),
    };

    return {
        status: 200,
        title: null,
        desc: null,
        data: cfg
    };
};

const rSmsNoticeCfg = function (opt) {

    let cfg = {
        state: Random.boolean(),
        serverIp: Random.ip(),
        serverPort: Random.integer(0, 65535),
        account: Random.email(),
        pwd: Random.name(),
        receivePhone: Random.email(),
    };

    return {
        status: 200,
        title: null,
        desc: null,
        data: cfg
    };
};

const rSysInfo = function (opt) {
    let cfg = {
        state: Random.boolean(),
        name: Random.name(),
        version: Random.name(),
        startupTime: new Date().getTime(),
    };

    return {
        status: 200,
        title: null,
        desc: null,
        data: cfg
    };
};

const success = function (opt) {
    return {
        status: 200,
        title: null,
        desc: null,
        data: null
    };
};


const dzxy_rHeatmap = function (opt) {
    let parm = JSON.parse(opt.body);

    let form = parm.form;
    let to = parm.to;
    let one = 24 * 60 * 60 * 1000;
    let size = ((to - form) / one) + 1;

    let data = [];
    let modal = [.3, .1, .008, .002, .001, .001, .001, .002, .008, .2, .2, .3, .5, .6, .8, .9, .9, .8, .8, .7, .6, .5, .4, .3];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < 24; j++) {
            let flow = parseInt(Math.random() * 10000 * modal[j]);
            let count = parseInt(Math.random() * 10000 * modal[j]);
            flow = flow < 10 ? 0 : flow;
            count = count < 10 ? 0 : count;
            let time = form + (i * one) + (j * (60 * 60 * 1000));
            data.push(
                {
                    time: time,
                    count: count,
                    flowSize: flow
                }
            )
        }
    }

    /*for (let i = 0; i < size * 24; i++) {
        data.push({
            time: form + i * (60 * 60 * 1000),
            count: Random.integer(3000, 10000),
            flowSize: Random.integer(6000, 10000),
        });
    }*/

    return {
        status: 200,
        title: null,
        desc: null,
        data: data
    };
};

Mock.mock('http://localhost:8013/news', /post|get/i, produceData);
Mock.mock('http://localhost:8013/system/device/rDevice', /post|get/i, devinfo);
Mock.mock('http://localhost:8013/system/config/rMailNoticeCfg', /post|get/i, rMailNoticeCfg);
Mock.mock('http://localhost:8013/system/config/uMailNoticeCfg', /post|get/i, success);
Mock.mock('http://localhost:8013/system/config/rSmsNoticeCfg', /post|get/i, rSmsNoticeCfg);
Mock.mock('http://localhost:8013/system/config/uSmsNoticeCfg', /post|get/i, success);
Mock.mock('http://localhost:8013/system/sysmg/rSysInfo', /post|get/i, rSysInfo);

Mock.mock('http://localhost:8013/system/home/report/dzxy/rHeatmap', /post|get/i, dzxy_rHeatmap);

export default {};