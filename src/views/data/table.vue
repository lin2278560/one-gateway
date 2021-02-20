<template>
    <Table border :columns="columns10" :data="data9"></Table>
</template>

<script>
    import expandRow from './table-expand.vue';
    export default {
        name: "table",
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {title: '业务/服务名', key: 'taskname', align: 'center'},
                    {title: '服务ID', key: '', align: 'center'},
                    {title: '服务类型', key: '', align: 'center'},
                    {title: '服务状态', key: '', align: 'center'},
                    {title: '主管部门', key: 'department', align: 'center'},
                    {title: '主管人', key: 'master', align: 'center'},
                    {title: '联系电话', key: 'contact', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                data9: [
                    // {"taskname": "test1","master": "张三","department": "研发","contact": "123"}
                    {"contact":"123",
                        "dbsync":{},
                        "department":"研发",
                        "filesync":{
                            "NUM2":{
                                "id":"NUM2",
                                "iocharset":"UTF-8",
                                "ipaddress":"192.168.5.235",
                                "level":"1",
                                "operation":"删除",
                                "out_task_id":"99",
                                "password":"123456",
                                "path":"/test",
                                "remotrport":"8080",
                                "runstate":"stop",
                                "servicename":"fileSync",
                                "time_interval":"3",
                                "type":"ftp",
                                "username":"wukz"
                            },
                            "NUM1":{
                                "id":"NUM1",
                                "iocharset":"1",
                                "ipaddress":"1",
                                "level":"1",
                                "operation":"1",
                                "out_task_id":"10000",
                                "password":"1",
                                "path":"/hoem",
                                "remotrport":"1",
                                "runstate":"run",
                                "servicename":"44444",
                                "time_interval":"1",
                                "type":"本地FTP",
                                "username":"1"
                            }
                        },
                        "id":"NUM1",
                        "master":"张三",
                        "taskname":"table-expand.vue"}
                ]
            }
        }
    }
</script>

<style scoped>

</style>