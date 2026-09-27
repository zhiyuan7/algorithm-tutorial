```cpp
class Robot {
public:
    ~Robot() { /* 收尾工作 */ }
};
{
    Robot robot;
}  // 自动调用 ~Robot()
```
