```cpp
struct Sample {
    char tag;   // 偏移 0：1 字节
                // 偏移 1～3：填充
    int value;  // 偏移 4：4 字节
};
// 常见布局：sizeof(Sample) == 8
```
