```cpp
int nextId() {
    static int count = 0;
    return ++count;
}
// count 的名字只在函数内可见
// 对象保留，下一次调用继续累加
```
