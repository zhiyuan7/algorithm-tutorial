```cpp
int* p = nullptr;
bool positive = p != nullptr && *p > 0;
// 左侧为 false，不会执行右侧的 *p
```
