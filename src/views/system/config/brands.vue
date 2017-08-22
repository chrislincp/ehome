<template lang="html">
  <div class="brand_config">
    <el-button type="primary" icon="plus" @click="addBrand">新增</el-button>
    <div class="brand_list">

    </div>


    <!-- dialog -->

    <!-- add dialog -->
    <el-dialog :visible.sync="addVisible" title="新增品牌" size="small">
      <el-form label-width="80px" :model="formData" :rules="rules" ref="brandForm">
        <el-form-item label="公司全称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand">
          <el-input v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="品牌类型" prop="type">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="品牌图标">
          <el-upload
            class="logo_uploader"
            action="test.php"
            :show-file-list="true"
            list-type="picture-card"
            :auto-upload="false"
            ref="brandLogoUpload"
            >
            <i class="el-icon-plus logo-uploader-icon" v-show=""></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit dialog -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      brandList: [],  //  替换成state数据
      addVisible: false,
      formData: {
        name: '',
        brand: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入公司全称', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入品牌类型', trigger: 'blur' },
        ]
      },
      editVisible: false,
      editRow: {}
    }
  },
  methods: {
    addBrand () {
      this.formData = {
        name: '',
        brand: '',
        type: ''
      }
      this.addVisible = true
    },
    handleAdd () {
      this.$refs.brandForm.validate((valid) => {
        if (valid) {
          // submit request
          this.addVisible = false

        } else {
          return false
        }
      })
    },
    showEditForm (row) {
      this.editRow = row
      this.editVisible = true
    },
    handleEdit () {
      this.$refs.brandForm.validate((valid) => {
        if (valid) {
          // 伪代码
          let [list,editRow] = [this.brandList, this.editRow]
          for (let i in list) {
            list[i].name == editRow.name ? list[i] = editRow : ''

          }
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.editVisible = false
          // edit brand code...


        }else {
          return false
        }
      })
    },
    handleDelete (row) {
      this.$confirm('是否删除此商家？', '提示', {
        confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
        // 伪代码
        let list = this.brandList
        for (let i in list) {
          list[i].name == row.name ? list.splice(i,1) : ''
        }

        // delete code ...


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  },
  mounted () {
    console.log(this.$refs.brandLogoUpload)
  }
}
</script>

<style lang="scss">
  .brand_config {
    .logo_uploader {

      .logo-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
    }
    .logo_uploader:hover {
       border-color: #20a0ff;
    }
  }
</style>
