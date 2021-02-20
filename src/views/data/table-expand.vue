<template>
    <div>
<!--        <Row class="expand-row">-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Job: </span>-->
<!--                <span class="expand-value">{{ row.department }}</span>-->
<!--            </Col>-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Interest: </span>-->
<!--                <span class="expand-value">{{ row.interest }}</span>-->
<!--            </Col>-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Birthday: </span>-->
<!--                <span class="expand-value">{{ row.birthday }}</span>-->
<!--            </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Favorite book: </span>-->
<!--                <span class="expand-value">《{{ row.book }}》</span>-->
<!--            </Col>-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Favorite movie: </span>-->
<!--                <span class="expand-value">{{ row.movie }}</span>-->
<!--            </Col>-->
<!--            <Col span="8">-->
<!--                <span class="expand-key">Favorite music: </span>-->
<!--                <span class="expand-value">{{ row.music }}</span>-->
<!--            </Col>-->
<!--        </Row>-->
        <Table size="small" :columns="columns1" :data="data9">
            <template slot-scope="{ row, idx }" slot="action">
                <Dropdown transfer class="nav-dropdown">
                    <Button @click.stop="addPlatForm(j)">配置管理&nbsp;<span class="caret"></span></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <div @click="1">服务启停</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="1">修改服务</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="1">删除服务</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="1">查看配置</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
<!--                <Button type="primary" @click.stop="addPlatForm(j)">配置管理&nbsp;<span class="caret"></span></Button>-->
<!--                <ul class="dropdown-menu" :class="idx==index?'open-dropdown-menu':''">-->
<!--                    <li><a>服务启停</a></li>-->
<!--                    <dbsync_file_update @click.native="byFileIndex(idx,j)"></dbsync_file_update>-->
<!--                    <li><a @click="deleteService(d.id,j)">删除服务</a></li>-->
<!--                    <li><a @click="showService(idx,j)">查看配置</a></li>-->
<!--                </ul>-->
            </template>
        </Table>
    </div>
</template>

<script>
    import dbsync_file_update from "./dbsync_file_edit_update";
    export default {
        name: "table-expand",
        components: {
            dbsync_file_update
        },
        props: {
            row: Object
        },
        data () {
            return {
                columns1: [
                    {title: '服务名', key: 'servicename', align: 'center'},
                    {title: '服务ID', key: 'out_task_id', align: 'center'},
                    {title: '服务类型', key: 'type', align: 'center'},
                    {title: '服务状态', key: 'runstate', align: 'center'},
                    // {title: '主管部门', key: '', align: 'center'},
                    // {title: '主管人', key: '', align: 'center'},
                    // {title: '联系电话', key: '', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                data9: []
            }
        },
        mounted: function() {
            this.showSyncTaskInfo();
        },
        methods: {
            showSyncTaskInfo() {
                // this.data9 = this.row.filesync;
                // console.log(this.data9["NUM1"]);
                for (let i in this.row.filesync) {
                    // console.log(this.row.filesync[i]);
                    this.data9.push(this.row.filesync[i]);
                }
            }
        }
    }
</script>

<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .open-dropdown-menu {
        display: block;
    }
    #first th {
        border-right: 1px solid #e8eaec;
        background-color: #f8f8f9;
    }
    td {
        border-right: 1px solid #e8eaec;
    }
</style>