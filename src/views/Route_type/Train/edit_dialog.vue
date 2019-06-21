<template>
  <div id="app">
    <el-dialog title="编辑" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="始-终-日期">
          <el-input v-model="form.place_name_date" disabled maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.Serial_number" disabled maxlength="8" style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\w]+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间">
          <el-date-picker v-model="form.Date_str" disabled type="datetime" style="width:calc(100% - 10px)" placeholder="选择搜索时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="列车型号">
          <el-input v-model="form.fo_number" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')"
            maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-time-picker v-model="form.Spend_time.on" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="出发点">
          <el-input v-model="form.Spend_time.on_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="到达时间">
          <el-time-picker v-model="form.Spend_time.end" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="到达点">
          <el-input v-model="form.Spend_time.end_place" style="width:calc(100% - 10px)" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="耗时">
          <el-input v-model="form.Spend_time.Spend_time" maxlength="7" style="width:calc(100% - 10px)">
          </el-input>
        </el-form-item>
        <el-form-item label="座/价">
          <el-input v-model="form.Sert_price"  style="width:calc(100% - 10px)" placeholder="请以/与,分开，例（一等座/4444.00,二等座/2222.00）"
            >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {axios_get} from "@/common/axios";
  export default {
    data() {
      return {
        labelPosition:'left',
        dialogFormVisible: false,
        form: {
          place_name_date: '',
          Date_str: '',
          Serial_number: '',
          fo_number: '',
          Spend_time: {
            on: '',
            on_place: '',
            end: '',
            end_place: '',
            Spend_time: ''
          },
          Seat: [{
              Seat_name: '',
              Seat_price: ''
            }
          ],
          Sert_price:''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      value (val) {
        //其实可以用this.form=val来代替以下的傻瓜式赋值……可是这样会有神之BUG
        this.form.place_name_date=val.place_name_date
        this.form.Date_str=new Date(val.Date_str)
        this.form.Serial_number=val.Serial_number
        this.form.fo_number=val.fo_number
        this.form.Spend_time.on=new Date('2000 '+val.Spend_time.on)
        this.form.Spend_time.on_place=val.Spend_time.on_place
        this.form.Spend_time.end=new Date('2000 '+val.Spend_time.end)
        this.form.Spend_time.end_place=val.Spend_time.end_place
        this.form.Spend_time.Spend_time=val.Spend_time.Spend_time
        this.form.Sert_price=val.Sert_price
        this.form._id=val._id
        this.dialogFormVisible = true;
      },
      sub(){
        let is_null=true;
        Object.keys(this.form).filter((x)=>{
          if(this.form[x].length<1){
              is_null=false;
          }
        })
        if(!is_null){ return this.$message({type:"warning",message: '请将信息填全!'});}
        
        let Date_strDate = new Date(this.form.Date_str)
        let endDate = new Date(this.form.Spend_time.end)
        let onDate = new Date(this.form.Spend_time.on)
        this.form.Spend_time.end = endDate.getHours().toString().padStart(2,'0') + ":" + endDate.getMinutes().toString().padStart(2,'0');
        this.form.Spend_time.on = onDate.getHours().toString().padStart(2,'0') + ":" + onDate.getMinutes().toString().padStart(2,'0');
        this.form.Date_str = Date_strDate.toLocaleDateString().replace(/\//g, '-') + " " + Date_strDate.getHours() +
          ':' + Date_strDate.getMinutes() + ":" + Date_strDate.getSeconds();
        let sert_ary=[];
        let Sert_price_ary=this.form.Sert_price.split(',')

        for(let i in Sert_price_ary){
          sert_ary.push({
            Seat_name:Sert_price_ary[i].split('/')[0],
            Seat_price:Sert_price_ary[i].split('/')[1],
          })
        }
        this.form.Seat=sert_ary;
        delete this.form.Sert_price;
        this.dialogFormVisible = false;
        this.$emit('loadding',true)
        axios_get("api_Train_Updata", this.form, (result) => {
          console.log(result)
            if(result.data.data.n>0){
              this.$parent.Read_data();
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }
        })
      }
    },
    mounted: function () {}
  }

</script>

<style scoped>
  .test_1 {
    width: 500px;
    position: absolute;
    height: 500px;
    top: 50px;
    left: 50%;
    background: pink
  }
  .el-form-item{
    margin-bottom: 7px
  }
</style>
