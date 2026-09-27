```cpp
// 直接构造成员
Robot(std::string text) : name(text) {}

// 先默认构造，再赋值
Robot(std::string text) {
    name = text;
}
```
