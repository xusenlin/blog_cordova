<template>
    <div class="notes-edit">
        <mt-header title="编辑笔记">
            <router-link to="/notes" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <i @click="publish" class="iconfont icon-fabu" slot="right" style="font-size: 20px"></i>
        </mt-header>
        <div class="content">
            <div class="item">
                <i class="iconfont icon-tag" slot="right"></i>
                <input placeholder="标题" v-model="title"/>
            </div>
            <div class="item">
                <textarea placeholder="笔记内容" v-model="text"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title:'',
                text:''
            };
        },
        methods: {
            publish(){
                let APP = this;
                APP.$Api.noteEedit({title:APP.title,text:APP.text},r=>{
                    APP.$Func.toast(r.msg,'center');
                    if(r.yes){
                        APP.$router.push({name: 'notes'})
                    }

                });
            }
        },
        mounted: function () {
            let APP = this;

        }
    }
</script>
<style lang="less">
    .notes-edit{
        .mint-header-title {
            height: 100%;
            line-height: 40px;
        }
        .content{
            .item{
                display: flex;
                padding: 6px;
                border-bottom: 1px solid #eee;
                .iconfont{
                    text-align: center;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 20px;
                }
                input{
                    border: none;
                    outline: none;
                    flex: 1;

                }
                textarea{
                    border: none;
                    outline: none;
                    flex: 1;
                    padding: 4px;
                    //font-size: 18px;
                    min-height: calc(~'100vh - 98px');
                }
            }
        }
    }
</style>