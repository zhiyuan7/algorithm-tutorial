```cpp
int nextId() {
    static int count = 0;
    return ++count;
}
// 依次调用：1、2、3
```
