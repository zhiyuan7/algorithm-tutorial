```cpp
class Battery {};

// 机器人有一块电池：组合
class Robot { Battery battery; };

// 步兵机器人是一种机器人：继承
class InfantryRobot : public Robot {};
```
