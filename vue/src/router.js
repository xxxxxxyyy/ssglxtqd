import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    redirect:"/",
    routes: [
        {
            path: '/',
            component: ()=>import("./components/init/Container.vue")
        },
        {
            path: '/manager',
            component: ()=>import("./components/manager/Container.vue"),
            redirect:"/manager/studentmanagement",
            children:[
                {
                    path:"/manager/studentmanagement",
                    component:()=>import("./components/manager/StudentManagement.vue")
                },
                {
                    path:"/manager/buildingmanagement",
                    component:()=>import("./components/manager/BuildingManagement.vue"),
                    redirect:"/manager/buildingmanagement/sexs",
                    children:[
                        {
                            path:"/manager/buildingmanagement/sexs",
                            component:()=>import("./components/manager/Sexs.vue")
                        },
                        {
                            path:"/manager/buildingmanagement/buildings",
                            component:()=>import("./components/manager/Buildings.vue")
                        },
                        {
                            path:"/manager/buildingmanagement/units",
                            component:()=>import("./components/manager/Units.vue")
                        },
                        {
                            path:"/manager/buildingmanagement/floors",
                            component:()=>import("./components/manager/Floors.vue")
                        },
                        {
                            path:"/manager/buildingmanagement/rooms",
                            component:()=>import("./components/manager/Rooms.vue")
                        },
                    ]
                },
                {
                    path:"/manager/dormitorymanagement",
                    component:()=>import("./components/manager/DormitoryManagement.vue")
                },
                {
                    path:"/manager/expensemanagement",
                    component:()=>import("./components/manager/ExpenseManagement.vue")
                },
                {
                    path:"/manager/visitormanagement",
                    component:()=>import("./components/manager/VisitorManagement.vue")
                },
                {
                    path:"/manager/violationmanagement",
                    component:()=>import("./components/manager/ViolationManagement.vue")
                },
                {
                    path:"/manager/assignmanagement",
                    component:()=>import("./components/manager/AssignManagement.vue")
                },
                {
                    path:"/manager/audit",
                    component:()=>import("./components/manager/Audit.vue")
                },
                {
                    path:"/manager/stats",
                    component:()=>import("./components/manager/Stats.vue")
                },
                {
                    path:"/manager/announcement",
                    component:()=>import("./components/manager/Announcement.vue")
                },
            ]
        },
        {
            path: '/student',
            component:()=>import("./components/student/Container.vue"),
            redirect:"/student/message",
            children:[
                {
                    path:"/student/message",
                    component:()=>import("./components/student/Message.vue")
                },
                {
                    path:"/student/violation",
                    component:()=>import("./components/student/Violation.vue")
                },
                {
                    path:"/student/audit",
                    component:()=>import("./components/student/Audit.vue")
                },
                {
                    path:"/student/announcement",
                    component:()=>import("./components/student/Announcement.vue")
                },
                {
                    path:"/student/expense",
                    component:()=>import("./components/student/Expense.vue")
                }
            ]
        }
    ]
})
export default router