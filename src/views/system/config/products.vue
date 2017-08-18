<template lang="html">
  <div class="products_config">
    <div class="structure_config">
      <el-tree
        :data="structureData"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
      <el-button class="structure_submit" type="primary" @click="structureSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseId: 1000,
      structureData: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    renderContent (createElement, { node, data, store }) {
                var that = this;
                return createElement('span', [
                    createElement('span', node.label),
                    createElement('span', {attrs:{
                        style:"float: right; margin-right: 20px"
                    }},[
                        createElement('el-button',{attrs:{
                            type: 'text',
                            icon: 'edit'
                        },on:{
                            click:function() {
                              that.$prompt('请输入名称', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                              }).then(({ value }) => {
                                data.label = value
                              }).catch(() => {

                              })
                                // store.append({ id: that.baseId++, label: 'testtest', children: [] }, data);
                            }
                        }}),
                        createElement('el-button',{attrs:{
                            type: 'text',
                            icon: 'plus'
                        },on:{
                            click:function() {
                                store.append({ id: that.baseId++, label: 'testtest', children: [] }, data);
                            }
                        }}),
                        createElement('el-button',{attrs:{
                          type: 'text',
                          icon: 'delete'
                        },on:{
                            click:function() {
                                store.remove(data);
                            }
                        }}),
                    ]),
                ]);
            },
            structureSubmit () {
              console.log(this.structureData)
            }
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
