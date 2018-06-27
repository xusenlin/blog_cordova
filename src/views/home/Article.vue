<template>
    <div class="article-center">
        <div class="article">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottomAllLoaded="bottomAllLoaded" ref="loadmore">
                <ul class="list-ul">
                    <li class="list-li" v-for="item in list" :key="item.id" @click="openArticle(item.id)">
                        <div  class="item-content">
                            <div class="item-media">

                                <img v-if="item.cover" class="item-img" :src="item.cover">
                                <img v-else class="item-img" src="../../assets/images/cover.jpg">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title"> {{ item.title }}</div>
                                </div>
                                <div class="item-text">{{ item.created }}</div>
                                <div class="item-comments">回复：{{ item.commentsNum }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list:[],
                bottomAllLoaded:false,
                pageCode:1,
            };
        },
        methods: {
            loadBottom(){

                let APP =this;
                APP.pageCode++;
                APP.$Api.post({pageCode:APP.pageCode,pageSize:APP.$Config.pageSize},r=>{

                    if(!r.length){
                        APP.bottomAllLoaded = true;// if all data are loaded
                        APP.$refs.loadmore.onBottomLoaded();
                        APP.$Func.toast('已经没有更多的文章了','center');
                        return;
                    }

                    for(let i=0;i<r.length;i++){
                        APP.list.push(r[i]);
                    }
                    APP.$Func.toast('已经加载'+APP.$Config.pageSize+'篇文章','center');
                    APP.$refs.loadmore.onBottomLoaded();
                    if(APP.list.length>APP.$Config.maxPostLimit){
                        APP.list.splice(0,APP.$Config.pageSize);
                    }
                    APP.$Func.setLocalArticle(APP.list);
                });



            },
            openArticle(id){
                if(this.$Func.isCordova())
                    cordova.InAppBrowser.open('http://xusenlin.com/index.php/archives/'+id, '_blank', "location=no");
                else
                    window.location.href = 'http://xusenlin.com/index.php/archives/'+id;

            },
            loadTop() {
                let APP = this;
                APP.$Api.post({pageSize:APP.$Config.pageSize},r=>{
                    APP.$Func.setLocalArticle(r);
                    APP.list = r;
                    APP.$Func.toast('已经刷新当前文章','center');
                    APP.pageCode = 1;
                    APP.bottomAllLoaded = false;
                    APP.$refs.loadmore.onTopLoaded();
                });

            },
            loadArtcle(){
                let APP = this;
                APP.$Api.post({pageSize:APP.$Config.pageSize},r=>{
                    APP.$Func.setLocalArticle(r);
                    APP.list = r;
                });
            }
        },
        mounted: function () {
            let APP = this;
            let article = APP.$Func.getLocalArticle();
            if(article) {
                APP.list = article;
            }else {
                APP.loadArtcle();
            }
            setTimeout(()=>{if(this.$Func.isCordova()){window.navigator.splashscreen.hide();}},500);
        }
    }
</script>
<style lang="less">
    .article-center{
        height: calc(~'100vh - 94px');
        overflow: scroll;
        .article {
            .mint-loadmore{
                min-height: calc(~'100vh - 94px');
            }
            background: #f8f9fa;
            .list-ul {
                list-style: none;
                padding: 0;
                position: relative;
            }
            .list-li {
                min-height: 4rem;
                margin: 0.8rem 0;
                background-color: #fff;
                box-sizing: border-box;
                position: relative;
                /*border-bottom: 1px solid #e8e9eb;*/
                /*border-top: 1px solid #e8e9eb;*/
            }
            .item-content {
                box-sizing: border-box;
                padding-left: .75rem;
                padding-right: .75rem;
                min-height: 2.2rem;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                align-items: center;
            }
            .item-media {
                padding-top: .45rem;
                padding-bottom: .5rem;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-flex-shrink: 0;
                -ms-flex: 0 0 auto;
                -webkit-flex-shrink: 0;
                flex-shrink: 0;
                -webkit-box-lines: single;
                -moz-box-lines: single;
                -webkit-flex-wrap: nowrap;
                flex-wrap: nowrap;
                box-sizing: border-box;
                -webkit-box-align: center;
                -webkit-align-items: center;
                align-items: center;
            }
            .item-inner {
                width: 100%;
                position: relative;
                padding-left: 0.5rem;
                display: block;
                padding-top: .5rem;
                padding-bottom: .45rem;
                -webkit-align-self: stretch;
                align-self: stretch;

            }
            .item-img {
                width: 6rem;
                height: 4rem;
            }
            .item-title {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #333;
                font-size: 14px;
            }
            .item-text {
                white-space: nowrap;
                bottom: 0;
                position: absolute;
                font-size: 12px;
                padding-bottom: .45rem;
                color: #afafaf;
            }
            .item-comments{
                right: 0;
                white-space: nowrap;
                bottom: 0;
                position: absolute;
                font-size: 12px;
                padding-bottom: .45rem;
                color: #afafaf;
            }
        }
    }

</style>