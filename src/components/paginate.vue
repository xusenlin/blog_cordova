
<template>
  <div class="page" style="margin-top:20px;position: relative;height: 34px">
    <span class="total" style="position: absolute;right: 0">共 {{ total }} 条
      <Page style="display: initial;" @on-change="change" :total="total" :current="1"
            :page-size="SysConfig.pageSize"></Page>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Paginate',
    props: {
      api: String,
      params: Object,
      init: Boolean,
    },
    data() {
      return {
        total: 0,
        current: 0
      }
    },
    methods: {
      paginate: function () {

        let params = this.params;
        params.pageSize = this.SysConfig.pageSize;
        params.pageCode = this.current;
        let thisApp = this;

        thisApp.SysApi[thisApp.api]({params: params}, function (data) {

          thisApp.total = data.total;
          thisApp.$emit('val-change', data);
        })
      },
      change: function (page) {
        this.current = page;
        this.paginate();
      }
    },
    watch: {

      'init': {
        handler: function () {
          this.paginate();
        },
        // 深度观察
        deep: true
      }
    },
    mounted: function () {
      this.paginate();
    },
  }
</script>
