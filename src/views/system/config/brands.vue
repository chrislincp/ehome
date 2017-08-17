<template lang="html">
  <div class="brand_config">
    <div class="brand_addForm">
      <el-card class="addform_wrap">
        <el-form :model="formData" :rules="rules" ref="brandForm" :inline="true">
          <el-form-item label="logo上传">
            <el-upload
              class="logo_upload"
              :show-file-list="false"
              :auto-upload="false"
              ref="brandLogoUpload"
              action="http://192.168.0.184/e-api/"
              :on-change="selectImage"
              :before-upload="beforeLogoUpload"
              >
              <img v-if="logoUrl" :src="logoUrl" class="logo_image">
              <i v-else class="el-icon-plus logo_upload_icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="name" label="名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="联系方式">
            <el-input v-model="formData.tel"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input v-model="formData.address" @keyup.enter.native="handleAdd"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleAdd">添加品牌</el-button>
        </el-form>
      </el-card>
    </div>
    <div class="brand_list">
      <el-table :data="brandList">
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button-group>
              <el-button type="primary" icon="edit" @click="showEditForm(scope.row)"></el-button>
              <el-button type="primary" icon="delete" @click="handleDelete(scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- dialog -->

    <!-- edit dialog -->

    <el-dialog :visible.sync="editVisible" title="编辑" size="small">
      <el-form label-width="80px" :model="editRow" :rules="rules" ref="brandForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="联系方式">
          <el-input v-model="editRow.tel"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="editRow.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      brandList: [],  //  替换成state数据
      logoUrl: '',
      formData: {
        tel: '',
        name: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ]
      },
      editVisible: false,
      editRow: {}
    }
  },
  methods: {
    selectImage (file, fileList) {
      this.logoUrl = URL.createObjectURL(file.raw)
      console.log(fileList)
    },
    beforeLogoUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAdd () {
      this.$refs.brandForm.validate((valid) => {
        if (valid) {
          if (this.logoUrl) {
            this.$refs.brandLogoUpload.submit()
          }
          // 伪代码
          this.brandList.push(this.formData)
          this.formData = {
            logo: '',
            tel: '',
            name: '',
            address: ''
          }
          this.logoUrl = ''
          // add brand code...



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
    console.log(this.$refs)
  }
}
</script>

<style lang="scss">
  .brand_config {
    .brand_addForm {
      .addform_wrap {
        margin-bottom: 10px;
        .logo_upload {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &.el-upload:hover {
               border-color: #20a0ff;
            }
            .logo_image {
              width: 178px;
              height: 178px;
              display: block;
            }
            .logo_upload_icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
