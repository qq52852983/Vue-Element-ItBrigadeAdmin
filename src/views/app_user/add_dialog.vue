<template>
  <div id="app">
    <el-dialog title="新增" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="90px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.User_name" maxlength="12" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.Nickname" maxlength="12" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.Gender" label="男"></el-radio>
          <el-radio v-model="form.Gender" label="女"></el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.Birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.Cell" style="width:calc(100% - 10px)" maxlength="11"
            onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-cascader :options="options" v-model="form.Location" @change="handleChange" :separator="' '"></el-cascader>
        </el-form-item>
        <el-form-item label="爱好">
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
        </el-form-item>
        <el-form-item label="头像base64">
          <el-input v-model="form.Head_Base64" type="textarea" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.Remarks" type="textarea" style="width:calc(100% - 10px)"></el-input>
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
  import {
    axios_get
  } from "@/common/axios";
  import options from '@/common/country-level2-data.js'
  export default {
    data() {
      return {
        labelPosition: 'left',
        dialogFormVisible: false,
        form: {
          User_name: '',
          Gender: '',
          Cell: '',
          Location: [],
          Head_Base64: '',
          Remarks: '',
          Birthday:'',
          Nickname:''
        },
        options: options, //存放城市数据
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      value(val) {
        Object.keys(this.form).filter((x) => {
          this.form[x] = ''
        })
        this.dialogFormVisible = true;
      },
      sub() {
        let is_null = true;
        Object.keys(this.form).filter((x) => {
          if (this.form[x] == '' || this.dynamicTags.length == 0 || this.form.Location.length == 0) {
            is_null = false;
          }
        })
        if (!is_null) {
          return this.$message({
            type: "warning",
            message: '请将信息填全!'
          });
        }
        this.form.Location = this.form.Location[0] + ',' + this.form.Location[1]
        this.form.Birthday=new Date(this.form.Birthday).toLocaleDateString()
        this.form['Hobby'] = []
        this.dynamicTags.forEach((e) => {
          this.form['Hobby'].push(e)
        })
        this.dialogFormVisible = false;
        this.$emit('loadding', true)
        axios_get("api_User_Insert", this.form, (result) => {
          console.log(result)
          if (result.data.data.result.n > 0) {
            this.$parent.Read_data();
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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

  .el-form-item {
    margin-bottom: 7px
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
