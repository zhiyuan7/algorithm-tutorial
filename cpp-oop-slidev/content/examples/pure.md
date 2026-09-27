```cpp
class Robot {
public:
    virtual void attack() = 0;
};
class InfantryRobot : public Robot {
public:
    void attack() override;
};
```
