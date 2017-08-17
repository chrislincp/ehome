<template lang="html">
  <div class="permission_config">
    <el-form label-position="top">
      <el-form-item v-for="item in permission" :label="item.title" :key="item.title">
        <el-tooltip
          v-for="tag in item.tags"
          :content="tag.value"
          :key="tag.value"
          >
          <el-tag
            class="tag"
            :key="tag.value"
            :closable="true"
             @close="handleDelete(tag)"
            >
            {{tag.label}}
          </el-tag>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      permission: [
        {
          title: '方案',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        },
        {
          title: '模型与产品',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' },
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' },
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' },
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' },
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        },
        {
          title: '场景任务管理',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        },
        {
          title: '销售表单管理',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        },
        {
          title: '人员管理',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        },
        {
          title: 'Root',
          tags: [
            { label: '方案上传', value: 'f01' },
            { label: '可视修改', value: 'f02' },
            { label: '方案删除', value: 'f44' },
            { label: 'IADP场景编辑', value: 'f03' }
          ]
        }
      ]
    }
  },
  methods: {
    handleDelete (tag) {
      console.log(tag)

      // delete tag code...
    }
  }
}
</script>

<style lang="scss">
  .permission_config {
    .tag {
      margin: 0 5px;
      cursor: pointer;
    }
  }
</style>
