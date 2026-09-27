```cpp
void demo() {           // 外层
    int outer = 10;
    {                  // 内层
        int inner = 20;
    }                  // inner 销毁
    ++outer;           // outer 仍然可用
}                      // outer 销毁
```
