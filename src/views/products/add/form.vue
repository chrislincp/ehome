<template lang="html">
  <div class="product_form">
    <el-form label-width="60px">
      <el-form-item label="类型">
        <el-cascader
          v-model="productData.type"
          :options="productsFilters.type"
          :props="cascaderProps"
          change-on-select
          >
        </el-cascader>
      </el-form-item>
      <el-form-item label="详情">
        <el-select filterable v-model="productData.brand">
          <el-option
            v-for="item in productsFilters.brand"
            :key="item.ID"
            :label="item.Name"
            :value="item.ID"
            >
          </el-option>
        </el-select>
        <el-select filterable v-model="productData.style">
          <el-option
            v-for="item in productsFilters.style"
            :key="item.ID"
            :label="item.Name"
            :value="item.ID"
            >
          </el-option>
        </el-select>
        <el-select v-model="productData.state">
          <el-option label="下架" value="0"></el-option>
          <el-option label="在售" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          multiple
          filterable
          allow-create
          v-model="productData.tag"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="出样">
        <el-select v-model="productData.exhibit">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
        <el-date-picker
          v-show="productData.exhibit==1"
          v-model="productData.ET"
          type="date"
          placeholder="选择日期"
          >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <footer class="product_form_foot">
      <el-button class="save_button" type="primary" icon="upload" @click="saveProductForm">保存</el-button>
    </footer>
  </div>
</template>

<script>
import date from '@/utils/date'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      cascaderProps: {
        value: 'id'
      }
    }
  },
  props: [
    'model'
  ],
  computed: {
    ...mapGetters([
      'productsFilters',
      'productData',
      'noProduct',
    ])
  },
  methods: {
    ...mapActions([
      'GetProductsFilter',
      'GetProductData',
      'SetProductStep',
      'ProductFormPost'
    ]),
    saveProductForm () {
      let para = Object.assign({}, this.productData)
      para.ET = (!para.ET || para.ET == '') ? '' : date.formatDate.format(new Date(para.ET), 'yyyy-MM-dd');
      this.$store.commit('SET_LOADING')
      if (this.noProduct) {
        [para.fc, para.userID, para.model] = [17, 42, this.model]  //函数和用户id

      }else {
        para.fc = 20

      }
      setTimeout(() => {
        this.ProductFormPost(para).then(res => {
          let model = { model: this.model }
          this.GetProductData(model).then(() => {
            this.$store.commit('SET_LOADING')
          })
        })
      }, 1000)
    }
  },
  mounted () {
    this.GetProductsFilter().then(() => {

    })
  }
}
</script>

<style lang="scss">
  .product_form_foot {
    overflow: hidden;
    .save_button {
      float: right;
    }
  }

</style>
