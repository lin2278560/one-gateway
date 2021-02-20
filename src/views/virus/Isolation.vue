<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
                <Button type="primary" style="margin-left: 15px;float:right" @click="clearAll">清空所有目录</Button>
            </div>
            
            <div class="modal-body">
                <!-- <table border="1" style="width: 100%;">
                    <tr style="height: 40px;">
                        <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                            
                        </td>
                        <td></td>
                    </tr>
                </table> -->
                <Tree style="width:95%;margin:0 auto;" :data="data" :load-data="loadData" :render="renderContent"></Tree>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "Isolation",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                //基本路径
                path:'/database/virusgap/',
                links: [
                    {name: "隔离区管理", to: "/virus/isolation"}
                ],
                data:[],
                //参考数据
                data3: [
                    {
                        title: 'parent',
                        loading: false,
                        children: []
                    },
                    {
                        title: 'parent',
                    }
                ],
                data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px',
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                },
                                //  [
                                //     h('Button', {
                                //         props: Object.assign({}, this.buttonProps, {
                                //             icon: 'ios-add',
                                //             type: 'primary'
                                //         }),
                                //         style: {
                                //             width: '64px'
                                //         },
                                //         on: {
                                //             click: () => { this.append(data) }
                                //         }
                                //     })
                                // ]
                                )
                            ]);
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }
        },
        mounted: function() {
            this.getfile(this.path)
        },
        methods: {
            clearAll(){
                this.$Modal.confirm({
                    title: '删除所有目录',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    onOk: () => {
                        this.$https.fetchPost(this.$api.virus.deleteFile.url,{path:this.path}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('删除成功');
                                setTimeout(() => {
                                    this.reload();
                                    this.$Modal.remove();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            getfile(path){
                this.$https.fetchPost(this.$api.virus.getFiles.url,{path:path}).then((resp) => {
                    if (resp.data.status == 200) {
                        this.data = resp.data.data
                        for(let i in this.data){
                            this.data[i].title = this.data[i].fileName
                            this.data[i].render = (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                data.dir?h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                   h('span',
                                    [ h('Poptip', {props: {trigger: "hover",placement: "right", content: "文件路径："+data.path, maxWidth: "600"}}, data.fileName)],
                                    )
                                ]):h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-paper-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span',
                                    [ h('Poptip', {props: {trigger: "hover",placement: "right", content: "文件大小："+(data.size+"B")+" , "+"文件路径："+data.path, maxWidth: "600"}}, data.fileName)],
                                    )
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                },
                                [
                                    h('Button',
                                    {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-remove'
                                        }),
                                        on: {
                                            click: () => { this.remove(root, node, data) }
                                        },
                                    //     style: data.children==undefined || data.children.length==0?{
                                    //     display: 'none',

                                    // }:{}
                                    })
                                ])
                            ]);
                        }
                        //判断是否有孩子
                        if (this.data[i].dir == true) {
                            this.data[i].loading = false
                            this.data[i].children = []
                        }
                        }
                        // console.log(this.data)
                    } else
                        this.$Notice.error({title: '获取文件路径失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        // h('Button', {
                        //     props: Object.assign({}, this.buttonProps, {
                        //         icon: 'ios-add'
                        //     }),
                        //     style: {
                        //         marginRight: '8px'
                        //     },
                        //     on: {
                        //         click: () => { this.append(data) }
                        //     }
                        // }),
                        h('Button',
                         {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            },
                        //     style: data.children==undefined || data.children.length==0?{
                        //     display: 'none',

                        // }:{}
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                console.log(data,"data")
                let path = data.path
                this.$https.fetchPost(this.$api.virus.deleteFile.url,{path:path}).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '删除成功', desc: "正在刷新界面", duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else
                        this.$Notice.error({title: '删除失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            loadData (item, callback) {
                // console.log(this.data,"this.data")
                // console.log(item,"item")
                let path = item.path
                this.$https.fetchPost(this.$api.virus.getFiles.url,{path:path}).then((resp) => {
                    if (resp.data.status == 200) {
                        let data = resp.data.data
                        for(let i in data){
                            data[i].title = data[i].fileName
                            data[i].render = (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                data.dir?h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span',
                                    [ h('Poptip', {props: {trigger: "hover",placement: "right", content: "文件路径："+data.path, maxWidth: "600"}}, data.fileName)],
                                    )
                                    // data.fileName?h('span', data.fileName):h('span', '此文件夹为空文件夹')
                                ],
                                ):h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-paper-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    },
                                    ),
                                    h('span',
                                    [ h('Poptip', {props: {trigger: "hover",placement: "right", content: "文件大小："+(data.size+"B")+" , "+"文件路径："+data.path, maxWidth: "600"}}, data.fileName)],
                                    )
                                    // data.children?h('span', data.fileName):h('span', '此文件夹为空文件夹')
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                },
                                [
                                    h('Button',
                                    {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-remove'
                                        }),
                                        on: {
                                            click: () => { this.remove(root, node, data) }
                                        },
                                    //     style: data.children==undefined || data.children.length==0?{
                                    //     display: 'none',

                                    // }:{}
                                    })
                                ])
                            ]);
                        }
                        //判断是否有孩子
                        if (data[i].dir == true) {
                            data[i].loading = false
                            data[i].children = []
                        }
                        }
                        console.log(data)
                        callback(data);
                    } else
                        this.$Notice.error({title: '获取文件路径失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
                
            }
        }
    }
</script>

<style>
.ivu-tree ul li {
    list-style: none;
    margin: 8px 0;
    padding: 0;
    white-space: nowrap;
    outline: 0;
    /* background: linear-gradient(#eee,#e1eeee,#eee);
     */
    line-height: 24px;
    overflow: hidden;
}
.ivu-tree ul li span:hover{
    background: linear-gradient(#eee,#e1eeee,#eee);
}
</style>