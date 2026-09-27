```cpp
struct AutoRobot {};  // 没声明构造函数
AutoRobot a;          // 使用隐式默认构造

struct Robot {
    double x = 0;
    explicit Robot(double value) : x(value) {}
};
Robot b(10);
// Robot c;  // 无参版本不会自动补上
```
