let api_cfg = {
    xdx: {
        findIPAddr: { url: "netWork/findIPAddr", remark: "获取接口列表" },
        addIPV4Addr: { url: "netWork/addIPV4AddrToJSONFile", remark: "添加IPV4地址" },
    },
    avail: {
        getMachineState: { url: "/hotBackup/getMachineState", remark: "获取双机热备状态信息" },
        getDoubleBackups: { url: "/hotBackup/getHotBackups", remark: "获取双机热备信息" },
        updateHotBackups: { url: "/hotBackup/updateHotBackups", remark: "更新双机热备的信息" },
        isHost: { url: "/hotBackup/isHost", remark: "判断此时的机器是否主机" },
        addVirtualIp: { url: "/hotBackup/addVirtualIp", remark: "添加虚拟ip" },
        getVirtualIps: { url: "/hotBackup/getVirtualIps", remark: "获取虚拟ip列表" },
        editVirtualIps: { url: "/hotBackup/editVirtualIps", remark: "修改虚拟ip" },
        delVirtualIp: { url: "/hotBackup/delVirtualIp", remark: "删除虚拟ip" },
        startHotBackup: { url: "/hotBackup/startHotBackup", remark: "启动热备" },
        stopHotBackup: { url: "/hotBackup/stopHotBackup", remark: "停止热备" },
        deleteBackupIp: { url: "/hotBackup/deleteBackupIp", remark: "删除备机ip组" },
        getAllMachineIp: { url: "/hotBackup/getAllMachineIp", remark: "新增虚拟ip时获得的主机备机ip列表" }
    },
    network: {
        findIpMac: { url: "ipmac/findIpMac", remark: "获取ip/mac列表" },
        addIpMac: { url: "ipmac/addIpMac", remark: "添加ip/mac地址" },
        updateIpMac: { url: "ipmac/updateIpMac", remark: "修改ip/mac地址" },
        delIpMac: { url: "ipmac/delIpMac", remark: "删除ip/mac地址" },

        showDevAndMac: { url: "ip/findMac", remark: "获取MAC地址列表" },
        showIPAddr: { url: "ip/findIP", remark: "获取接口列表" },
        addIpaddr: { url: "ip/addIP", remark: "添加接口地址" },
        updateIpaddr: { url: "ip/updateIP", remark: "修改接口地址" },
        delIpaddr: { url: "ip/delIP", remark: "删除接口地址" },
        startIpaddr: { url: "ip/startIP", remark: "启用接口" },
        stopIpaddr: { url: "ip/stopIP", remark: "禁用接口" },
        findSPIpaddr: { url: "onlineIp/findIp", remark: "寻找特别接口" },
        onLineIP: { url: "ip/onLineIP", remark: "修改特别接口" },
        showIfconfig: { url: "ip/findDev", remark: "获取网口列表" },
        showEth: { url: "ip/findEth", remark: "点击通道口展示网口" },
        showCommon: { url: "/ip/findCommon", remark: "获取外端通道口信息" },
        showinnerCommon: { url: "/channel/findChannel", remark: "获取内端通道口信息" },
        addChannel: { url: "/channel/addChannel", remark: "增加通道" },
        updateChannel: { url: "/channel/updateChannel", remark: "修改通道" },
        delChannel: { url: "/channel/delChannel", remark: "删除通道" },
        testChannel: { url: "/checks/testChannel", remark: "测试通道" },

        //端口聚合
        addPort: { url: "/port/addPort", remark: "增加端口聚合" },
        updatePort: { url: "/port/updatePort", remark: "修改端口聚合" },
        delPort: { url: "/port/delPort", remark: "删除端口聚合" },
        findPort: { url: "/port/findPort", remark: "寻找端口聚合" },
        findEth: { url: "/port/findEth", remark: "寻找端口聚合的成员接口" },
    },
    route: {
        showRoute: { url: "route/findRoute", remark: "获取路由列表" },
        addRoute: { url: "route/addRoute", remark: "添加路由配置" },
        updateRoute: { url: "route/updateRoute", remark: "修改路由配置" },
        delRoute: { url: "route/delRoute", remark: "删除路由配置" },
        startRoute: { url: "route/startRoutes", remark: "启用路由" },
        stopRoute: { url: "route/stopRoutes", remark: "禁用路由" }
    },
    gateway: {
        showGateway: { url: "gateway/findGateWay", remark: "获取网关列表" },
        addGateway: { url: "gateway/addGateWay", remark: "添加网关配置" },
        updateGateway: { url: "gateway/updateGateWay", remark: "修改网关配置" },
        delGateway: { url: "gateway/delGateWay", remark: "修改网关配置" },
        startGateway: { url: "gateway/startGateWay", remark: "启用网关" },
        stopGateway: { url: "gateway/stopGateWay", remark: "禁用网关" }
    },
    test: {
        proxyInfo: { url: "proxy/proxyInfo", remark: "获取FTP代理配置列表" },
        delProxy: { url: "proxy/delProxy", remark: "删除FTP代理配置列表" },
        addProxy: { url: "proxy/addProxy", remark: "添加FTP代理配置列表" },
        updateProxy: { url: "proxy/updateProxy", remark: "修改FTP代理配置列表" },

        policyInfo: { url: "policy/policyInfo", remark: "获取文件同步过滤策略列表" },
        delPolicy: { url: "policy/delPolicy", remark: "删除文件同步过滤策略信息" },
        addPolicy: { url: "policy/addPolicy", remark: "添加文件同步过滤策略信息" },
        updatePolicy: { url: "policy/updatePolicy", remark: "修改文件同步过滤策略信息" },

        findFileInfo: { url: "wsg/findFileInfo", remark: "获取系统配置文件" },
        writeFileInfo: { url: "wsg/writeFileInfo", remark: "修改获取系统配置文件" },
        proxydInfo: { url: "proxyd/proxydInfo", remark: "获取FTP代理参数配置" },
        updateProxyd: { url: "proxyd/updateProxyd", remark: "修改FTP代理参数配置" },

        fsenddInfo: { url: "fsendd/fsenddInfo", remark: "获取发送参数配置列表" },
        updateFsendd: { url: "fsendd/updateFsendd", remark: "修改发送参数配置信息" },

        taskInfo: { url: "task/taskInfo", remark: "获取任务配置列表" },
        delTask: { url: "task/delTask", remark: "删除任务配置列表" },
        addTask: { url: "task/addTask", remark: "添加任务配置列表" },
        updateTask: { url: "task/updateTask", remark: "修改任务配置列表" },
    },
    user: {
        showUser: { url: "user/findUser", remark: "获取用户信息列表" },
        delUser: { url: "user/delUser", remark: "删除用户信息" },
        addUser: { url: "user/addUser", remark: "添加用户信息" },
        updateUser: { url: "user/updateUser", remark: "修改用户信息" },
        showPWD: { url: "user/findPassWord", remark: "获取密码长度信息" },
        updatePWD: { url: "user/updatePassWord", remark: "修改密码长度信息" },
        showGroup: { url: "group/findGroup", remark: "获取用户角色列表" },

        blockeInfo: { url: "/login/blockeInfo", remark: "检验是否被封禁" },
        checkCode: { url: "captcha/checkCode", remark: "验证码接口" },
        login: { url: "login/login", remark: "登录接口" },
        session: { url: "login/session", remark: "会话接口" },
        cleanSession: { url: "login/cleanSession", remark: "关闭会话接口" },
        findSessionInfo: { url: "/login/findSessionInfo", remark: "登陆设置getinfo" },
        updateSession: { url: "/login/updateSession", remark: "登陆设置修改配置" },
        updatePassWord: { url: "/login/updatePassWord", remark: "登陆修改密码" },

        changTime: { url: "/system/changTime", remark: "更改时间" },
        findTime: { url: "system/findTime", remark: "查看时间" },

        testbackup: { url: "/confFile/testBackup", remark: "测试备份" },
        backup: { url: "/confFile/backup", remark: "备份" },
        testRecover: { url: "/confFile/testRecover", remark: "查看有否有其他的备份存在在带备份目录中" },
        recover: { url: "/confFile/recover", remark: "恢复上传文件" },
        handleRecover: { url: "/confFile/handleRecover", remark: "进行恢复" },
        restoreFactorySettings: { url: "/confFile/restoreFactorySettings", remark: "恢复出厂设置" },

        getUpgradePackMessage: { url: "/upgradePack/getUpgradeMessage", remark: "获取更新包信息" },
        softwareUpload: { url: "/upgradePack/softwareUpload", remark: "固件升级" },
        coreUpload: { url: "/upgradePack/coreUpload", remark: "内核升级" },

        systemRestart: { url: "/system/systemRestart", remark: "重启系统" },
        systemStop: { url: "/system/systemStop", remark: "关闭系统" },
    },
    data: {
        loadChannel: { url: "load/loadChannel", remark: "重启通道" },
        loadServe: { url: "load/loadServe", remark: "重启业务" },


        addSyncTask: { url: "sync/addSyncTask", remark: "业务注册" },
        syncTaskInfo: { url: "sync/findSyncTaskInfo", remark: "业务与服务列表" },
        updateSyncTask: { url: "sync/updateSyncTask", remark: "修改业务信息" },
        delSyncTask: { url: "sync/delSyncTask", remark: "删除业务信息" },

        addFileTask: { url: "filetask/addFileTask", remark: "添加文件同步服务" },
        updateFileTask: { url: "filetask/updateFileTask", remark: "修改文件同步服务" },
        delFileTask: { url: "filetask/delFileTask", remark: "删除文件同步服务" },
        startFileTask: { url: "filetask/startFileTask", remark: "启动文件同步服务" },
        stopFileTask: { url: "filetask/stopFileTask", remark: "禁用文件同步服务" },
        startdbTask: { url: "/dbtask/startDbTask", remark: "启动数据库同步服务" },
        stopdbTask: { url: "/dbtask/stopDbTask", remark: "禁用数据库同步服务" },
        delSubtasks: { url: "/dbtask/delSubtasks", remark: "删除子任务" },
        getDbList: { url: "dsn/findSourcesInfoName", remark: "拿到资源列表名" },
        getDbListByName: { url: "dsn/findSourcesInfo", remark: "拿到数据库列表" },
        getTableList: { url: "dsn/tableInfo", remark: "新增时拿到资源里的全部数据" },
        getUpdateList: { url: "dbtask/findDbTask", remark: "修改时拿到资源里的全部数据" }, //pramas taskid id

        getDbListcolumnByName: { url: "dsn/findSourcesTableInfo", remark: "拿表字段" },
        submitmission: { url: "/dbtask/addDbTask", remark: "提交同步任务" },
        deldbsycn: { url: "/dbtask/delDbTask", remark: "删除同步任务" },
        updatedbsycn: { url: "/sync/findSyncTaskInfo", remark: "查询所有信息" },
        findDsnInfo: { url: "dsn/findDsnInfo", remark: "获取数据库资源" },
        updateDsn: { url: "dsn/updateDsn", remark: "修改数据库资源" },
        updateDbmission: { url: "/dbtask/updateDbTask", remark: "修改数据库同步任务" },
        updateDsnInfo: { url: "dsn/updateDsnInfo", remark: "重新加载" },
        delDsn: { url: "dsn/delDsn", remark: "删除数据库资源" },
        addDsn: { url: "dsn/addDsn", remark: "添加数据库资源" },
        testConnection: { url: "dsn/testDsn", remark: "测试连接" },
        resetConnection: { url: "/dsn/resetConnection", remark: "重置连接池" }
    },

    filter: {
        addFilter: { url: "filter/addFilter", remark: "增加访问控制规则" },
        delFilter: { url: "filter/delFilter", remark: "删除访问控制规则" },
        updateFilter: { url: "filter/updateFilter", remark: "修改访问控制规则" },
        findFilterInfo: { url: "filter/findFilterInfo", remark: "查询访问控制规则" }
    },
    udp: {
        addUdpNat: { url: "udp/addUdpNat", remark: "增加udp协议" },
        delUdpNat: { url: "udp/delUdpNat", remark: "删除udp协议" },
        updateUdpNat: { url: "udp/updateUdpNat", remark: "修改udp协议" },
        findUdpNatInfo: { url: "udp/findUdpNatInfo", remark: "查询udp协议" },
    },
    virus: {
        deleteFile: { url: "/virus/deleteFile", remark: "清空目录" },
        getFiles: { url: "virus/getFiles", remark: "获取文件树" },
        getVirusDataMessage: { url: "virus/getVirusDataMessage", remark: "获取病毒库信息" },
        startVirusCheck: { url: "virus/startVirusCheck", remark: "开始病毒引擎" },
        stopVirusCheck: { url: "virus/stopVirusCheck", remark: "停止病毒引擎" },
        upgradeVirusData: { url: "virus/upgradeVirusData", remark: "升级病毒库" },
    },
    local: {
        findUdpIP: { url: "/ip/findUdpIP", remark: "查询udp网口ip列表" },
        addSftp: { url: "sftp/addSftp", remark: "添加本地SFTP服务" },
        delSftp: { url: "sftp/delSftp", remark: "删除本地SFTP服务" },
        updateSftp: { url: "sftp/updateSftp", remark: "修改本地SFTP服务" },
        findSftp: { url: "sftp/findSftp", remark: "查询本地SFTP服务" },
        startSftp: { url: "sftp/startSftp", remark: "启动本地SFTP服务" },
        stopSftp: { url: "sftp/stopSftp", remark: "禁用本地SFTP服务" },
        addFtp: { url: "ftp/addFtp", remark: "添加本地FTP服务" },
        delFtp: { url: "ftp/delFtp", remark: "删除本地FTP服务" },
        updateFtp: { url: "ftp/updateFtp", remark: "修改本地FTP服务" },
        findFtpInfo: { url: "ftp/findFtpInfo", remark: "查询本地FTP服务" },
        startFtp: { url: "ftp/startFtp", remark: "启动本地FTP服务" },
        stopFtp: { url: "ftp/stopFtp", remark: "禁用本地FTP服务" },
        startDisableFilter: { url: "disable/startDisableFilter", remark: "启动本地FTP服务按钮" },
        stopDisableFilter: { url: "disable/stopDisableFilter", remark: "禁用本地FTP服务按钮" },
        findDisableFilter: { url: "disable/findDisableFilter", remark: "获取本地FTP服务按钮信息" },
        addSam: { url: "samba/addSam", remark: "添加本地Smb服务" },
        delSam: { url: "samba/delSam", remark: "删除本地Smb服务" },
        updateSam: { url: "samba/updateSam", remark: "修改本地Smb服务" },
        samInfo: { url: "samba/samInfo", remark: "查询本地Smb服务" },
        startSam: { url: "samba/startSam", remark: "启动本地Smb服务" },
        stopSam: { url: "samba/stopSam", remark: "禁用本地Smb服务" },

        //抗攻击
        addAttack: { url: "attack/addAttack", remark: "修改抗攻击阈值" },
        findAttack: { url: "attack/findAttack", remark: "获取抗攻击阈值" },
    },
    log: {
        //告警日志
        delWarningLog: { url: "warnningLog/delWarningLog", remark: "告警日志删除" },
        findFileWarningOperStatus: { url: "warnningLog/findWarnningLog", remark: "告警日志查询" },
        getWarningTaskIds: { url: "warnningLog/getTaskIds", remark: "告警日志获取TaskId" },
        getWarningModels: { url: "warnningLog/getWarningModels", remark: "告警日志获取警告对象" },

        //snmp
        findSnmpServe: { url: "snmpServe/findSnmpServe", remark: "snmp配置查询" },
        addSnmpServe: { url: "snmpServe/addSnmpServe", remark: "snmp配置修改" },

        operationLog: { url: "operation/findOperationLog", remark: "管理操作日志查询" },
        delOperationLog: { url: "operation/delOperationLog", remark: "删除管理操作日志" },
        channelLog: { url: "channelLog/findChannelLog", remark: "通道日志查询" },
        delAllChannelLogs: { url: "channelLog/delAllChannelLogs", remark: "删除通道日志查询" },
        delAllFileOperStatusLogs: { url: "/fileOperStatus/delAllFileOperStatusLogs", remark: "删除文件同步查询" },
        fileOperStatus: { url: "/fileOperStatus/findFileOperStatus", remark: "文件同步日志" },
        getTaskNames: { url: "/fileOperStatus/getTaskNames", remark: "文件同步日志获取任务名列表" },
        getNames: { url: "/operation/getNames", remark: "管理日志获取管理员列表" },
        //syslog
        action: { url: "/syslog/action", remark: "开关action" },
        getLastLog: { url: "/syslog/getLastLog", remark: "查询最近一次操作时间" },
        getSysLog: { url: "/syslog/getSysLog", remark: "查询syslog信息" },
        updateSysLog: { url: "/syslog/updateSysLog", remark: "修改syslog信息" },
        stop: { url: "/syslog/stop", remark: "开关stop" },
        //snmp
        findSnmpInfo: { url: "/snmpInfo/findSnmpInfo", remark: "查询snmp信息" },
        addSnmpInfo: { url: "/snmpInfo/addSnmpInfo", remark: "修改snmp信息" },
        //数据库基本信息
        findRecordDetail: { url: "log/findRecordDetail", remark: "暂时没用" },
        delAllRecordDetail: { url: "log/delAllRecordDetail", remark: "暂时没用" },
        findMessage: { url: "/message/findMessage", remark: "基本信息表查询" },
        delAllMessage: { url: "message/delAllMessage", remark: "删除基本信息表" },
        getDegDevIps: { url: "message/getdegDevIps", remark: "获取条件查询数据" },
        messagegetDegLoadTableNames: { url: "message/getDegLoadTableNames", remark: "获取条件查询数据" },
        messagegetDegExtractTableNames: { url: "message/getDegExtractTableNames", remark: "获取条件查询数据" },
        messagegetDegBusinessNames: { url: "message/getDegBusinessNames", remark: "获取条件查询数据" },
        messagegetDegServiceNames: { url: "message/getDegServiceNames", remark: "获取条件查询数据" },
        //抽取数据库
        getLoadTableNames: { url: "extractInfo/getLoadTableNames", remark: "获取条件查询数据" },
        getExtractTableNames: { url: "extractInfo/getExtractTableNames", remark: "获取条件查询数据" },
        getDegServiceNames: { url: "extractInfo/getDegServiceNames", remark: "获取条件查询数据" },
        getBusinessNames: { url: "extractInfo/getDegBusinessNames", remark: "获取条件查询数据" },
        //内端显示
        findLoadInfo: { url: "loadInfo/findLoadInfo", remark: "load表查询" },
        delAllLoadInfo: { url: "loadInfo/delAllLoadInfo", remark: "删除load表" },
        neigetExtractTableNames: { url: "loadInfo/getExtractTableNames", remark: "获取条件查询数据" },
        neigetLoadTableNamess: { url: "loadInfo/getLoadTableNames", remark: "获取条件查询数据" },
        neigetDiretions: { url: "loadInfo/getDiretions", remark: "获取条件查询数据" },
        neigetBusinessNames: { url: "loadInfo/getBusinessNames", remark: "获取条件查询数据" },
        neigetDegServiceNames: { url: "loadInfo/getDegServiceNames", remark: "获取条件查询数据" },
        //外端显示
        findExtractInfo: { url: "/extractInfo/findExtractInfo", remark: "抽取表查询" },
        delAllExtractInfo: { url: "extractInfo/delAllExtractInfo", remark: "删除抽取表" },
        //同步通用日志
        findCommonLogs: { url: "/commonLog/findCommonLogs", remark: "文件同步异常表查询" },
    },
    sys: {
        //首页
        getIndexData: { url: "/hotBackup/getIndexData", remark: "双机热备首页数据" },
        warnningLogcount: { url: "/warnningLog/count", remark: "告警日志首页数据" },
        extractInfocount: { url: "/extractInfo/count", remark: "数据库首页数据" },
        dbtaskcount: { url: "/dbtask/count", remark: "业务总量首页数据" },
        fileOperStatuscount: { url: "/fileOperStatus/count", remark: "文件同步首页数据" },
        ipfindLinkIp: { url: "/ip/findLinkIp", remark: "网络接口首页数据" },

        reboot: { url: "/system/reboot", remark: "系统重启" },
        getSystemMessage: { url: "/confFile/getSystemMessage", remark: "獲取系統的版本信息" },
        getSystemName: { url: "/confFile/getSystemName", remark: "獲取系統名稱" },

        //诊断工具
        arp: { url: "/debug/arp", remark: "诊断工具提交arp" },
        ftpTest: { url: "/debug/ftpTest", remark: "诊断工具提交ftpTest" },
        ping: { url: "/debug/ping", remark: "诊断工具提交ping" },
        stopTcpDump: { url: "/debug/stopTcpDump", remark: "诊断工具提交stopTcpDump" },
        tcpdump: { url: "/debug/tcpdump", remark: "诊断工具提交tcpdump" },
        telnet: { url: "/debug/telnet", remark: "诊断工具提交telnet" },
        Traceroute: { url: "/debug/Traceroute", remark: "诊断工具提交Traceroute" },

        //定期维护
        getMaintainModel: { url: "/maintain/getMaintainModel", remark: "获取定期维护的值" },
        updateMaintainModel: { url: "/maintain/updateMaintainModel", remark: "修改定期维护的值" },

        //license
        licenseInfo: { url: "/license/licenseInfo", remark: "license信息查询" },
        licenseIn: { url: "/license/licenseIn", remark: "license信息查询" },
        licensefile: { url: "/license/licensefile", remark: "license提交文件" },
    },
    mail: {
        addMailUser: { url: "/mailServer/addMailUser", remark: "增加User" },
        deleteMailUser: { url: "/mailServer/deleteMailUser", remark: "删除邮件" },
        getMailServerMessage: { url: "/mailServer/getMailServerMessage", remark: "获取信息" },
        startMailService: { url: "/mailServer/startMailService", remark: "" },
        stopMailService: { url: "/mailServer/stopMailService", remark: "" },
        updateMailServer: { url: "/mailServer/updateMailServer", remark: "修改邮件服务" },
        updateMailUser: { url: "/mailServer/updateMailUser", remark: "修改邮件用户" },
    }
};

export default api_cfg;