```cpp
class Robot {
public:
    virtual void move(double dx, double dy);
};
class ScoutRobot : public Robot {
public:
    void move(double dx, double dy) override;
};
```
