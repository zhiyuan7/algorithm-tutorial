# 镜头脚本

封面之后，主舞台有 20 个场景（初始场景加 19 次推进）。场景编号对应舞台右上角，封面与结语不计入该编号。

| 场景 | ID | 图谱 | 镜头 | 讲述目标 |
| ---: | --- | --- | --- | --- |
| 1 | opening | storage | node | 数据如何存在于内存中 |
| 2 | address | storage | node | 常见类型占多少空间？ |
| 3 | array | storage | node | 同类型的元素，连续放在一起 |
| 4 | struct | storage | node | 不同类型的成员，还要考虑对齐 |
| 5 | choice | storage | node | 为什么不把所有对象都动态分配 |
| 6 | static | storage | node | 多次调用，继续使用同一个对象 |
| 7 | automatic | storage | node | 退出内层作用域，外层对象仍然存在 |
| 8 | dynamic | storage | node | 规模与释放时机在运行时决定 |
| 9 | scope | storage | node | 名字看得见，不等于对象才存在 |
| 10 | pointer | storage | node | 指针与被指向对象各有自己的存储期 |
| 11 | before-morph | storage | all | 动态存储带来新的问题：谁负责释放 |
| 12 | ownership-morph | morph | all | 从存储期转向资源所有权 |
| 13 | ownership-opening | ownership | node | 谁拥有动态对象 |
| 14 | malloc | ownership | node | malloc 只负责申请原始字节 |
| 15 | new | ownership | node | new 不只分配空间，还负责初始化对象 |
| 16 | risk | ownership | node | 提前返回之后，谁来执行 delete？ |
| 17 | raii | ownership | node | 把释放责任交给对象的析构函数 |
| 18 | unique | ownership | node | unique_ptr 可以移动，不能复制 |
| 19 | shared | ownership | node | shared_ptr 在最后一个所有者消失时释放 |
| 20 | ownership-summary | ownership | all | 先确定谁负责释放，再选择管理方式 |

讲解时放大当前分支，收起已经讲过的其他分支，只保留祖先和必要的关系节点。风险与 RAII 的连接可以保留；shared_ptr 讲解时收起 unique_ptr。第 11 场景恢复存储整图，第 20 场景恢复所有权整图。

原第 3 场景拆成数组与结构体两场景；原第 5 场景移到三种存储期讲完之后。删除原第 10、11、22 场景；原第 12 场景保留整图回顾后转入过渡。new 的好处分别在动态存储期和 new/delete 讲解中说明。

过渡保留“自动清理”和“动态灵活性”的含义，两张图的数据仍然独立。
