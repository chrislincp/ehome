<template lang="html">
  <div class="products_config">
    <div class="structure_config">
      <el-tree
        :data="structureData"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      baseId: 1000,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'structureData'
    ])
  },
  methods: {
    ...mapActions([
      'GetStructureData',
      'PostStructure'
    ]),
    getRequest () {
      const params = { type: 1, fc: 1, UserID: 42, Visibility: 1 }
      this.GetStructureData(params)
    },
    postRequest (params) {
      this.PostStructure(params).then(res => {
        const { code, msg } = res
        if (code == 200) {
          this.$message({
            type:'success',
            message: msg
          })
          this.getRequest()
        }else {
          this.$message({
            type: 'error',
            message: msg
          })
        }

      })
    },
    renderContent (createElement, { node, data, store }) {
      var that = this;
      const btnVisible = node.level < 3 ? '' : 'none'
      return createElement('span', [
          createElement('span', node.label),
          createElement('span', {attrs:{
              style:"float: right; margin-right: 10px"
          }},[
              createElement('el-button',{attrs:{
                style: `margin: 0 10px;`,
                type: 'text',
                icon: 'edit'
              },on:{
                  click:function() {
                    that.$prompt('请输入名称', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                    }).then(({ value }) => {
                      const para = {
                        type: 0,
                        fc: 4,
                        ID: node.data.id,
                        label: value
                      }
                      that.postRequest(para)
                    }).catch(() => {

                    })
                  }
              }}),
              createElement('el-button',{attrs:{
                style: `margin: 0 10px; display: ${btnVisible}`,
                type: 'text',
                icon: 'plus'
              },on:{
                  click:function() {
                    that.$prompt('请输入名称', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                    }).then(({ value }) => {
                      const para = {
                        type: 0,
                        fc: 2,
                        UserID: 42,
                        FID: node.data.id,
                        label: value
                      }
                      that.postRequest(para)
                    }).catch(() => {

                    })

                  }
              }}),
              createElement('el-button',{attrs:{
                style: `margin: 0 10px;`,
                type: 'text',
                icon: 'delete'
              },on:{
                  click:function() {
                      that.$confirm(`确认删除 ${node.data.label}？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        const para = {
                          type: 0,
                          fc: 3,
                          ID: node.data.id
                        }
                        that.postRequest(para)
                      }).catch(() => {})
                  }
              }}),
          ]),
      ]);
    }
  },
  mounted () {
    this.getRequest()
  }
}
</script>


<style lang="scss">
  .products_config {
    .structure_config {
      .structure_submit {
        margin: 20px 0;
      }
    }
  }

</style>
