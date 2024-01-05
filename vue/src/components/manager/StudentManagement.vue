<template>
  <div>
    <div class="topTool">
      <el-input v-model="searchInput" placeholder="搜索" @input="handleSearch" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加学生信息</el-button>
      <el-button type="danger" :icon="Delete" @click="handleDelList" v-if="multipleSelection.length>0">删除选中数据</el-button>
    </div>

    <!--el-table数据表格组件-->
    <el-table
          :data="data"
          :header-cell-style="{ background: '#f6f9fa'}"
          @sort-change="handleSortChange"
          empty-text="暂无数据"
          @selection-change="handleSelectionChange"
          border
      >
        <!--el-table-column列-->
        <el-table-column type="selection" width="40px"/>
        <el-table-column prop="sid" label="学号" width="100px" align="center" header-align="center" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="100px" align="center" header-align="center" sortable></el-table-column>
        <el-table-column prop="tel" label="联系方式" width="150px" align="center" header-align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100px" align="center" header-align="center"></el-table-column>
        <el-table-column prop="date" label="入学年份" width="150px" align="center" header-align="center" sortable></el-table-column>
        <el-table-column prop="did" label="宿舍号" width="100px" align="center" header-align="center" sortable></el-table-column>
<!--        <el-table-column prop="bed" label="床位" width="100px" align="center" header-align="center"></el-table-column>-->
        <el-table-column prop="college" label="学院" width="300px" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" min-width="280px" align="center" header-align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="Edit"  @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    <!--分页组件-->
    <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
    />
    <!--弹窗组件-->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" style="width:600px">
      <el-form :model="tableform">
        <el-form-item label="学号" :label-width="200">
          <el-input v-model="tableform.sid" autocomplete="off" disabled/>
        </el-form-item>
        <el-form-item label="姓名" :label-width="200">
          <el-input v-model="tableform.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="200">
          <el-input v-model="tableform.tel" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="200">
          <el-radio-group v-model="tableform.sex">
            <el-radio label='男' >男</el-radio>
            <el-radio label='女'>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入学年份" :label-width="200" >
          <el-date-picker
              v-model="tableform.date"
              type="year"
              placeholder="选择年份"
              @change="getSid(tableform.date)"
              v-if="dialogType === 'add'"
          />
          <el-date-picker
              v-model="tableform.date"
              type="year"
              placeholder="选择年份"
              @change="getSid(tableform.date)"
              v-if="dialogType === 'edit'"
              disabled
          />
        </el-form-item>
        <el-form-item label="所属学院" :label-width="200">
          <el-input v-model="tableform.college" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        确定
      </el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
//导入图标组件，虽已全局导入所有图标，但绑定图标，还需单独导入
import { Plus,Delete,Edit,Search } from '@element-plus/icons-vue'
//定义用户信息数据
import axios from 'axios'
import {ref, onMounted, computed} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

const data = ref([])
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);
const searchInput = ref('')//初始化搜索框的值

let did=ref("")
let bed=ref("")

const year = document.getElementById("year")

onMounted(() => {
  getData()
})

const getSid=(year)=>{
  if(dialogType.value === 'add'){
    let currentYear = String(year).split(" ")[3]
    axios.get(`http://localhost:8080/generateSid/${currentYear}`).then(response=>{
      console.log(response.data)
      tableform.value.sid = response.data
    }).catch(error=>{
      console.log(error)
    })
  }
}

//获取当前页数据
const getData = () => {
  axios.get('http://localhost:8080/student/findByPage', {
    params: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
  })
      .then(response => {
        data.value = response.data.records;
        total.value = response.data.total;
      })
      .catch(error => {
        console.error(error);
      });
};

const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  data.value = data.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}
//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  if(searchInput.value){
    handleSearch(searchInput.value)
  }else{
    getData();
  }
};

//按姓名搜索处理方法
const handleSearch = (keyword) => {
  if(keyword.length>0){
    axios.get(`http://localhost:8080/studentByKeyword?keyword=${keyword}&pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(response=>{
      data.value = response.data.records;
      total.value = response.data.total;
    }).catch(error=>{
      console.error(error)
    })
  }else {
    getData()
  }
}

//处理弹窗确认按钮点击事件
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableform = ref({})//弹窗表单数据
const dialogType = ref('add')//初始化弹出框的类型为增加弹窗

//设置弹窗的标题
const dialogTitle = computed(() => {
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})

//处理增加按钮点击事件
const handleAdd = () => {
  dialogFormVisible.value = true
  dialogType.value = 'add'
  tableform.value = {sex: '男'}//清空表单数据
}

// 处理编辑按钮点击事件
function handleEdit(row) {
  dialogFormVisible.value = true
  tableform.value = {...row}
  dialogType.value = 'edit'
  did.value = row.did
  bed.value = row.bed
}

const dialogOk = () => {
  dialogFormVisible.value = false
  if (dialogType.value === 'add') {
    const newUser = {
      ...tableform.value,
      state: 0,
      did: "00000001",
      bed: "",
      date: String(tableform.value.date).split(" ")[3]
    }
    console.log(newUser)
    axios.post('http://localhost:8080/student', newUser)
        .then(response => {
          ElMessage({type: 'success',message: '添加成功!',})
          getData(); // 在添加数据后调用获取数据的方法
        })
        .catch(error => {
          console.log(error);
        });

    const user = {
      uid:tableform.value.sid,
      passwd:"123",
      authority:1,
    }
    axios.post(`http://localhost:8080/user`,user).then(response =>{
      console.log("asdadadadd")
    }).catch(error=>{
      console.log(error)
    })
  }else {

    const sid = tableform.value.sid;
    const updatedUser = {
      ...tableform.value,
      state : 1,
      did: did.value,
      bed: bed.value,
      date: String(tableform.value.date).split(" ")[3]
    };
    axios.put(`http://localhost:8080/student/${sid}`, updatedUser)
        .then(response => {
          // 处理成功响应
          ElMessage({type: 'success',message: '修改成功!',})
          getData();
        })
        .catch(error => {
          // 处理错误
          console.error('用户更新失败');
          console.error(error);
        });
  }
}

//删除行数据
const delrow = (row) => {
  const sid = row.sid;
  axios.delete(`http://localhost:8080/student/${sid}`)
      .then(response => {
        // 处理删除成功后的逻辑，例如重新加载数据
        getData();
      })
      .catch(error => {
        console.error(error);
      });
};
// 处理删除按钮点击事件
const handleDelete=(row)=> {
  ElMessageBox.confirm(
      '您确定要删除姓名为【' + row.name + '】的数据吗?',
      '危险操作',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    delrow(row)
    ElMessage({
          type: 'success',
          message: '完成删除！',
    })
  }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除!',
        })
      })
}
// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  console.log(multipleSelection.value)
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item.sid) // 将选中的每一行数据存入multipleSelection数组中
  })
}
// 删除多条数据
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const sids = multipleSelection.value;
    console.log(sids)
    console.log(typeof sids)
    console.log(typeof [])
    axios.delete('http://localhost:8080/students', {data:sids})
        .then(response => {
          getData();
          ElMessage({ type: 'success', message: '完成批量删除！' });
        })
        .catch(error => {
          console.error(error);
          ElMessage({ type: 'error', message: '删除失败！' });
        });
  }).catch(() => {
    ElMessage({ type: 'info', message: '取消删除!' });
  });
}


</script>

<style scoped>
.el-pagination {
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 20px;
}
.topTool{
  display: flex;
  justify-content: space-between;margin-bottom: 8px;
}
.el-form-item .el-input{
  width:220px;
}
</style>