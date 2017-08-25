<template lang="html">
  <div class="brand_config">
    <el-button type="primary" icon="plus" @click="addBrand">新增</el-button>
    <div class="brand_list">
      <div class="brand_item" v-for="item in brands" :key="item.ID">
        <header class="brand_header">
          <span class="line_left"></span>
          <span class="head_title">{{item.Name}}</span>
          <span class="line_right"></span>
        </header>
        <el-row class="brand_content">
          <el-col class="content_item" v-for="brand in item.item" :key="brand.ID" :xs="24" :sm="12" :md="8" :lg="6">
            <el-card class="card" :body-style="{ padding: '0px' }">
              <div
                class="card_image"
                :style="`background-image: url(${brand.BrandLOGO})`"
                >
              </div>
              <div class="card_info">
                <p class="company">公司名：{{brand.AllName}}</p>
                <p class="brand">品牌名：{{brand.Name}}</p>
                <span class="btns">
                  <el-button type="text" @click="handleDelete(brand.ID)">删除</el-button>
                  <el-button type="text" @click="showEditForm(brand)">编辑</el-button>
                </span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- form dialog -->
    <el-dialog :visible.sync="formVisible" title="品牌表单" size="small">
      <el-form label-width="80px" :model="formData" :rules="rules" ref="brandForm">
        <el-form-item label="公司全称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand">
          <el-input v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="品牌类型" prop="type">
          <el-select v-model="formData.type" multiple filterable placeholder='请选择'>
            <el-option
              v-for="item in brandsType"
              :label="item.Name"
              :value="item.ID"
              :key="item.ID"
              >
            </el-option>
          </el-select>
          <!-- <el-input v-model="formData.type"></el-input> -->
        </el-form-item>
        <el-form-item label="品牌图标" prop="logo">
          <el-upload
            class="logo_uploader"
            action="/api/goods/all.php"
            :show-file-list="false"
            :auto-upload="false"
            :data="logoUploadData"
            list-type="picture-card"
            ref="brandLogoUpload"
            :on-change="changeLogoUpload"
            :on-success="logoUploadSuccess"
            >
            <img class="logo" v-if="formData.logoUrl" :src="formData.logoUrl" alt="">
            <i v-else class="el-icon-plus logo-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="brandFomrSubmit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      formVisible: false,
      loading: false,
      formData: {
        name: '',
        brand: '',
        type: [],
        logoUrl: '',
      },
      logoUploadData: {},
      subMethod: '',
      rules: {
        name: [
          { required: true, message: '请输入公司全称', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        type: [
          { required: true,type: 'array', message: '请输入品牌类型', trigger: 'change' },
        ],
      },
    }
  },
  watch: {
    editRow: function (val, oldVal) {
      // console.log(val, oldVal)
    }
  },
  computed: {
    ...mapGetters([
      'brands',
      'brandsType'
    ])
  },
  methods: {
    ...mapActions([
      'GetBrands',
      'GetBrandsType',
      'BrandSubmit',
      'DeleteBrand'
    ]),
    // 显示添加界面
    addBrand () {
      this.formData = {
        name: '',
        brand: '',
        type: [],
        logoUrl: ''
      }
      this.subMethod = 'add'
      this.formVisible = true
    },
    // logo图片选择切换
    changeLogoUpload (file, fileList) {
      this.formData.logoUrl = file.url
      fileList.length == 1 ? '' : fileList.splice(0, 1)  //保证上传列表只有1
    },
    // 新增品牌提交
    brandFomrSubmit () {
      this.$refs.brandForm.validate((valid) => {
        if (valid) {
          // submit request
          this.loading = true
          let data = Object.assign({}, this.formData)
          this.logoUploadData = {
            fc: this.subMethod == 'add' ? 5 : 13,
            allName: data.name,
            name: data.brand,
            typeID: data.type.join(';'),
          }
          data.ID ? this.logoUploadData.ID = data.ID : ''
          if (this.$refs.brandLogoUpload.uploadFiles.length != 0) {
            setTimeout(() => {
              this.$refs.brandLogoUpload.submit()
            }, 100)
          }else {
            this.BrandSubmit(this.logoUploadData).then(res => {
              const { code, msg } = res
              if (code == 200) {
                this.$message({
                  type: 'success',
                  message: msg
                })
              }
              this.loading = false
              this.formVisible = false
              this.GetBrands()
            })
          }
        } else {
          return false
        }
      })
    },
    // logo上传成功
    logoUploadSuccess (res, file, filelist) {
      const { code, msg } = res
      if (code == 200) {
        this.$message({
          type: 'success',
          message: msg
        })
      }
      this.loading = false
      this.formVisible = false
      this.GetBrands()
    },
    showEditForm (row) {
      // this.$refs.editBrandForm.resetFields()
      this.formData = {
        name: row.AllName,
        brand: row.Name,
        type: row.TypeID,
        logoUrl: row.BrandLOGO == "http://pic.ehometd.com/zanwu/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87-01-01.jpg" ?
          '' : row.BrandLOGO,
        ID: row.ID
      }
      this.subMethod = 'edit'
      this.formVisible = true

    },
    handleDelete (id) {
      this.$confirm('是否删除此品牌？', '提示', {
        confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(() => {
        const para = { fc: 8, ID: id }
        this.DeleteBrand(para).then(res => {
          const { code, msg } = res
          if (code == 200) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.GetBrands()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  },
  mounted () {
    this.GetBrands()
    this.GetBrandsType()
  }
}
</script>

<style lang="scss">
  .brand_config {
    .brand_list {
      .brand_item {
        .brand_header {
          display: flex;
          height: 30px;
          margin: 10px 0;
          .line_left,.line_right {
            flex: 1;
            height: 0;
            border: 1px solid #d1dbe5;
            margin-top: 14px;
          }
          .head_title {
            flex: 0 0 60px;
            text-align: center;
            font-size: 20px;
          }
        }
        .brand_content {
          .content_item {
            margin: 10px 0;
            .card {
              width: 90%;
              margin: 0 auto;
              .card_image {
                border-bottom: 1px solid #ccc;
                display: inline-block;
                width: 100%;
                height: 0;
                padding-bottom: 100%;
                background-repeat: no-repeat;
                background-position: 50%;
                background-size: 100%;
                cursor: pointer;
                transition: all .3s ease-in-out;
              }
              .card_info {
                padding: 5px 10px;
                .company, .brand {
                  font-size: 14px;
                }
                .btns {
                  display: block;
                  overflow: hidden;
                  button {
                    float: right;
                    margin: 0 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .logo_uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: inline-block;
      .logo-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .logo {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .logo_uploader:hover {
       border-color: #20a0ff;
    }
  }
</style>
