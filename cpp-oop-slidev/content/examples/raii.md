```cpp
{
    auto robot = std::make_unique<Robot>();
    robot->move(1, 2);
}  // unique_ptr 自动销毁所拥有的对象
```
