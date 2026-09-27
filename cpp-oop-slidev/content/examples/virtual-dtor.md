```cpp
class Robot {
public:
    virtual ~Robot() = default;
    virtual void attack() = 0;
};
Robot* robot = new InfantryRobot();
delete robot;  // 先派生，再基类
```
