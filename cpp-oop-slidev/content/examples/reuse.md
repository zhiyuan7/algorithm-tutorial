```cpp
class InfantryRobot : public Robot {
public:
    void shoot();
};
infantry.move(1, 2);  // 沿用基类能力
infantry.shoot();     // 添加的新能力
```
