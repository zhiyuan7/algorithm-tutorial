```cpp
struct Robot {
    int id;
    explicit Robot(int n) : id(n) {}
};
Robot* p = new Robot(7); // 分配 + 构造
delete p;               // 析构 + 释放
```
