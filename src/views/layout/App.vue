<template>
    <div class="main">
        <mt-header fixed :title="mainTitle" style="box-shadow: 0 0 8px rgba(0, 0, 0, .3);">
            <i v-if="title=='notes'" class="iconfont icon-add" slot="left" style="font-size: 21px;" @click="$router.push({name: 'note-edit'})"></i>
            <i v-if="title=='notes'" class="iconfont icon-shuaxin refresh" slot="right" :style="'transform: rotate('+refreshRotate+'deg)'" @click="refreshNotes()"></i>
        </mt-header>

        <div class="main-content">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
        </div>

        <mt-tabbar v-model="title" class="tabbar">
            <mt-tab-item id="home" @click.native="selectTab">
                <i class="iconfont icon-article-s"></i>
                <div class="bar-text">文章</div>
            </mt-tab-item>
            <mt-tab-item id="notes" @click.native="selectTab">
                <i class="iconfont icon-zuopintuijian"></i>
                <div class="bar-text">笔记</div>
            </mt-tab-item>
            <mt-tab-item id="me" @click.native="selectTab">
                <i class="iconfont icon-wo1"></i>
                <div class="bar-text">我的</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                title: this.$route.name,
                refreshRotate:0
            };
        },
        methods: {
            selectTab() {
                this.$router.push({name: this.title});
            },
            refreshNotes() {
                let APP = this;
                APP.refreshRotate = APP.refreshRotate + 360;

                APP.$Api.notes({},r=>{

                    APP.$Func.toast('已经刷新所有笔记','center');
                    APP.$Func.setLocalNotes(r);
                    globalBus.$emit('refreshNotes', r)
                });
            }
        },
        mounted: function () {

        },
        computed: {
            mainTitle: function () {
                return this.title.toLocaleUpperCase();
            }
        },
        components: {},
    }
</script>
<style lang="less">

    .main-content {
        background: #fff;
        margin-top: 40px;
        margin-bottom: 54px;
        //min-height: calc(~'100vh - 94px');
    }

    .refresh{
        font-size: 21px;
        display: inline-block;
        transition: all 1s;
    }
    .tabbar {
        background: #fff;
        position: fixed;
        box-shadow: 0 0 8px rgba(0, 0, 0, .5);
        .bar-text {
            margin-top: 2px;
        }
        .iconfont {

            font-size: 26px;
        }
        > .mint-tab-item.is-selected {
            background: none;
        }
    }
</style>