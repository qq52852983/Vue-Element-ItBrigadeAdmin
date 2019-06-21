<template>
  <div id="app" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle @click="add()"></el-button>
            <el-button type="danger" icon="el-icon-close" circle @click="remove()"></el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData.slice((Page_Index-1)*Page_Size,Page_Index*Page_Size)" border
      @selection-change="handleSelectionChange" ref="multipleTable"
      style="width: 100%;box-sizing:border-box;margin-top:5px">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed prop="list_id" label="序号" width="50">
      </el-table-column>
      <el-table-column fixed prop="place_name_date" label="始-终-日期" width="170">
      </el-table-column>
      <el-table-column prop="Serial_number" label="批号" width="100">
      </el-table-column>
      <el-table-column prop="Date_str" label="搜索时间" width="140">
      </el-table-column>
      <el-table-column prop="Aircraft_number" label="航班型号" width="140">
      </el-table-column>
      <el-table-column prop="Spend_time.on" label="出发时间" width="80">
      </el-table-column>
      <el-table-column prop="Spend_time.on_place" label="出发点" width="140">
      </el-table-column>
      <el-table-column prop="Spend_time.end" label="到达时间" width="80">
      </el-table-column>
      <el-table-column prop="Spend_time.end_place" label="到达点" width="140">
      </el-table-column>
      <el-table-column prop="Seat_price" label="价格" width="80">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template slot-scope="item">
          <el-button @click="Edit(item)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="Delete(item)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="jz PageC">
      <el-pagination background layout="prev, pager, next" :total="tableData.length" :page-size="Page_Size"
        @current-change="Page_Change">
      </el-pagination>
    </div>
    <edit-dialog ref="EditDialog" v-on:loadding="loadding($event)"></edit-dialog>
    <add-dialog ref="AddDialog" v-on:loadding="loadding($event)"></add-dialog>
  </div>


</template>
<script>
  import {
    axios_get
  } from "@/common/axios";
  import edit_dialog from "./edit_dialog.vue";
  import add_dialog from "./add_dialog.vue";
  export default {
    components: {
      'edit-dialog': edit_dialog,
      'add-dialog': add_dialog
    },
    data() {
      return {
        loading: true,
        Page_Index: 1, //当前页数
        Page_Size: 10, //每页展示数量
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      remove() {
        if(this.multipleSelection.length==0){
            return this.$message({type:"warning",message: '至少选中一样!'});
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          let data = []
          for(let i in this.multipleSelection){
              data.push(this.multipleSelection[i]._id)
          }
          axios_get("api_Aircraft_Delete", data, (result) => {
            if (result.data.data.state == 'ok') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.Read_data();
            }
          })
        }).catch(() => {});
      },
      handleSelectionChange(val) { //点击多选后触发的事件
        this.multipleSelection = val;
      },
      add() { //点击添加按钮后的事件
        this.$refs.AddDialog.value(null);
      },
      Page_Change(index) { //当页数发生改变时，做的事情
        this.Page_Index = index;
      },
      Edit(item) { //编辑
        let Indexes = this.Page_Index * this.Page_Size - this.Page_Size + item.$index; //获取当前点击的索引
        this.$refs.EditDialog.value(this.tableData[Indexes]); //将值传入子组件，子组件接收后展示出来
      },
      Delete(item) { //删除
      let Indexes = this.Page_Index * this.Page_Size - this.Page_Size + item.$index; //获取当前点击的索引
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          let data = {
            _id: this.tableData[Indexes]._id
          };
          axios_get("api_Aircraft_Delete", data, (result) => {
            if (result.data.data.deletedCount > 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.Read_data();
            }
          })
        }).catch(() => {});

      },
      Read_data() { //读取一遍数据库数据
        this.loading = true;
        axios_get("api_Aircraft", null, (result) => {
          if (result.status == 200) {
            this.tableData = result.data.data;
          }
          for (let i in this.tableData) {
            this.tableData[i]['list_id'] = parseInt(i) + 1;
          }
          this.loading = false;
        })
      },
      loadding(val) {
        this.loading = val;
      }
    },
    created() {
      this.Read_data()
    }
  };

</script>
<style scoped>
  .jz {
    display: flex;
    justify-content: center;

  }

  .PageC {
    width: 100%
  }

</style>
