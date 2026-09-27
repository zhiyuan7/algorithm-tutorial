```cpp
auto p = std::make_shared<Robot>(7);
{
    auto q = p;  // 两个所有者
}                // q 销毁，p 仍持有
p.reset();       // 最后一个退出，释放对象
```
