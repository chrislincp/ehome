<template lang="html">
  <div class="product_table">
    <header class="table_head">
      <h1 style="color: #324157">列表</h1>
    </header>
    <div class="table_content">
      <el-table :data="productData.shop">
        <el-table-column align="center" label="图片" prop="thumb">
          <template scope="scope">
            <img class="thumb_img" :src="scope.row.thumb" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" prop=""></el-table-column>
        <el-table-column align="center" label="尺寸" prop="size"></el-table-column>
        <el-table-column align="center" label="材质" prop="material"></el-table-column>
        <el-table-column align="center" label="库存" prop="inventory"></el-table-column>
        <el-table-column align="center" label="进价" prop="bp"></el-table-column>
        <el-table-column align="center" label="标价" min-width="100" prop="price"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template scope="scope">
            <el-button-group>
              <el-button type="primary" icon="edit" @click="formDataEdit(scope.row, 'formVisible')"></el-button>
              <el-button type="primary" icon="more" @click="formDataEdit(scope.row, 'formMore')"></el-button>
              <el-button type="primary" icon="delete" :disabled="scope.row.ID == productData.ID" @click="deleteFormData(scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer class="table_foot">
      <el-button type="primary" @click="showFormDialog" class="add_button">新增序号</el-button>
    </footer>


    <!-- 新增序号dialog -->

    <el-dialog :visible.sync="formVisible" size="small">
      <el-form :model="formData" label-width="80px" :rules="productFormRule" ref="productData">
        <el-form-item label="图片">
          <el-upload
            class="thumb_upload"
            action="/api/goods/all.php"
            list-type="picture-card"
            ref="productImageUpload"
            :show-file-list="false"
            :auto-upload="false"
            :data="formData"
            :on-change="changeLogoUpload"
            :on-success="thumbUploadSuccess"
            >
            <img class="thumb" v-if="formData.thumb" :src="formData.thumb" alt="">
            <i v-else class="el-icon-plus thumb-upload-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="formData.size"></el-input>
        </el-form-item>
        <el-form-item label="材质" prop="material">
          <el-input v-model="formData.material"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="formData.inventory"></el-input-number>
        </el-form-item>
        <el-form-item label="进价">
          <el-input-number v-model="formData.bp"></el-input-number>
        </el-form-item>
        <el-form-item label="标价">
          <el-input-number v-model="formData.price"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="formVisible=false">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="formLoading">确认</el-button>
      </span>
    </el-dialog>

    <!-- 更多 -->
    <el-dialog :visible.sync="formMore" size="tiny">
      <el-form :model="formData" label-width="80px" :rules="productFormRule" ref="productData">
        <el-form-item label="色系" class="color_form">
          <el-color-picker v-model="formData.color" show-alpha class="color_picker"></el-color-picker>
          <el-input v-model="formData.color" class="color_input"></el-input>
        </el-form-item>
        <el-form-item label="朝向">
          <el-select v-model="formData.orientation">
            <el-option label="向左" value="0"></el-option>
            <el-option label="向右" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="备注"
            v-model="formData.describe"
          >
        </el-input>
        </el-form-item>
        <el-form-item label="可定制">
          <el-checkbox v-model="formData.custom"></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="formMore=false">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="formLoading">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      formVisible: false,
      formMore: false,
      formLoading: false,
      subMethod: '',
      formShow: '',
      formData: {
        thumb: '',
        size: '',
        material: '',
        inventory: 0,
        bp: 0,
        price: 0
      },
      productFormRule: {
        size: [
            { required: true, message: '请输入尺寸', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '请输入材质', trigger: 'blur' }
        ],
      }
    }
  },
  props: [
    'model'
  ],
  computed: {
    ...mapGetters([
      'productData',
    ])
  },
  methods: {
    ...mapActions([
      'GetProductData',
      'ProductFormPost'
    ]),
    showFormDialog () {
      this.formData = {
        ID: this.productData.ID,
        thumb: '',
        size: '',
        material: '',
        inventory: 0,
        bp: 0,
        price: 0,
        custom: '0'
      }
      this.subMethod = 'add'
      this.formShow = 'formVisible'
      this[this.formShow] = true
    },
    formDataEdit (row, visible) {
      this.subMethod = 'edit'
      this.formData = Object.assign({}, row)
      this.formData.custom == 1 ? this.formData.custom = true : this.formData.custom = false
      this.formData.thumb == "http://pic.ehometd.com/zanwu/暂无图片-01-01.jpg" ? this.formData.thumb = '' : ''
      this.formShow = visible
      this[this.formShow] = true
    },
    changeLogoUpload (file, fileList) {
      this.formData.thumb = file.url
      fileList.length == 1 ? '' : fileList.splice(0, 1)
    },
    thumbUploadSuccess (res, file, filelist) {
      const { code, msg } = res
      if (code == 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        let model = { model: this.model }
        this.GetProductData(model).then(() => {
          this[this.formShow] = false
          this.formLoading = false
        })
      }
    },
    formSubmit () {
      this.$refs.productData.validate((valid) => {
        if (valid) {
          this.formLoading = true
          let row = this.formData
          row.custom ? row.custom = '1' : row.custom = '0'
          this.subMethod == 'edit' ? row.fc = 19 : row.fc = 21
          if (this.$refs.productImageUpload && this.$refs.productImageUpload.uploadFiles.length != 0) {
            setTimeout(() => {
              this.$refs.productImageUpload.submit()
            }, 100)
          }else {
            this.ProductFormPost(row).then(res => {
              const { code, msg } = res
              if (code == 200) {
                this.$message({
                  type: 'success',
                  message: msg
                })
                let model = { model: this.model }
                this.GetProductData(model).then(() => {
                  this[this.formShow] = false
                  this.formLoading = false
                })
              }
            })
          }
        }
      })

    },
    deleteFormData (row) {
      this.$confirm('确认删除该产品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let para = { fc: 18, ID: row.ID }
        this.ProductFormPost(para).then(res => {
          const { code, msg } = res
          if (code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            let model = { model: this.model }
            this.GetProductData(model)
          }
        })
      }).catch(() => {

      })
    },
    nextStep () {
      this.$store.dispatch('SetProductStep', 2)
    }
  }
}
</script>

<style lang="scss">
  .product_table {
    .table_head {
      h1 {
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
      }
    }
    .table_content {
      .thumb_img {
        width: 80px;
      }
    }
    .table_foot {
      margin: 10px 0;
      overflow: hidden;
      .add_button {
        float: left;
      }
      .next_button {
        float: right;
      }
    }
    .thumb_upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: inline-block;
      .thumb-upload-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .thumb {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .thumb_upload:hover {
      border-color: #20a0ff;
    }
    .color_form {
      .el-form-item__content {
        display: flex;
        .color_picker {
          flex: 0 0 60px;
        }
        .color_input {
          flex: 1;
        }
      }
    }
  }
</style>
