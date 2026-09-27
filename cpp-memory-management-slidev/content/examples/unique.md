```cpp
auto p = std::make_unique<Robot>(7);
auto q = std::move(p);
// p 变空，q 接管；离开作用域自动释放
// auto r = q;  // 不允许复制
```
