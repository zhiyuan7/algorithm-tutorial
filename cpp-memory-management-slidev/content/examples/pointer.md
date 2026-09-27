```cpp
int* p = new int(42);
int value = *p;  // 读取地址处的对象
delete p;        // 释放所指对象
p = nullptr;    // p 本身仍然存在
```
