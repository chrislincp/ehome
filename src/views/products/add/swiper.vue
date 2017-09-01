<template lang="html">
  <div class="product_swiper">
    <header class="swiper_head">
      <h1>轮播图</h1>
    </header>
    <div class="content">
      <el-card class="swiper_list" :body-style="{padding: '5px'}">
        <transition-group name="el-zoom-in-center">
          <div v-for="(item,index) in productData.pic" class="image_wrap" :key="item.ID">
            <div class="image_item" :style="`background-image: url(${item.url})`"></div>
            <i class="close_file el-icon-circle-close" @click="deleteSwiper(index, item)"></i>
            <!-- <img :src="item.url" alt=""> -->
          </div>
        </transition-group>
      </el-card>
    </div>
    <footer class="swiper_foot">
      <el-button type="primary" icon="upload" @click="showUploadSwiper">上传图片</el-button>
      <el-button type="primary" icon="delete" @click="clearAll">清除所有</el-button>
    </footer>


    <!-- 图片上传 -->
    <el-dialog :visible.sync="uploadVisible" size="large">
      <el-upload
        class="swiper_upload"
        action="/api/goods/all.php"
        list-type="picture-card"
        :multiple="false"
        :data="swiperUploadData"
        :on-change="productSwiper"
        :auto-upload="false"
        :on-progress="uploadProgress"
        :on-success="swiperUploadSuccess"
        ref="productSwiperUpload"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer">
        <el-button @click="uploadVisible=false">取消</el-button>
        <el-button type="primary" @click="uploadSwiperGroup" :loading="swiperLoading">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      uploadVisible: false,
      swiperLoading: false,
      swiperUploadData: {},
      fileIndex: 0,
    }
  },
  props: [
    'model'
  ],
  computed: {
    ...mapGetters([
      'productData'
    ])
  },
  methods: {
    ...mapActions([
      'GetProductData',
      'ProductFormPost'
    ]),
    showUploadSwiper () {
      this.uploadVisible = true
    },
    productSwiper (file, fileList) {
      // console.log(file, fileList)
    },
    uploadProgress (event, file, fileList) {
      // console.log(event, file, fileList)
    },
    deleteSwiper (index, item) {
      this.$confirm('确认删除该图片？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.productData.pic.splice(index, 1)
        let para = { fc: 24, ID: item.ID }
        this.ProductFormPost(para).then(res => {
          const { code, msg } = res
          if (code == 200) {
            this.$message({
              type: 'success',
              message: msg
            })
          }else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
      }).catch(() => {})
    },
    clearAll () {
      if (this.productData.pic.length == 0) {
        this.$alert('没有可删除的图片！', '提示', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        })
      }else {
        this.$confirm('确认清除所有图片？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.productData.pic = []
          let para = { fc: 22, ID: this.productData.ID }
          this.ProductFormPost(para).then(res => {
            const { code, msg } = res
            if (code == 200) {
              this.$message({
                type: 'success',
                message: msg
              })
            }else {
              this.$message({
                type: 'warning',
                message: msg
              })
            }
          })
        }).catch(() => {})
      }
    },
    uploadSwiperGroup () {
      if (this.$refs.productSwiperUpload.uploadFiles == 0) {
        this.$alert('请选择上传的图片！', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
      }else {
        this.swiperLoading = true
        this.swiperUploadData = {
          fc: 23,
          userID: 42,
          goodsID: this.productData.ID
        }
        setTimeout(() => {
          this.$refs.productSwiperUpload.submit()
        }, 100)
      }
    },
    swiperUploadSuccess (res, file, fileList) {
      this.fileIndex += 1
      if (this.fileIndex == fileList.length) {
        const { code, msg } = res
        if (code == 200) {
          let model = { model: this.model }
          this.GetProductData(model).then(() => {
            this.$message({
              type: 'success',
              message: msg
            })
            this.$refs.productSwiperUpload.clearFiles()
            this.swiperLoading = false
            this.uploadVisible = false
          })
        }
        this.fileIndex = 0
      }

    }
  },
}
</script>

<style lang="scss">
  .product_swiper {
    .swiper_head {
      h1 {
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
      }
    }
    .content {
      .swiper_list {
        width: 100%;
        height: 148px;
        // overflow: hidden;
        // overflow-x: auto;
        // margin: 10px 0;
        .image_wrap {
          display: inline-block;
          // white-space:nowrap;
          width: 15%;
          // height: 0;
          // padding-bottom: 100%;
          margin: 0.7%;
          // padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          position: relative;
          .image_item {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            cursor: pointer;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
          }
          .close_file {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 20px;
            color: #FF4949;
            cursor: pointer;
          }
        }
      }
    }
    .swiper_foot {
      margin: 10px 0;
    }
  }
</style>
