<template>
    <div class="notes">
        <mt-cell v-for="item in list" @click.native="openNote(item.id)" :title="item.title" :key="item.id" is-link>
            <span class="point" slot="icon" :style="'color:'+ $Func.getRandomColor()">●</span>
        </mt-cell>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list:[],
            };
        },
        methods: {
            openNote(id){
                let APP = this;

            }
        },
        mounted: function () {
            globalBus.$on('refreshNotes', function (r) {
                APP.list = r;
            });
            let APP = this;
            let notes = APP.$Func.getLocalNotes();
            if(notes) {
                APP.list = notes;
            }else {

                APP.$Api.notes({},r=>{
                    APP.list = r;
                    APP.$Func.setLocalNotes(r);
                });
            }
        }
    }
</script>
<style lang="less">
    .notes{
        padding: 4px 0;
        .point{
            vertical-align: middle;
            font-size: 24px;
        }
        .mint-cell-title{
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .mint-cell:last-child {
             background-image: none;
             background-size: 100% 0px;
             background-repeat: no-repeat;
        }
        .mint-cell-wrapper {
            background-image: none;
            background-size: 120% 0px;
        }
    }

</style>