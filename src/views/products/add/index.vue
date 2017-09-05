<template lang="html">
  <div class="add_products" v-loading.fullscreen.lock="fullscreenLoading">
    <header class="model_search">
      <el-form :inline="true" :model="search" label-width="40px" label-positon="left">
        <el-form-item label="型号">
          <el-input
            placeholder="请输入型号"
            v-model="search.model"
            icon="search"
            @keyup.enter.native="modelSearch"
            :on-icon-click="modelSearch"
            :autofocus="true"
            >
          </el-input>
        </el-form-item>
        <el-form-item v-show="noProduct">
          <i class="el-icon-circle-check success_icon"></i><span>无重复型号</span>
        </el-form-item>
      </el-form>
    </header>
    <div class="content" v-show="searched">
      <v-form :model="search.model" v-show="productStep>=0 || !noProduct"></v-form>
      <div v-show="productStep==1 || !noProduct">
        <v-table :model="search.model"></v-table>
        <v-swiper :model="search.model"></v-swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from './form'
import Table from './table'
import Swiper from './swiper'
export default {
  data () {
    return {
      search: {
        model: ''
      },
      searched: false,
      product: {
        tags: [],
        sample: '0',
        date: ''
      },
    }
  },
  computed: {
    ...mapGetters([
      'productData',
      'noProduct',
      'productStep',
      'fullscreenLoading'
    ])
  },
  components: {
    'v-form': Form,
    'v-table': Table,
    'v-swiper': Swiper
  },
  methods: {
    ...mapActions([
      'GetProductData',
      'SetProductStep'
    ]),
    modelSearch () {
      this.$store.commit('SET_LOADING')
      this.SetProductStep(0)
      setTimeout(() => {
        this.GetProductData(this.search).then(res => {
          const { code, msg, body } = res.data
          if (code == 200) {
            this.$store.commit('SET_PRODUCT_DATA', { data: body, visible: false })
            this.searched = true
          }else if (code == 199) {
            const formData = {
              ET: '',
              exhibit: '0',
              state: '0',
              style: '',
              brand: '',
              pic: [],
              shop: [],
              tag: [],
              type: []
            }
            this.$store.commit('SET_PRODUCT_DATA', { data: formData, visible: true })
            this.searched = true
          }else {
            this.$message({
              type: 'error',
              message: '查询失败'
            })
          }
          this.$store.commit('SET_LOADING')
        })
      }, 1000)
    },
  },
  mounted () {
    const data = {
      data: {
        ET: '',
        exhibit: '0',
        state: '0',
        style: '',
        brand: '',
        pic: [],
        shop: [],
        tag: [],
        type: []
      },
      visible: false
    }
    this.$store.commit('SET_PRODUCT_DATA', data)
  }
}
</script>

<style lang="scss">
  .add_products {
    padding: 10px 15px;
    .model_search {
      .success_icon {
        color: #13CE66;
        margin-right: 5px;
      }
    }
  }
</style>
