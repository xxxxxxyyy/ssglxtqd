<template>
  <div>
    <div class="topTool">
      <el-input v-model="searchInput" placeholder="搜索" @input="handleSearch" :prefix-icon="Search">
      </el-input>
<!--      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加学生信息</el-button>-->
      <el-button type="success" :icon="Promotion" @click="handleDelList" v-if="multipleSelection.length>0" style="margin-left: 20px;">批量分配宿舍</el-button>
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
      <el-table-column prop="college" label="学院" width="300px" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" min-width="300px" align="center" header-align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit"  @click="handleEdit(row)">手动分配</el-button>
          <el-button type="success" size="small" :icon="Promotion" @click="handleDelete(row)">自动分配</el-button>
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
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" style="width:800px">
      <el-form :model="tableform">
        <el-form-item label="宿舍类型" :label-width="200">
          <el-select v-model="sex" class="m-2" @change="changeSex(sex)" placeholder="类型"  style="width:100px" disabled>
            <el-option
                v-for="item in sexs"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>
        <div style="display: flex">
          <el-form-item label="宿舍号" :label-width="200">
            <el-select v-model="building" class="m-2" @change="changeBuilding(building)" placeholder="栋">
              <el-option
                  v-for="item in buildings"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-width="10">
            <el-select v-model="unit" class="m-2" @change="changeUnit(building,unit)" placeholder="单元">
              <el-option
                  v-for="item in units"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-width="10">
            <el-select v-model="floor" class="m-2" @change="changeFloor(building,unit,floor)" placeholder="楼层">
              <el-option
                  v-for="item in floors"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-width="10">
            <el-select v-model="room" class="m-2" placeholder="房间">
              <el-option
                  v-for="item in rooms"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
        </div>
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
import { Plus,Delete,Edit,Search,Promotion } from '@element-plus/icons-vue'
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

let sexs=ref(['男生宿舍','女生宿舍'])
let buildings = ref([])
let units =ref([])
let floors = ref([])
let rooms = ref([])

let sex = ref()
let building = ref()
let unit = ref()
let floor = ref()
let room = ref()

onMounted(() => {
  getData()
})

const changeSex=(sex)=>{
  axios.get(`http://localhost:8080/dormitorylc/${sex}`).then(response=>{
    console.log(response.data)
    buildings.value = response.data
    units.value=[]
    floors.value=[]
    rooms.value =[]

    building.value = ""
    unit.value = ""
    floor.value = ""
    room.value = ""
  })
}

const changeBuilding = (building)=>{
  axios.get(`http://localhost:8080/dormitorylc1/${building}`).then(response=>{
    console.log(response.data)
    units.value = response.data
    floors.value=[]
    rooms.value =[]

    unit.value = ""
    floor.value = ""
    room.value = ""
  })

}

const changeUnit = (building,unit)=>{
  axios.get(`http://localhost:8080/dormitorylc2?building=${building}&unit=${unit}`).then(response=>{
    console.log(response.data)
    floors.value = response.data
    rooms.value =[]

    floor.value = ""
    room.value = ""
  })

}

const changeFloor = (building,unit,floor)=>{
  axios.get(`http://localhost:8080/dormitorylc3?building=${building}&unit=${unit}&floor=${floor}`).then(response=>{
    console.log(response.data)
    rooms.value = response.data
  })
}

//获取当前页数据
const getData = () => {
  axios.get('http://localhost:8080/student/findByPage1', {
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
    axios.get(`http://localhost:8080/studentByKeyword1?keyword=${keyword}&pageNum=${currentPage.value}&pageSize=${pageSize.value}`).then(response=>{
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
  sex.value = tableform.value.sex === "男"?"男生宿舍":"女生宿舍"
  changeSex(sex.value)
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
  }else {
    const sid = tableform.value.sid;
    const did = building.value+unit.value+floor.value+room.value
    axios.put(`http://localhost:8080/studentfp?sid=${sid}&did=${did}`)
        .then(response => {
          // 处理成功响应
          ElMessage({type: 'success',message: '分配成功!',})
          getData();
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
  }
}

//删除行数据
const delrow = (row) => {
  const sid = row.sid;
  sex.value = row.sex === "男" ? "男生宿舍" : "女生宿舍"
  console.log(sex.value)
  axios.get(`http://localhost:8080/dormitory/findByPage1/${sex.value}`)
      .then(response => {
        const did = response.data
        axios.put(`http://localhost:8080/studentfp?sid=${sid}&did=${did}`).then(response => {
          getData()
        }).catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.error(error);
      });
};
// 处理删除按钮点击事件
const handleDelete=(row)=> {
  ElMessageBox.confirm(
      '您确定要自动分配姓名为【' + row.name + '】的宿舍吗?',
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
      message: '完成自动分配！',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消自动分配!',
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
    multipleSelection.value.push(item) // 将选中的每一行数据存入multipleSelection数组中
  })
}
// 删除多条数据
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {
    const rows = multipleSelection.value;
    console.log(rows)
    try{
      for (let i = 0; i < rows.length; i++) {
        delrow(rows[i])
      }
    }catch (error){
      console.log(error)
    }
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
.el-form-item .el-input{
  width:220px;
}
.el-select{
  width:100px;
}
</style>