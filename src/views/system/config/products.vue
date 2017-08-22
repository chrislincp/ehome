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
import { mapGetters, mapActions  } from 'vuex';

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
    renderContent (createElement, { node, data, store }) {
                var that = this;
                return createElement('span', [
                    createElement('span', node.label),
                    createElement('span', {attrs:{
                        style:"float: right; margin-right: 10px"
                    }},[
                        createElement('el-button',{attrs:{
                            style: 'margin: 0 10px',
                            type: 'text',
                            icon: 'edit'
                        },on:{
                            click:function() {
                              that.$prompt('请输入名称', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                              }).then(({ value }) => {
                                const para = { type: 0, fc: 4, ID: node.data.id, label: value }
                                that.PostStructure(para).then(res => {
                                  const { code, msg } = res
                                  if (code == 200) {
                                    that.$message({
                                      type:'success',
                                      message: msg
                                    })
                                  }
                                  that.GetStructureData()
                                })
                              }).catch(() => {

                              })
                                // store.append({ id: that.baseId++, label: 'testtest', children: [] }, data);
                            }
                        }}),
                        createElement('el-button',{attrs:{
                          style: 'margin: 0 10px',
                            type: 'text',
                            icon: 'plus'
                        },on:{
                            click:function() {
                              that.$prompt('请输入名称', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                              }).then(({ value }) => {
                                // store.append({ id: that.baseId++, label: value, children: [] }, data);
                                const para = { type: 0, fc: 2, UserID: 42, FID: node.data.id, label: value }
                                that.PostStructure(para).then(res => {
                                  const { code, msg } = res
                                  if (code == 200) {
                                    that.$message({
                                      type:'success',
                                      message: msg
                                    })
                                  }
                                  that.GetStructureData()
                                })
                              }).catch(() => {

                              })

                            }
                        }}),
                        createElement('el-button',{attrs:{
                          style: 'margin: 0 10px',
                          type: 'text',
                          icon: 'delete'
                        },on:{
                            click:function() {
                                const para = { type: 0, fc: 3, ID: node.data.id}
                                that.$confirm(`确认删除 ${node.data.label}？`, '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning'
                                }).then(() => {
                                  that.PostStructure(para).then(res => {
                                    const { code, msg } = res
                                    if (code == 200) {
                                      that.$message({
                                        type: 'success',
                                        message: msg
                                      })
                                    }
                                    that.GetStructureData()
                                  })
                                }).catch(() => {})
                            }
                        }}),
                    ]),
                ]);
            }
  },
  mounted () {
    this.GetStructureData()
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
