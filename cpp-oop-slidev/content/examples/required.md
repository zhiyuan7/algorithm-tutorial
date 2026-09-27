```cpp
class Task {
    const int id;
    Robot& owner;
public:
    Task(int value, Robot& robot)
        : id(value), owner(robot) {}
};
```
