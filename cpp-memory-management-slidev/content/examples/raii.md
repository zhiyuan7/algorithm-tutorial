```cpp
void run(bool stop) {
    auto p = std::make_unique<Robot>(7);
    if (stop) return;  // 仍会自动释放
    use(*p);          // 抛异常也会清理
}
```
