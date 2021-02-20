import Vue from 'vue'
import Router from 'vue-router'
import storage from './util/web-storage'
import iView from 'iview'
import axios from 'axios'
import api from './util/api.js'
import https from './util/https.js'

Vue.use(Router)
    // const originalPush = Router.prototype.push
    //    Router.prototype.push = function push(location) {
    //    return originalPush.call(this, location).catch(err => err)
    // }
const router = new Router({
        mode: 'history',
        // mode: 'hash',
        base: process.env.BASE_URL,
        routes: [
            { path: '/', redirect: '/login' },
            {
                path: '/index',
                name: 'index',
                component: () =>
                    import ('./views/Index.vue'),
                meta: { roles: ['admins', 'usermanager', 'logauditor'] },
                redirect: '/sys',
                children: [{
                        path: '/sys',
                        name: 'sys',
                        component: () =>
                            import ('./views/sys/Sys.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/sys/info',
                        children: [{
                                path: 'info',
                                name: 'info',
                                component: () =>
                                    import ('./views/sys/SysInfo.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'time',
                                name: 'time',
                                component: () =>
                                    import ('./views/sys/SysTime.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'maintain',
                                name: 'maintain',
                                component: () =>
                                    import ('./views/sys/SysMaintain.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'loggingSettings',
                                name: 'loggingSettings',
                                component: () =>
                                    import ('./views/sys/SysLogin.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'backupRecovery',
                                name: 'backupRecovery',
                                component: () =>
                                    import ('./views/sys/SysBackupRecovery.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'equipmentInfo',
                                name: 'equipmentInfo',
                                component: () =>
                                    import ('./views/sys/SysEquipmentInfo.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'update',
                                name: 'update',
                                component: () =>
                                    import ('./views/sys/SysUpdate.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'license',
                                name: 'license',
                                component: () =>
                                    import ('./views/sys/SysLicense.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolPing',
                                name: 'toolPing',
                                component: () =>
                                    import ('./views/sys/SysToolPing.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolTraceroute',
                                name: 'toolTraceroute',
                                component: () =>
                                    import ('./views/sys/SysToolTraceroute.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolTelnet',
                                name: 'toolTelnet',
                                component: () =>
                                    import ('./views/sys/SysToolTelnet.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolArp',
                                name: 'toolArp',
                                component: () =>
                                    import ('./views/sys/SysToolArp.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolCatch',
                                name: 'toolCatch',
                                component: () =>
                                    import ('./views/sys/SysToolCatch.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolFTP',
                                name: 'toolFTP',
                                component: () =>
                                    import ('./views/sys/SysToolFTP.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'toolSMB',
                                name: 'toolSMB',
                                component: () =>
                                    import ('./views/sys/SysToolSMB.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'businessMonitoring',
                                name: 'businessMonitoring',
                                component: () =>
                                    import ('./views/sys/SysBusinessMonitoring.vue'),
                                meta: { roles: ['admins'] },
                            },
                        ],
                    },
                    {
                        path: '/local',
                        name: 'local',
                        component: () =>
                            import ('./views/local/Local.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/local/acl',
                        children: [{
                                path: 'acl',
                                name: 'acl',
                                component: () =>
                                    import ('./views/local/LocalAcl.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'udp',
                                name: 'udp',
                                component: () =>
                                    import ('./views/local/LocalUdp.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'tcp',
                                name: 'tcp',
                                component: () =>
                                    import ('./views/local/LocalTcp.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'ftp',
                                name: 'ftp',
                                component: () =>
                                    import ('./views/local/LocalFtp.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'accessControl',
                                name: 'accessControl',
                                component: () =>
                                    import ('./views/local/LocalAccessControl.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'proxy',
                                name: 'proxy',
                                component: () =>
                                    import ('./views/local/LocalProxy.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'smb',
                                name: 'smb',
                                component: () =>
                                    import ('./views/local/LocalSmb.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'smbService',
                                name: 'smbService',
                                component: () =>
                                    import ('./views/local/LocalSmbService.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'nfs',
                                name: 'nfs',
                                component: () =>
                                    import ('./views/local/LocalNfs.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'sftp',
                                name: 'sftp',
                                component: () =>
                                    import ('./views/local/LocalSFtp.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'trust',
                                name: 'trust',
                                component: () =>
                                    import ('./views/local/trust_auth_setting.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'mail',
                                name: 'mail',
                                component: () =>
                                    import ('./views/local/LocalMail.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'antiAttack',
                                name: 'antiAttack',
                                component: () =>
                                    import ('./views/local/LocalAntiAttack.vue'),
                                meta: { roles: ['admins'] },
                            },
                        ],
                    },
                    {
                        path: '/data',
                        name: 'data',
                        component: () =>
                            import ('./views/data/Data.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/data/resources',
                        children: [{
                                path: 'businessRegister',
                                name: 'businessRegister',
                                component: () =>
                                    import ('./views/data/DataBusinessRegister.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'resources',
                                name: 'resources',
                                component: () =>
                                    import ('./views/data/DataResources.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'comm',
                                name: 'comm',
                                component: () =>
                                    import ('./views/data/DataComm.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'sync',
                                name: 'sync',
                                component: () =>
                                    import ('./views/data/DataSync.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'lockCache',
                                name: 'lockCache',
                                component: () =>
                                    import ('./views/data/DataLockCache.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'syncLock',
                                name: 'syncLock',
                                component: () =>
                                    import ('./views/data/DataSyncLock.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'fileSync',
                                name: 'fileSync',
                                component: () =>
                                    import ('./views/data/dbsync_file_edit.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'fileSync1',
                                name: 'fileSync1',
                                component: () =>
                                    import ('./views/data/dbsync_file_edit1.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'fileSync3',
                                name: 'fileSync3',
                                component: () =>
                                    import ('./views/data/dbsync_file_edit3.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'udpMap',
                                name: 'udpMap',
                                component: () =>
                                    import ('./views/data/DataUdpMap.vue'),
                                meta: { roles: ['admins'] },
                            },
                            // {path: 'accessControl', name: 'accessControl', component: () => import('./views/local/LocalAccessControl.vue')},
                            // {path: 'proxy', name: 'proxy', component: () => import('./views/local/LocalProxy.vue')},
                            {
                                path: 'dbsync',
                                name: 'dbsync',
                                component: () =>
                                    import ('./views/data/dbsync_task_edit.vue'),
                                meta: { roles: ['admins'] },
                            },
                            // {path: 'test', name: 'test', component: () => import('./views/data/test.vue'), meta: {roles: ['admins']}},
                            // {path: 'table', name: 'table', component: () => import('./views/data/table.vue'), meta: {roles: ['admins']}},
                            {
                                path: 'test2',
                                name: 'test2',
                                component: () =>
                                    import ('./views/data/test2.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'serviceRestart',
                                name: 'serviceRestart',
                                component: () =>
                                    import ('./views/data/DataServiceRestart.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'filesyncadd',
                                name: 'filesyncadd',
                                component: () =>
                                    import ('./views/data/dbsync_file_edit3.vue'),
                                meta: { roles: ['admins'] },
                            },
                        ],
                    },
                    {
                        path: '/network',
                        name: 'network',
                        component: () =>
                            import ('./views/network/Network.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/network/interface',
                        children: [{
                                path: 'channel',
                                name: 'channel',
                                component: () =>
                                    import ('./views/network/NetworkChannel.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'interface',
                                name: 'interface',
                                component: () =>
                                    import ('./views/network/NetworkInterface.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'bandwidth',
                                name: 'bandwidth',
                                component: () =>
                                    import ('./views/network/NetworkBandwidth.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'mac',
                                name: 'mac',
                                component: () =>
                                    import ('./views/network/NetworkMac.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'gateway',
                                name: 'gateway',
                                component: () =>
                                    import ('./views/network/NetworkGateway.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'route',
                                name: 'route',
                                component: () =>
                                    import ('./views/network/NetworkRoute.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'ipormac',
                                name: 'ipormac',
                                component: () =>
                                    import ('./views/network/NetworkIpOrMac.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'portTrunking',
                                name: 'portTrunking',
                                component: () =>
                                    import ('./views/network/NetworkRortTrunking.vue'),
                                meta: { roles: ['admins'] },
                            },
                            // {path: 'fileSync', name: 'fileSync', component: () => import('./views/data/dbsync_file_edit.vue')},
                            // {path: 'fileSync1', name: 'fileSync1', component: () => import('./views/data/dbsync_file_edit1.vue')},
                            // {path: 'accessControl', name: 'accessControl', component: () => import('./views/local/LocalAccessControl.vue')},
                            // {path: 'proxy', name: 'proxy', component: () => import('./views/local/LocalProxy.vue')},
                        ],
                    },
                    {
                        path: '/availability',
                        name: 'availability',
                        component: () =>
                            import ('./views/availability/Availability.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/availability/carpSetting',
                        children: [{
                                path: 'carpSetting',
                                name: 'carpSetting',
                                component: () =>
                                    import ('./views/availability/CarpSetting.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'virtual',
                                name: 'virtual',
                                component: () =>
                                    import ('./views/availability/Virtual.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'carpStatus',
                                name: 'carpStatus',
                                component: () =>
                                    import ('./views/availability/CarpStatus.vue'),
                                meta: { roles: ['admins'] },
                            },
                            // {path: 'fileSync', name: 'fileSync', component: () => import('./views/data/dbsync_file_edit.vue')},
                            // {path: 'fileSync1', name: 'fileSync1', component: () => import('./views/data/dbsync_file_edit1.vue')},
                            // {path: 'accessControl', name: 'accessControl', component: () => import('./views/local/LocalAccessControl.vue')},
                            // {path: 'proxy', name: 'proxy', component: () => import('./views/local/LocalProxy.vue')},
                        ],
                    },
                    {
                        path: '/virus',
                        name: 'virus',
                        component: () =>
                            import ('./views/virus/Virus.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/virus/engineInfo',
                        children: [{
                                path: 'engineInfo',
                                name: 'engineInfo',
                                component: () =>
                                    import ('./views/virus/EngineInfo.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'isolation',
                                name: 'isolation',
                                component: () =>
                                    import ('./views/virus/Isolation.vue'),
                                meta: { roles: ['admins'] },
                            },
                        ],
                    },
                    {
                        path: '/user',
                        name: 'user',
                        component: () =>
                            import ('./views/user/User.vue'),
                        // meta: {roles: ['user']},
                        redirect: '/user/userConfig',
                        children: [{
                                path: 'userConfig',
                                name: 'userConfig',
                                component: () =>
                                    import ('./views/user/UserConfig.vue'),
                                meta: { roles: ['usermanager'] },
                            },
                            {
                                path: 'table-expand.vue',
                                name: 'table-expand.vue',
                                component: () =>
                                    import ('./views/user/test.vue'),
                                meta: { roles: ['usermanager'] },
                            },
                            {
                                path: 'userRole',
                                name: 'userRole',
                                component: () =>
                                    import ('./views/user/UserRole.vue'),
                                meta: { roles: ['usermanager'] },
                            },
                            {
                                path: 'userPwd',
                                name: 'userPwd',
                                component: () =>
                                    import ('./views/user/UserPassword.vue'),
                                meta: { roles: ['usermanager'] },
                            },
                        ],
                    },
                    {
                        path: '/logs',
                        name: 'logs',
                        component: () =>
                            import ('./views/logs/Log.vue'),
                        // meta: {roles: ['log']},
                        redirect: '/logs/logCommond',
                        children: [{
                                path: 'logSys',
                                name: 'logSys',
                                component: () =>
                                    import ('./views/logs/LogSys.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logCommond',
                                name: 'logCommond',
                                component: () =>
                                    import ('./views/logs/LogCommond.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logDbExtractInfo',
                                name: 'logDbExtractInfo',
                                component: () =>
                                    import ('./views/logs/LogDbExtractInfo.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logDbMessage',
                                name: 'logDbMessage',
                                component: () =>
                                    import ('./views/logs/LogDbMessage.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logFileMonitor',
                                name: 'logFileMonitor',
                                component: () =>
                                    import ('./views/logs/LogFileMonitor.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: "LogFileCommond",
                                name: "LogFileCommond",
                                component: () => import("./views/logs/LogFileCommond.vue"),
                                meta: { roles: ["logauditor"] }
                            },
                            {
                                path: 'logFileChannel',
                                name: 'logFileChannel',
                                component: () =>
                                    import ('./views/logs/LogFileChannel.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logFileWarning',
                                name: 'logFileWarning',
                                component: () =>
                                    import ('./views/logs/LogFileWarning.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logTrustAuth',
                                name: 'logTrustAuth',
                                component: () =>
                                    import ('./views/logs/LogTrustAuth.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logSetting',
                                name: 'logSetting',
                                component: () =>
                                    import ('./views/logs/LogSettings.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logSyslog',
                                name: 'logSyslog',
                                component: () =>
                                    import ('./views/logs/LogSyslog.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logSnmpTraps',
                                name: 'logSnmpTraps',
                                component: () =>
                                    import ('./views/logs/LogSnmpTraps.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                            {
                                path: 'logSyncPrograms',
                                name: 'logSyncPrograms',
                                component: () =>
                                    import ('./views/logs/LogSyncPrograms.vue'),
                                meta: { roles: ['logauditor'] },
                            },
                        ],
                    },
                    {
                        path: '/test',
                        name: 'table-expand.vue',
                        component: () =>
                            import ('./views/test/Test.vue'),
                        // meta: {roles: ['admin']},
                        redirect: '/test/ftpProxy',
                        children: [{
                                path: 'ftpProxy',
                                name: 'ftpProxy',
                                component: () =>
                                    import ('./views/test/TestFtpProxy.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'fileSyncFilter',
                                name: 'fileSyncFilter',
                                component: () =>
                                    import ('./views/test/TestFileSyncFilter.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'ftpProxyParameter',
                                name: 'ftpProxyParameter',
                                component: () =>
                                    import ('./views/test/TestFtpProxyParameter.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'sendParameter',
                                name: 'sendParameter',
                                component: () =>
                                    import ('./views/test/TestSendParameter.vue'),
                                meta: { roles: ['admins'] },
                            },
                            {
                                path: 'taskConfig',
                                name: 'taskConfig',
                                component: () =>
                                    import ('./views/test/TestTaskConfig.vue'),
                                meta: { roles: ['admins'] },
                            },
                        ],
                    },
                ],
            },

            {
                path: '/login',
                name: 'login',
                component: () =>
                    import ('./views/Login.vue'),
                meta: { roles: ['admins', 'usermanager', 'logauditor'] },
            },
            {
                path: '/service_api',
                name: 'ceshitest',
                component: () =>
                    import ('./views/test/Ceshitest.vue'),
                meta: { roles: ['admins', 'usermanager', 'logauditor'] },
            },
            {
                path: '/test2',
                name: 'test2',
                component: () =>
                    import ('./components/chart/contrastLine2.vue'),
            },
            {
                path: '/403',
                name: '403',
                component: () =>
                    import ('./views/403.vue'),
                meta: { roles: ['admins', 'usermanager', 'logauditor'] },
            },
        ],
    })
    // router.beforeEach((to, from, next) => {
    //     //console.log(to, from);
    //     next();
    // })
    // const role = 'user'
router.beforeEach((to, from, next) => {
    let user = storage.getStorage('user')
    let users = storage.getStorage('users')
    if (users != null) {
        users = users.replace('"', '').replace('"', '')
    }
    if (to.path == '/login') {
        next()
    } else if (to.path != '/login' && user == null) {
        iView.Notice.error({ title: '未登录', desc: '请登录。' })
        next({ path: '/login' })
    } else if (!to.meta.roles.includes(users)) {
        next({ path: '/403' })
    } else {
        // iView.Spin.show();
        https.fetchGet(api.user.session.url).then((response) => {
                // iView.Spin.hide();
                // console.log("【session_top】:"+to.meta.roles.includes(users));
                // console.log("【session】:"+response.data.data);
                if (response.data.data == null) {
                    iView.Notice.error({ title: '登录失效', desc: '请重新登录' })
                    storage.clear()
                    next({ path: '/login' })
                } else {
                    next()
                }
            })
            //     .catch(function (error) {
            //     iView.Spin.hide();
            //     iView.Notice.error({title: "访问异常", desc: "请重新登录。"});
            //     storage.clear();
            //     next({path: "/login"});
            // });
            // https.fetchGet(api.login.check.url).then((response) => {
            //     iView.Spin.hide();
            //     console.log(response.data.status);
            //     if (response.data.status==500) {
            //         iView.Notice.error({title: "黑名单", desc: "黑名单无法访问。"});
            //         storage.clear();
            //         next({path: "/login"});
            //     } else {
            //         next();
            //     }
            // });
            //     .catch(function (error) {
            //     iView.Spin.hide();
            //     iView.Notice.error({title: "访问异常", desc: "请重新登录。"});
            //     storage.clear();
            //     next({path: "/login"});
            // });
            //  https.fetchGet(api.license.license_time.url).then((response) => {
            //      iView.Spin.hide();
            //      console.log(response.data.status);
            //      if (response.data.status==500) {
            //          iView.Notice.error({title: "注册文件过期", desc: "注册文件过期。"});
            //          //storage.clear();
            //         next({path: "/sys/license"});
            // // this.$router.push({path: "/sys/license"});
            //      } else {
            //          next();
            //      }
            //  }).catch(function (error) {
            //      iView.Spin.hide();
            //      iView.Notice.error({title: "注册文件过期", desc: "注册文件过期。"});
            //      //storage.clear();
            //      //this.$router.push({path: "/sys/license"});
            //      next({path: "/sys/license"});
            //  });
    }
})
export default router