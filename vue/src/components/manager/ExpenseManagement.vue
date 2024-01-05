<template>
  <div>
    <div class="topTool">
      <el-input v-model="searchInput" placeholder="搜索" @input="handleSearch" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加费用信息</el-button>
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
      <el-table-column prop="eid" label="费用记录号" width="200px" align="center" header-align="center" ></el-table-column>
      <el-table-column prop="sid" label="学号" width="100px" align="center" header-align="center" ></el-table-column>
      <el-table-column prop="type" label="类型" width="100px" align="center" header-align="center"></el-table-column>
      <el-table-column prop="sum" label="缴费金额" width="100px" align="center" header-align="center">
        <template #default="expense">
          <span v-if="expense.row.sum<0">
            {{-expense.row.sum}}
          </span>
          <span v-if="expense.row.sum>0">
            {{expense.row.sum}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="缴费时间" width="300px" align="center" header-align="center" sortable>
        <template #default="expense">
          <span>{{new Date(expense.row.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300px" align="center" header-align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit"  @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Wallet" @click="handleDelete(row)" v-if="row.sum>=0">退费</el-button>
          <el-button type="info" size="small" :icon="Wallet" @click="handleDelete(row)" v-if="row.sum<0" disabled>已退费</el-button>
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
          <el-input v-model="tableform.sid" autocomplete="off" v-if="dialogType === 'add'" style="width:220px " />
          <el-input v-model="tableform.sid" autocomplete="off" v-if="dialogType === 'edit'" style="width:220px " disabled/>
        </el-form-item>
        <el-form-item label="类型" :label-width="200">
          <el-select v-model="tableform.type" class="m-2" placeholder=" " style="width:100px">
            <el-option
                v-for="item in typeList"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="缴费金额" :label-width="200" >
          <el-input v-model="tableform.sum" autocomplete="off" style="width:100px"/>
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
import { Plus,Delete,Edit,Search,Wallet } from '@element-plus/icons-vue'
//定义用户信息数据
import axios from 'axios'
import {ref, onMounted, computed} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

const data = ref([])
const currentPage = ref(1);
const pageSize = ref(12);
const total = ref(0);
const searchInput = ref('')//初始化搜索框的值

let typeList = ['电费','空调费','水费']


onMounted(() => {
  getData()
})

//获取当前页数据
const getData = () => {
  axios.get('http://localhost:8080/expense/findByPage', {
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
    axios.get(`http://localhost:8080/expenseByName?keyword=${keyword}&pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(response=>{
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
    axios.get('http://localhost:8080/generateEid').then(response=>{
      const newUser = {
        ...tableform.value,
        eid:response.data,
        date:new Date(),
        sum:Number(tableform.value.sum)
      }
      console.log(newUser)
      axios.post('http://localhost:8080/expense', newUser)
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
    const eid = tableform.value.eid;
    const updatedUser = {
      ...tableform.value,
      sum:Number(tableform.value.sum)
    };
    axios.put(`http://localhost:8080/expense/${eid}`, updatedUser)
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
  const eid = row.eid;
  axios.delete(`http://localhost:8080/expense/${eid}`)
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
      '您确定要对费用记录号为【' + row.eid + '】的记录进行退费吗?',
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
      message: '完成退费！',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消退费!',
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
    multipleSelection.value.push(item.eid) // 将选中的每一行数据存入multipleSelection数组中
  })
}
// 删除多条数据
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要对选中的数据进行批量退费吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const eids = multipleSelection.value;
    axios.delete('http://localhost:8080/expenses', {data:eids})
        .then(response => {
          getData();
          ElMessage({ type: 'success', message: '完成批量退费！' });
        })
        .catch(error => {
          console.error(error);
          ElMessage({ type: 'error', message: '退费失败！' });
        });
  }).catch(() => {
    ElMessage({ type: 'info', message: '取消退费!' });
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