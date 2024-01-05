<template>
  <div>
    <div class="topTool">
      <el-input v-model="searchInput" placeholder="搜索" @input="handleSearch" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加访客信息</el-button>
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
      <el-table-column prop="vid" label="访客记录号" width="150px" align="center" header-align="center" ></el-table-column>
      <el-table-column prop="sid" label="学号" width="100px" align="center" header-align="center"></el-table-column>
      <el-table-column prop="name" label="访客姓名" width="150px" align="center" header-align="center"></el-table-column>
      <el-table-column prop="ties" label="关系" width="100px" align="center" header-align="center"></el-table-column>
      <el-table-column prop="aim" label="目的" width="150px" align="center" header-align="center" ></el-table-column>
      <el-table-column prop="date" label="时间" width="300px" align="center" header-align="center" sortable>
        <template #default="expense">
          <span>{{new Date(expense.row.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300px" align="center" header-align="center">
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
          <el-input v-model="tableform.sid" autocomplete="off" v-if="dialogType === 'add'" style="width:220px"/>
          <el-input v-model="tableform.sid" autocomplete="off" v-if="dialogType === 'edit'" style="width:220px" disabled/>
        </el-form-item>
        <el-form-item label="访客姓名" :label-width="200" >
          <el-input v-model="tableform.name" autocomplete="off" style="width:100px"/>
        </el-form-item>
        <el-form-item label="关系" :label-width="200">
          <el-input v-model="tableform.ties" autocomplete="off" style="width:100px"/>
        </el-form-item>
        <el-form-item label="目的" :label-width="200">
          <el-input v-model="tableform.aim" autocomplete="off" style="width:100px"/>
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


onMounted(() => {
  getData()
})

//获取当前页数据
const getData = () => {
  axios.get('http://localhost:8080/visitor/findByPage', {
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
    axios.get(`http://localhost:8080/visitorByName?keyword=${keyword}&pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(response=>{
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
  tableform.value = {}//清空表单数据
}

// 处理编辑按钮点击事件
function handleEdit(row) {
  dialogFormVisible.value = true
  tableform.value = {...row}
  dialogType.value = 'edit'
}

const dialogOk = () => {
  dialogFormVisible.value = false
  if (dialogType.value === 'add') {
    // 获得新的访客记录号
    axios.get('http://localhost:8080/vistorvid').then(response=>{
      const newUser = {
        ...tableform.value,
        vid:response.data,
        date:new Date()
      }
      console.log(newUser)
      axios.post('http://localhost:8080/visitor', newUser)
          .then(response => {
            ElMessage({type: 'success',message: '添加成功!',})
            getData(); // 在添加数据后调用获取数据的方法
          }).catch(error => {
        console.log(error);
      });
    }).catch(error=>{
      console.log(error)
    })

  }else {
    const vid = tableform.value.vid;
    const updatedUser = {
      ...tableform.value
    };
    axios.put(`http://localhost:8080/visitor/${vid}`, updatedUser)
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
  const vid = row.vid;
  axios.delete(`http://localhost:8080/visitor/${vid}`)
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
      '您确定要删除访客记录号为【' + row.vid + '】的数据吗?',
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
    multipleSelection.value.push(item.vid) // 将选中的每一行数据存入multipleSelection数组中
  })
}
// 删除多条数据
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const vids = multipleSelection.value;
    axios.delete('http://localhost:8080/visitors', {data:vids})
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
/*在ElementPlus中，可使用组件名称的类选择器选择对应组件，从而修改默认组件样式*/
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 20px;
}
.topTool{
  display: flex;
  justify-content: space-between;margin-bottom: 8px;
}
</style>